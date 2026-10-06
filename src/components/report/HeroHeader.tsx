import React from 'react';
import { ReportConfig } from '../../types/report';
import { ShieldCheck, CheckCircle2, RotateCcw, Star, MessageSquare } from 'lucide-react';

export function HeroHeader({ data }: { data: ReportConfig }) {
  const sem = data.semester;
  const isHighTier = sem.reputationScore >= 8.0;
  const solutionRate = sem.evaluatedComplaints > 0 
    ? ((sem.resolvedComplaints / sem.evaluatedComplaints) * 100).toFixed(1).replace('.', ',') 
    : '0';

  return (
    <section id="visao-geral" className="relative pt-8 sm:pt-12 pb-10 sm:pb-14 border-b border-black/[0.08] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Company Title & Statement */}
        <div className="space-y-2.5 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#007636]/5 border border-[#007636]/20 text-[#007636] text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Monitoramento de Satisfação & Atendimento</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black tracking-tight leading-tight">
            {data.companyName}
          </h1>
          <p className="text-sm sm:text-base text-black/60 font-normal max-w-3xl leading-relaxed">
            Painel executivo com a apuração oficial dos resultados no Reclame AQUI. Visão consolidada do ciclo semestral e acompanhamento mensal detalhado.
          </p>
        </div>

        {/* Executive Reputation Hero Anchor Card */}
        <div className="rounded-2xl border border-black/[0.08] bg-[#FAFAFA] p-6 sm:p-8 shadow-xs animate-fade-in-up stagger-2">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Score Presentation */}
            <div className="lg:col-span-5 space-y-3 border-b lg:border-b-0 lg:border-r border-black/[0.08] pb-6 lg:pb-0 lg:pr-8">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#007636]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#007636]">
                  Reputação Oficial Reclame AQUI
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-5xl sm:text-6xl font-bold text-black font-mono-numbers tracking-tight">
                  {sem.reputationScore.toFixed(1).replace('.', ',')}
                </span>
                <span className="text-lg font-medium text-black/40">/ 10</span>
              </div>

              <p className="text-xs text-black/60 font-normal leading-relaxed pt-1">
                Índice consolidado com 100% das demandas respondidas, {solutionRate}% de índice de resolução nos chamados avaliados e {sem.wouldDoBusinessAgainRate.toFixed(1).replace('.', ',')}% de intenção de novos negócios no período de 6 meses.
              </p>
            </div>

            {/* Right Summary Metrics Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-white border border-black/[0.06] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-black/50 uppercase tracking-wider block">
                    Índice Resposta
                  </span>
                  <MessageSquare className="w-3.5 h-3.5 text-[#007636]" />
                </div>
                <span className="text-2xl sm:text-3xl font-bold text-black font-mono-numbers block">
                  100%
                </span>
                <span className="text-[11px] text-[#007636] font-semibold block">
                  {sem.answeredComplaints} de {sem.receivedComplaints}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-black/[0.06] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-black/50 uppercase tracking-wider block">
                    Índice Solução
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#007636]" />
                </div>
                <span className="text-2xl sm:text-3xl font-bold text-black font-mono-numbers block">
                  {solutionRate}%
                </span>
                <span className="text-[11px] text-[#007636] font-semibold block">
                  {sem.resolvedComplaints} de {sem.evaluatedComplaints} avaliadas
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-black/[0.06] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-black/50 uppercase tracking-wider block">
                    Voltaria Fazer Negócio
                  </span>
                  <RotateCcw className="w-3.5 h-3.5 text-[#007636]" />
                </div>
                <span className="text-2xl sm:text-3xl font-bold text-black font-mono-numbers block">
                  {sem.wouldDoBusinessAgainRate.toFixed(1).replace('.', ',')}%
                </span>
                <span className="text-[11px] text-black/50 font-normal block">
                  Intenção do cliente
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-black/[0.06] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-black/50 uppercase tracking-wider block">
                    Nota do Consumidor
                  </span>
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                </div>
                <span className="text-2xl sm:text-3xl font-bold text-black font-mono-numbers block">
                  {sem.averageConsumerScore.toFixed(2).replace('.', ',')}
                </span>
                <span className="text-[11px] text-black/50 font-normal block">
                  Média geral / 10
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Linha do Tempo / Régua Oficial de Reputação Reclame AQUI (Fiel à imagem de referência) */}
        <div className="rounded-2xl border border-black/[0.08] bg-white p-6 sm:p-8 shadow-xs animate-fade-in-up stagger-3">
          <div className="overflow-x-auto select-none pt-2 pb-2">
            <div className="min-w-[660px] max-w-4xl mx-auto">
              {/* Grid Superior: Mascotes e Valores / Indicadores */}
              <div className="grid grid-cols-6 items-end">
                {isHighTier ? (
                  <>
                    {/* Para notas >= 8.0 (ex: Novare 8.9) */}
                    <div />
                    <div />
                    <div />
                    {/* Col 4: Bom */}
                    <div className="flex flex-col items-center justify-end pb-1.5">
                      <img
                        src="/image/bom.png"
                        alt="Bom"
                        className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-xs"
                      />
                      <span className="text-sm sm:text-base font-bold text-[#2563EB] font-mono-numbers mt-1.5 tracking-tight">
                        -0.9
                      </span>
                    </div>

                    {/* Col 5: Ótimo (8.9) - Destaque Atual */}
                    <div className="relative flex flex-col items-center justify-end pb-1.5 bg-gradient-to-t from-emerald-100/70 via-emerald-50/40 to-transparent rounded-t-2xl pt-3">
                      <img
                        src="/image/otimo.png"
                        alt="Ótimo - Reputação Atual 8.9"
                        className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-md scale-105"
                      />
                      <span className="text-2xl sm:text-3xl font-extrabold text-[#16A34A] font-mono-numbers mt-1 tracking-tight">
                        {sem.reputationScore.toFixed(1)}
                      </span>
                    </div>

                    {/* Col 6: RA1000 */}
                    <div className="flex flex-col items-center justify-end pb-1.5">
                      <img
                        src="/image/ra1000.png"
                        alt="RA1000"
                        className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-xs"
                      />
                      <span className="text-sm sm:text-base font-bold text-[#84CC16] font-mono-numbers mt-1.5 tracking-tight">
                        +1.1
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Para notas < 8.0 (ex: Nexus 7.3) */}
                    <div />
                    <div />
                    {/* Col 3: Regular (-0.4) */}
                    <div className="flex flex-col items-center justify-end pb-1.5">
                      <img
                        src="/image/regular.png"
                        alt="Regular"
                        className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-xs"
                      />
                      <span className="text-sm sm:text-base font-bold text-[#D97706] font-mono-numbers mt-1.5 tracking-tight">
                        -0.4
                      </span>
                    </div>

                    {/* Col 4: Bom (7.3) - Situação Atual com Destaque Azul Sutil */}
                    <div className="relative flex flex-col items-center justify-end pb-1.5 bg-gradient-to-t from-blue-100/70 via-blue-50/40 to-transparent rounded-t-2xl pt-3">
                      <img
                        src="/image/bom.png"
                        alt="Bom - Reputação Atual 7.3"
                        className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-md scale-105"
                      />
                      <span className="text-2xl sm:text-3xl font-extrabold text-[#1D4ED8] font-mono-numbers mt-1 tracking-tight">
                        {sem.reputationScore.toFixed(1)}
                      </span>
                    </div>

                    {/* Col 5: Ótimo (+0.7) */}
                    <div className="flex flex-col items-center justify-end pb-1.5">
                      <img
                        src="/image/otimo.png"
                        alt="Ótimo"
                        className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-xs"
                      />
                      <span className="text-sm sm:text-base font-bold text-[#16A34A] font-mono-numbers mt-1.5 tracking-tight">
                        +0.7
                      </span>
                    </div>
                    <div />
                  </>
                )}
              </div>

              {/* Barra de Reputação com 6 Segmentos e Extremidades Arredondadas */}
              <div className="grid grid-cols-6 h-11 sm:h-12 rounded-full overflow-hidden text-xs sm:text-sm font-bold tracking-tight shadow-inner">
                {/* 1. Não recomend. */}
                <div className="bg-[#7E22CE] text-white flex items-center justify-center px-1 text-center">
                  Não recomend.
                </div>

                {/* 2. Ruim */}
                <div className="bg-[#E53935] text-white flex items-center justify-center px-1 text-center">
                  Ruim
                </div>

                {/* 3. Regular */}
                <div className="bg-[#F59E0B] text-[#78350F] flex items-center justify-center px-1 text-center">
                  Regular
                </div>

                {/* 4. Bom */}
                <div className="bg-[#1D4ED8] text-white flex items-center justify-center px-1 text-center font-extrabold">
                  Bom
                </div>

                {/* 5. Ótimo */}
                <div className="bg-[#008744] text-white flex items-center justify-center px-1 text-center">
                  Ótimo
                </div>

                {/* 6. RA1000 */}
                <div className="bg-[#84CC16] text-white flex items-center justify-center px-1 text-center font-extrabold">
                  RA1000
                </div>
              </div>

              {/* Linha dos Marcadores Numéricos de Transição (< 5, 6, 7, 8, 10) */}
              <div className="relative w-full h-7 mt-1.5 text-xs sm:text-sm font-semibold text-slate-500 font-mono-numbers">
                <span className="absolute -translate-x-1/2" style={{ left: '16.666%' }}>
                  &lt; 5
                </span>
                <span className="absolute -translate-x-1/2" style={{ left: '33.333%' }}>
                  6
                </span>
                <span className="absolute -translate-x-1/2" style={{ left: '50.000%' }}>
                  7
                </span>
                <span className="absolute -translate-x-1/2" style={{ left: '66.666%' }}>
                  8
                </span>
                <span className="absolute -translate-x-1/2" style={{ left: '83.333%' }}>
                  10
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
