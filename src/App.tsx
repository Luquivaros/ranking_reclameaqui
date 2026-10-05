"use client"

import * as React from "react"
import { useState, useMemo, useEffect } from "react"
import {
  Plus,
  Search,
  RotateCcw,
  X,
  Edit3,
  Trash2,
  CheckCircle2,
  Building2,
  Loader2,
} from "lucide-react"
import { Company } from "./types"
import { INITIAL_COMPANIES } from "./data/initialCompanies"
import {
  sortCompaniesByRanking,
  getReputation,
  getReputationBadgeDetails,
  formatScore,
} from "./utils/reclameAqui"
import { LeaderboardCard } from "@/components/ui/leaderboard-card"
import type { LeaderboardRanking as LeaderboardPodiumRanking } from "@/components/ui/leaderboard-podium"
import type { LeaderboardRankingItem } from "@/components/ui/leaderboard-rankings"
import { CompanyModal } from "./components/CompanyModal"
import { DeleteConfirmModal } from "./components/DeleteConfirmModal"
import { supabase } from "./lib/supabase"

// Mapeamento de logos oficiais para empresas (especialmente do pódio)
export const OFFICIAL_COMPANY_LOGOS: Record<string, string> = {
  'comp-1': '/image/novare.webp',
  'comp-3': '/image/platino.webp',
  'comp-7': '/image/nexus.webp',
  'Novare Assessoria Administrativa': '/image/novare.webp',
  'Platino Soluções': '/image/platino.webp',
  'Nexus Soluções Financeiras': '/image/nexus.webp',
}

// ── Helpers de conversão snake_case ↔ camelCase ──────────────────────────────
function toDbRow(c: Company): Record<string, unknown> {
  return {
    id: c.id,
    name: c.name,
    handle: c.handle,
    score: c.score,
    is_unrated: c.isUnrated,
    avatar_url: c.avatarUrl,
    initials: c.initials ?? null,
    avatar_bg: c.avatarBg ?? null,
    status_type: c.statusType ?? null,
    solution_rate: c.solutionRate ?? null,
    ra_status: c.raStatus ?? null,
    complaints_count: c.complaintsCount ?? null,
    category: c.category ?? null,
    created_at: c.createdAt,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDbRow(row: any): Company {
  const officialLogo =
    OFFICIAL_COMPANY_LOGOS[row.id] ||
    OFFICIAL_COMPANY_LOGOS[row.name] ||
    (row.avatar_url && !row.avatar_url.startsWith('data:image/svg') ? row.avatar_url : undefined)

  const parsedScore =
    row.score !== null && row.score !== undefined
      ? Number(String(row.score).replace(',', '.'))
      : null
  const validScore = parsedScore !== null && !isNaN(parsedScore) ? parsedScore : null

  const parsedSolutionRate =
    row.solution_rate !== null && row.solution_rate !== undefined
      ? Number(String(row.solution_rate).replace(',', '.'))
      : undefined
  const validSolutionRate =
    parsedSolutionRate !== undefined && !isNaN(parsedSolutionRate) ? parsedSolutionRate : undefined

  return {
    id: row.id,
    name: row.name,
    handle: row.handle,
    score: validScore,
    isUnrated: row.is_unrated ?? (validScore === null),
    avatarUrl: officialLogo || row.avatar_url || "",
    initials: row.initials ?? undefined,
    avatarBg: officialLogo ? 'bg-white text-slate-800 border-slate-200' : (row.avatar_bg ?? undefined),
    statusType: row.status_type ?? undefined,
    solutionRate: validSolutionRate,
    raStatus: row.ra_status ?? undefined,
    complaintsCount: row.complaints_count ?? undefined,
    category: row.category ?? undefined,
    createdAt: Number(row.created_at),
  }
}

export default function App() {
  // Companies state – source of truth is Supabase
  const [companies, setCompanies] = useState<Company[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [dbError, setDbError] = useState<string | null>(null)

  // Search
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Modal states for CRUD
  const [modalOpen, setModalOpen] = useState(false)
  const [editingCompany, setEditingCompany] = useState<Company | null>(null)
  const [deletingCompany, setDeletingCompany] = useState<Company | null>(null)
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // ── Carregar empresas do Supabase na montagem ────────────────────────────
  useEffect(() => {
    async function fetchCompanies() {
      setIsLoading(true)
      setDbError(null)
      try {
        const { data, error } = await supabase
          .from('companies')
          .select('*')
          .order('created_at', { ascending: true })

        if (error) throw error

        if (data && data.length > 0) {
          setCompanies(data.map(fromDbRow))
        } else {
          // Banco vazio → popular com dados iniciais
          const rows = INITIAL_COMPANIES.map(toDbRow)
          const { error: insertError } = await supabase
            .from('companies')
            .insert(rows)
          if (insertError) throw insertError
          setCompanies(INITIAL_COMPANIES)
        }
      } catch (err) {
        console.error('Erro ao carregar empresas:', err)
        setDbError('Não foi possível conectar ao banco de dados.')
        setCompanies(INITIAL_COMPANIES) // fallback local
      } finally {
        setIsLoading(false)
      }
    }
    fetchCompanies()
  }, [])

  // Toast auto-hide
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3500)
      return () => clearTimeout(timer)
    }
  }, [toastMessage])

  // Sorted companies by Reclame Aqui ranking rules
  const sortedCompanies = useMemo(() => {
    return sortCompaniesByRanking(companies)
  }, [companies])

  // All companies are shown in the ranking; search query can still be used optionally
  const filteredCompanies = useMemo(() => {
    if (!searchQuery.trim()) {
      return sortedCompanies
    }
    const q = searchQuery.toLowerCase()
    return sortedCompanies.filter((company) => {
      const matchesName = company.name.toLowerCase().includes(q)
      const matchesHandle = company.handle?.toLowerCase().includes(q)
      const matchesCategory = company.category?.toLowerCase().includes(q)
      const matchesInitials = company.initials?.toLowerCase().includes(q)
      return matchesName || matchesHandle || matchesCategory || matchesInitials
    })
  }, [sortedCompanies, searchQuery])

  // Map to LeaderboardPodium format (Top 3 of sorted companies)
  const podiumRankings: LeaderboardPodiumRanking[] = useMemo(() => {
    return sortedCompanies.slice(0, 3).map((comp, idx) => {
      const officialLogo =
        OFFICIAL_COMPANY_LOGOS[comp.id] ||
        OFFICIAL_COMPANY_LOGOS[comp.name] ||
        (comp.avatarUrl && !comp.avatarUrl.startsWith('data:image/svg') ? comp.avatarUrl : undefined)

      return {
        id: comp.id,
        rank: idx + 1,
        name: comp.name.length > 15 ? `${comp.name.substring(0, 14)}...` : comp.name,
        value: comp.score !== null ? (comp.score >= 10 ? "RA1000 ★" : `${comp.score.toFixed(1)} ★`) : formatScore(comp),
        avatar: officialLogo || comp.avatarUrl,
        initials: comp.initials,
        avatarBg: officialLogo ? 'bg-white text-slate-800 border-slate-200' : comp.avatarBg,
        badge: comp.score !== null && comp.score >= 10 ? "RA1000" : comp.raStatus,
      }
    })
  }, [sortedCompanies])

  // Map to LeaderboardRankings format
  const listRankings: LeaderboardRankingItem[] = useMemo(() => {
    return filteredCompanies.map((comp) => {
      const overallRank = sortedCompanies.findIndex((c) => c.id === comp.id) + 1
      const scoreFormatted = formatScore(comp)

      let bylineText = ""
      if (comp.raStatus === "Não está no Reclame Aqui" || comp.statusType === "nao_cadastrada") {
        bylineText = "Não está no Reclame Aqui • " + (comp.category || "Empresa")
      } else if (comp.raStatus === "Sem Reputação" || comp.statusType === "sem_reputacao") {
        bylineText = "Sem Reputação • Sem índice suficiente"
      } else if (comp.raStatus === "Não Recomendada" || comp.statusType === "nao_recomendada") {
        bylineText = "Não Recomendada • Alto índice de insatisfação"
      } else if (comp.score !== null && comp.score >= 10) {
        bylineText = `RA1000 (Nota Máxima) • ${comp.solutionRate ?? 95}% taxa de solução`
      } else {
        const reputation = getReputation(comp.score, comp.isUnrated, comp.solutionRate, comp.raStatus)
        bylineText = `${reputation} • ${comp.solutionRate ?? 85}% taxa de solução`
      }

      const officialLogo =
        OFFICIAL_COMPANY_LOGOS[comp.id] ||
        OFFICIAL_COMPANY_LOGOS[comp.name] ||
        (comp.avatarUrl && !comp.avatarUrl.startsWith('data:image/svg') ? comp.avatarUrl : undefined)

      return {
        id: comp.id,
        rank: overallRank,
        name: comp.name,
        byline: bylineText,
        value: comp.score !== null ? (comp.score >= 10 ? "RA1000" : comp.score.toFixed(1)) : scoreFormatted,
        avatar: officialLogo || comp.avatarUrl,
        initials: comp.initials,
        avatarBg: officialLogo ? 'bg-white text-slate-800 border-slate-200' : comp.avatarBg,
        isCurrent: selectedCompany?.id === comp.id,
        meta: comp,
      }
    })
  }, [filteredCompanies, sortedCompanies, selectedCompany])

  // ── CRUD Handlers (com sync Supabase) ───────────────────────────────────
  const handleSaveCompany = async (data: Partial<Company>) => {
    if (editingCompany) {
      // Atualizar empresa existente
      const updated: Company = { ...editingCompany, ...data }
      const { error } = await supabase
        .from('companies')
        .update(toDbRow(updated))
        .eq('id', editingCompany.id)

      if (error) {
        console.error('Erro ao atualizar empresa:', error)
        setToastMessage('❌ Erro ao atualizar empresa no banco.')
      } else {
        setCompanies((prev) => prev.map((c) => c.id === editingCompany.id ? updated : c))
        setToastMessage(`Empresa "${updated.name}" atualizada com sucesso!`)
      }
    } else {
      // Adicionar nova empresa
      const newCompany: Company = {
        id: `comp-${Date.now()}`,
        name: data.name || "Nova Empresa",
        handle: data.handle || `@empresa_${Math.floor(Math.random() * 1000)}`,
        score: data.score ?? null,
        isUnrated: data.score === null,
        initials: data.initials || "EM",
        avatarBg: data.avatarBg || "bg-slate-900 text-white",
        avatarUrl: data.avatarUrl || "",
        statusType: data.statusType || "score",
        solutionRate: data.solutionRate ?? 85,
        category: data.category || "Geral",
        createdAt: Date.now(),
        raStatus: data.raStatus || (data.score !== null ? "Bom" : "Sem Reputação"),
      }

      const { error } = await supabase
        .from('companies')
        .insert(toDbRow(newCompany))

      if (error) {
        console.error('Erro ao inserir empresa:', error)
        setToastMessage('❌ Erro ao adicionar empresa no banco.')
      } else {
        setCompanies((prev) => [newCompany, ...prev])
        setToastMessage(`Empresa "${newCompany.name}" adicionada ao ranking!`)
      }
    }
    setModalOpen(false)
    setEditingCompany(null)
  }

  const handleDeleteCompany = async () => {
    if (!deletingCompany) return
    const name = deletingCompany.name

    const { error } = await supabase
      .from('companies')
      .delete()
      .eq('id', deletingCompany.id)

    if (error) {
      console.error('Erro ao deletar empresa:', error)
      setToastMessage('❌ Erro ao remover empresa do banco.')
    } else {
      setCompanies((prev) => prev.filter((c) => c.id !== deletingCompany.id))
      if (selectedCompany?.id === deletingCompany.id) setSelectedCompany(null)
      setToastMessage(`Empresa "${name}" removida com sucesso.`)
    }
    setDeletingCompany(null)
  }

  const handleResetData = async () => {
    if (window.confirm("Deseja restaurar as 34 empresas da lista com as notas fornecidas? Isso apagará todos os dados atuais.")) {
      // Deletar tudo e reinserir
      await supabase.from('companies').delete().neq('id', '')
      const rows = INITIAL_COMPANIES.map(toDbRow)
      const { error } = await supabase.from('companies').insert(rows)
      if (error) {
        console.error('Erro ao restaurar empresas:', error)
        setToastMessage('❌ Erro ao restaurar empresas no banco.')
      } else {
        setCompanies(INITIAL_COMPANIES)
        setSelectedCompany(null)
        setToastMessage("34 empresas restauradas com sucesso!")
      }
    }
  }

  const handleSelectRankingItem = (item: LeaderboardRankingItem | LeaderboardPodiumRanking) => {
    const found = companies.find((c) => c.id === item.id)
    if (found) {
      setSelectedCompany(found)
    }
  }

  // ── Tela de carregamento ─────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f4f5f7] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-slate-600 animate-spin" />
        <p className="text-sm text-slate-500 font-medium">Carregando empresas...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f4f5f7] py-6 px-3 sm:px-6 font-sans text-slate-900 flex flex-col justify-between">
      {/* Top Header & Quick Actions */}
      {/* Banner de erro de conexão */}
      {dbError && (
        <div className="max-w-lg mx-auto w-full mb-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl px-4 py-2.5 flex items-center gap-2">
          <span>⚠️</span><span>{dbError} Usando dados locais como fallback.</span>
        </div>
      )}

      <header className="max-w-lg mx-auto w-full mb-4">
        <div className="flex items-center justify-between gap-2 bg-white/95 backdrop-blur-xs border border-slate-200/80 rounded-2xl p-2.5 px-3.5 shadow-xs">
          {/* Brand Info */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs tracking-tight">
              UOP
            </div>
            <div>
              <h1 className="text-xs font-bold text-slate-900 tracking-tight leading-none">
                Ranking Reclame Aqui do grupo UOP
              </h1>
              <span className="text-[10px] text-slate-500 font-medium">
                Todas as {companies.length} empresas cadastradas
              </span>
            </div>
          </div>

          {/* Action Buttons with smooth hover transitions */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                setEditingCompany(null)
                setModalOpen(true)
              }}
              className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-2.5 py-1.5 rounded-xl shadow-xs transition-all duration-300 ease-out hover:scale-[1.02] cursor-pointer"
              title="Adicionar uma nova empresa ao ranking"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Nova Empresa</span>
            </button>

            <button
              onClick={() => setIsSearchOpen((prev) => !prev)}
              className={`p-1.5 rounded-xl border text-xs font-medium transition-all duration-300 ease-out cursor-pointer ${
                isSearchOpen || searchQuery
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
              }`}
              title="Pesquisar empresa"
            >
              <Search className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleResetData}
              className="p-1.5 text-slate-500 hover:text-slate-800 bg-white border border-slate-200 hover:bg-slate-100 hover:border-slate-300 rounded-xl transition-all duration-300 ease-out cursor-pointer"
              title="Restaurar lista original com as 34 empresas"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Collapsible Search Input */}
        {isSearchOpen && (
          <div className="mt-2.5 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nome da empresa, iniciais ou setor..."
              autoFocus
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 pl-9 pr-8 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 shadow-xs transition-all duration-300 ease-out"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 transition-colors duration-300 ease-out"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        )}
      </header>

      {/* Main Leaderboard Card - displaying all companies without filter */}
      <main className="max-w-lg mx-auto w-full">
        <LeaderboardCard
          title="Ranking Reclame Aqui do grupo UOP"
          subtitle={`Classificação Oficial • Todas as ${companies.length} Empresas do Grupo`}
          podiumRankings={podiumRankings}
          rankings={listRankings}
          pageSize={0}
          onSelectRanking={handleSelectRankingItem}
        />
      </main>

      {/* Selected Company Action Card / Quick Inspection */}
      {selectedCompany && (
        <div className="fixed inset-x-0 bottom-4 max-w-lg mx-auto px-4 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300 ease-out xl:inset-x-auto xl:bottom-auto xl:top-1/2 xl:-translate-y-1/2 xl:right-8 xl:left-auto xl:mx-0 xl:px-0 xl:w-80 xl:max-w-none">
          <div className="bg-white text-slate-900 rounded-2xl p-4 shadow-xs border border-slate-200 flex items-center justify-between gap-3 transition-all duration-300 ease-out">
            <div className="flex items-center gap-3 min-w-0">
              {/* Initials Avatar */}
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center font-extrabold text-sm tracking-tight border flex-shrink-0 transition-transform duration-400 ease-out hover:scale-105 ${
                  selectedCompany.avatarBg || "bg-slate-100 text-slate-700 border-slate-200"
                }`}
              >
                {selectedCompany.initials}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {selectedCompany.name}
                  </h4>
                  <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-semibold flex-shrink-0">
                    {selectedCompany.score !== null ? (selectedCompany.score >= 10 ? "RA1000" : `Nota ${selectedCompany.score.toFixed(1)}`) : formatScore(selectedCompany)}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 truncate">
                  {selectedCompany.category || "Geral"} • {selectedCompany.raStatus}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                onClick={() => {
                  setEditingCompany(selectedCompany)
                  setModalOpen(true)
                }}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all duration-300 ease-out cursor-pointer"
                title="Editar esta empresa"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeletingCompany(selectedCompany)}
                className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-all duration-300 ease-out cursor-pointer"
                title="Excluir esta empresa"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSelectedCompany(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 transition-colors duration-300 ease-out cursor-pointer"
                title="Fechar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-medium px-4 py-2.5 rounded-full shadow-lg border border-slate-700 flex items-center gap-2 animate-in fade-in zoom-in-95 duration-150">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <footer className="max-w-lg mx-auto w-full text-center mt-6 text-[11px] text-slate-500 space-y-1">
        <p>Ranking Reclame Aqui do grupo UOP • Avatares gerados por iniciais.</p>
        <p className="text-slate-400">
          {companies.length} empresas cadastradas • Classificação por notas de 0 a RA1000
        </p>
      </footer>

      {/* CRUD Modals */}
      <CompanyModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditingCompany(null)
        }}
        onSave={handleSaveCompany}
        initialData={editingCompany}
      />

      <DeleteConfirmModal
        isOpen={!!deletingCompany}
        company={deletingCompany}
        onClose={() => setDeletingCompany(null)}
        onConfirm={handleDeleteCompany}
      />
    </div>
  )
}
