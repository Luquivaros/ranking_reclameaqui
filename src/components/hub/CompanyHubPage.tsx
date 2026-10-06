import React from 'react';
import { ArrowRight, Trophy, ShieldCheck, CheckCircle2, Star, MessageSquare } from 'lucide-react';

interface CompanyHubPageProps {
  onSelectCompany: (companyId: 'nexus' | 'novare') => void;
  onNavigateToRanking: () => void;
}

export function CompanyHubPage({ onSelectCompany, onNavigateToRanking }: CompanyHubPageProps) {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 flex flex-col justify-between selection:bg-[#90B823] selection:text-black">
      {/* Top Navbar */}
      <header className="bg-white border-b border-black/[0.08] sticky top-0 z-30 animate-fade-in-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 sm:h-28 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="/image/reclame-aqui.webp"
              alt="Reclame AQUI"
              className="h-14 sm:h-18 md:h-20 w-auto object-contain select-none"
            />
            <span className="hidden sm:inline-block text-xs sm:text-sm text-black/70 font-semibold pl-4 border-l border-black/20">
              Relatório do Reclame Aqui
            </span>
          </div>

          <button
            onClick={onNavigateToRanking}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/[0.04] hover:bg-black/[0.08] text-xs font-semibold text-black transition-all cursor-pointer shadow-2xs"
          >
            <Trophy className="w-3.5 h-3.5 text-[#007636]" />
            <span>Ranking Geral</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex flex-col justify-center">
        {/* Title and Introduction */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#007636]/10 border border-[#007636]/20 text-[#007636] text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Reclame Aqui</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black tracking-tight leading-tight">
            Selecione a Empresa para Acesso
          </h1>
          <p className="text-sm sm:text-base text-black/60 font-normal leading-relaxed">
            Painel executivo com a apuração oficial dos resultados no Reclame AQUI, evolução de reputação, histórico mensal e diagnóstico de chamados.
          </p>
        </div>

        {/* 2 Interactive Cards for Company Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto w-full">
          {/* Card 1: Nexus Soluções Financeiras */}
          <div
            onClick={() => onSelectCompany('nexus')}
            className="group relative bg-white border border-black/[0.08] hover:border-[#007636]/40 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-xl transition-all duration-300 ease-out cursor-pointer flex flex-col justify-between overflow-hidden animate-fade-in-up stagger-1 hover:-translate-y-1"
          >
            {/* Ambient Background Accent */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />

            <div className="space-y-6 relative z-10">
              {/* Header with Company Logo & Status Badge */}
              <div className="flex items-center justify-between gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-black/[0.08] p-2 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-300">
                  <img
                    src="/image/nexus_preto.png"
                    alt="Nexus Soluções Financeiras"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex items-center gap-2 bg-[#007636]/10 border border-[#007636]/25 rounded-2xl px-3 py-1.5">
                  <img
                    src="/image/bom.png"
                    alt="Bom"
                    className="w-6 h-6 object-contain"
                  />
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#007636] block leading-none">
                      Reputação Boa
                    </span>
                    <span className="text-sm font-extrabold text-[#007636] font-mono-numbers">
                      7.3 / 10
                    </span>
                  </div>
                </div>
              </div>

              {/* Company Info */}
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight group-hover:text-[#007636] transition-colors">
                  Nexus Soluções Financeiras
                </h2>
                <p className="text-xs sm:text-sm text-black/60 font-normal leading-relaxed">
                  Monitoramento semestral de ouvidoria, análise de causas e indicadores consolidados de satisfação.
                </p>
              </div>

              {/* Quick Metrics Grid */}
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <div className="bg-[#FAFAFA] rounded-xl p-3 border border-black/[0.05]">
                  <span className="text-[10px] uppercase font-semibold text-black/50 block">Reclamações</span>
                  <span className="text-base sm:text-lg font-bold text-black font-mono-numbers">119 recebidas</span>
                </div>
                <div className="bg-[#FAFAFA] rounded-xl p-3 border border-black/[0.05]">
                  <span className="text-[10px] uppercase font-semibold text-black/50 block">Taxa de Resposta</span>
                  <span className="text-base sm:text-lg font-bold text-[#007636] font-mono-numbers">100%</span>
                </div>
                <div className="bg-[#FAFAFA] rounded-xl p-3 border border-black/[0.05]">
                  <span className="text-[10px] uppercase font-semibold text-black/50 block">Índice Solução</span>
                  <span className="text-base sm:text-lg font-bold text-black font-mono-numbers">74,7%</span>
                </div>
                <div className="bg-[#FAFAFA] rounded-xl p-3 border border-black/[0.05]">
                  <span className="text-[10px] uppercase font-semibold text-black/50 block">Voltariam Negócio</span>
                  <span className="text-base sm:text-lg font-bold text-black font-mono-numbers">59,0%</span>
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-6 mt-6 border-t border-black/[0.06] flex items-center justify-between relative z-10">
              <span className="text-xs font-semibold text-[#007636] flex items-center gap-1.5">
                <span>Acessar Relatório da Nexus</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-[11px] text-black/40">Ciclo 6 Meses</span>
            </div>
          </div>

          {/* Card 2: Novare Assessoria Administrativa */}
          <div
            onClick={() => onSelectCompany('novare')}
            className="group relative bg-white border border-black/[0.08] hover:border-[#007636]/40 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-xl transition-all duration-300 ease-out cursor-pointer flex flex-col justify-between overflow-hidden animate-fade-in-up stagger-2 hover:-translate-y-1"
          >
            {/* Ambient Background Accent */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-500/10 transition-colors" />

            <div className="space-y-6 relative z-10">
              {/* Header with Company Logo & Status Badge */}
              <div className="flex items-center justify-between gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-black/[0.08] p-2 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-300">
                  <img
                    src="/image/novare_preto.png"
                    alt="Novare Assessoria Administrativa"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex items-center gap-2 bg-[#16A34A]/10 border border-[#16A34A]/25 rounded-2xl px-3 py-1.5">
                  <img
                    src="/image/otimo.png"
                    alt="Ótimo"
                    className="w-6 h-6 object-contain"
                  />
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#16A34A] block leading-none">
                      Reputação Ótimo
                    </span>
                    <span className="text-sm font-extrabold text-[#16A34A] font-mono-numbers">
                      8.9 / 10
                    </span>
                  </div>
                </div>
              </div>

              {/* Company Info */}
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight group-hover:text-[#007636] transition-colors">
                  Novare Assessoria Administrativa
                </h2>
                <p className="text-xs sm:text-sm text-black/60 font-normal leading-relaxed">
                  Monitoramento com alto índice de solução e avaliação de excelência pelos clientes no Reclame AQUI.
                </p>
              </div>

              {/* Quick Metrics Grid */}
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <div className="bg-[#FAFAFA] rounded-xl p-3 border border-black/[0.05]">
                  <span className="text-[10px] uppercase font-semibold text-black/50 block">Reclamações</span>
                  <span className="text-base sm:text-lg font-bold text-black font-mono-numbers">27 recebidas</span>
                </div>
                <div className="bg-[#FAFAFA] rounded-xl p-3 border border-black/[0.05]">
                  <span className="text-[10px] uppercase font-semibold text-black/50 block">Taxa de Resposta</span>
                  <span className="text-base sm:text-lg font-bold text-[#007636] font-mono-numbers">100%</span>
                </div>
                <div className="bg-[#FAFAFA] rounded-xl p-3 border border-black/[0.05]">
                  <span className="text-[10px] uppercase font-semibold text-black/50 block">Índice Solução</span>
                  <span className="text-base sm:text-lg font-bold text-[#16A34A] font-mono-numbers">91,3%</span>
                </div>
                <div className="bg-[#FAFAFA] rounded-xl p-3 border border-black/[0.05]">
                  <span className="text-[10px] uppercase font-semibold text-black/50 block">Voltariam Negócio</span>
                  <span className="text-base sm:text-lg font-bold text-black font-mono-numbers">78,3%</span>
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-6 mt-6 border-t border-black/[0.06] flex items-center justify-between relative z-10">
              <span className="text-xs font-semibold text-[#007636] flex items-center gap-1.5">
                <span>Acessar Relatório da Novare</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-[11px] text-black/40">Ciclo 6 Meses</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-black/[0.06] py-6 text-center animate-fade-in stagger-4">
        <p className="text-xs text-black/45 font-medium">
          2026, Análise Reclame Aqui. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
