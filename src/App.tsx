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

const STORAGE_KEY = "reclame_aqui_leaderboard_v5_uop_ra1000"

export default function App() {
  // Companies state with persistent localStorage
  const [companies, setCompanies] = useState<Company[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
        }
      }
    } catch (e) {
      console.error("Failed to parse saved companies from localStorage", e)
    }
    return INITIAL_COMPANIES
  })

  // Search
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Modal states for CRUD
  const [modalOpen, setModalOpen] = useState(false)
  const [editingCompany, setEditingCompany] = useState<Company | null>(null)
  const [deletingCompany, setDeletingCompany] = useState<Company | null>(null)
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(companies))
    } catch (e) {
      console.error("Failed to save to localStorage", e)
    }
  }, [companies])

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
    return sortedCompanies.slice(0, 3).map((comp, idx) => ({
      id: comp.id,
      rank: idx + 1,
      name: comp.name.length > 15 ? `${comp.name.substring(0, 14)}...` : comp.name,
      value: comp.score !== null ? (comp.score >= 10 ? "RA1000 ★" : `${comp.score.toFixed(1)} ★`) : formatScore(comp),
      avatar: comp.avatarUrl,
      initials: comp.initials,
      avatarBg: comp.avatarBg,
      badge: comp.score !== null && comp.score >= 10 ? "RA1000" : comp.raStatus,
    }))
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

      return {
        id: comp.id,
        rank: overallRank,
        name: comp.name,
        byline: bylineText,
        value: comp.score !== null ? (comp.score >= 10 ? "RA1000" : comp.score.toFixed(1)) : scoreFormatted,
        avatar: comp.avatarUrl,
        initials: comp.initials,
        avatarBg: comp.avatarBg,
        isCurrent: selectedCompany?.id === comp.id,
        meta: comp,
      }
    })
  }, [filteredCompanies, sortedCompanies, selectedCompany])

  // CRUD Handlers
  const handleSaveCompany = (data: Partial<Company>) => {
    if (editingCompany) {
      // Edit existing
      setCompanies((prev) =>
        prev.map((c) =>
          c.id === editingCompany.id
            ? {
                ...c,
                ...data,
              }
            : c
        )
      )
      setToastMessage(`Empresa "${data.name}" atualizada com sucesso!`)
    } else {
      // Add new
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
      setCompanies((prev) => [newCompany, ...prev])
      setToastMessage(`Empresa "${newCompany.name}" adicionada ao ranking!`)
    }
    setModalOpen(false)
    setEditingCompany(null)
  }

  const handleDeleteCompany = () => {
    if (!deletingCompany) return
    const name = deletingCompany.name
    setCompanies((prev) => prev.filter((c) => c.id !== deletingCompany.id))
    if (selectedCompany?.id === deletingCompany.id) {
      setSelectedCompany(null)
    }
    setDeletingCompany(null)
    setToastMessage(`Empresa "${name}" removida com sucesso.`)
  }

  const handleResetData = () => {
    if (window.confirm("Deseja restaurar as 34 empresas da lista com as notas fornecidas?")) {
      setCompanies(INITIAL_COMPANIES)
      setSelectedCompany(null)
      setToastMessage("34 empresas restauradas com sucesso!")
    }
  }

  const handleSelectRankingItem = (item: LeaderboardRankingItem | LeaderboardPodiumRanking) => {
    const found = companies.find((c) => c.id === item.id)
    if (found) {
      setSelectedCompany(found)
    }
  }

  return (
    <div className="min-h-screen bg-[#f4f5f7] py-6 px-3 sm:px-6 font-sans text-slate-900 flex flex-col justify-between">
      {/* Top Header & Quick Actions */}
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
        <div className="fixed inset-x-0 bottom-4 max-w-lg mx-auto px-4 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300 ease-out">
          <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-xl border border-slate-800 flex items-center justify-between gap-3 transition-all duration-300 ease-out">
            <div className="flex items-center gap-3 min-w-0">
              {/* Initials Avatar */}
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center font-extrabold text-sm tracking-tight border flex-shrink-0 transition-transform duration-400 ease-out hover:scale-105 ${
                  selectedCompany.avatarBg || "bg-slate-800 text-white border-slate-700"
                }`}
              >
                {selectedCompany.initials}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-white truncate">
                    {selectedCompany.name}
                  </h4>
                  <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 font-semibold flex-shrink-0">
                    {selectedCompany.score !== null ? (selectedCompany.score >= 10 ? "RA1000" : `Nota ${selectedCompany.score.toFixed(1)}`) : formatScore(selectedCompany)}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate">
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
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all duration-300 ease-out cursor-pointer"
                title="Editar esta empresa"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeletingCompany(selectedCompany)}
                className="p-2 rounded-xl bg-red-950/60 hover:bg-red-900/80 text-red-300 transition-all duration-300 ease-out cursor-pointer"
                title="Excluir esta empresa"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSelectedCompany(null)}
                className="p-1.5 text-slate-400 hover:text-white transition-colors duration-300 ease-out cursor-pointer"
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
