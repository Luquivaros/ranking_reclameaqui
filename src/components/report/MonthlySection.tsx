import React, { useState } from 'react';
import { ReportConfig, MonthlyData } from '../../types/report';
import { 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ChevronLeft,
  ChevronRight,
  Calendar,
  Inbox,
  ThumbsUp
} from 'lucide-react';

export function MonthlySection({ data }: { data: ReportConfig }) {
  const history = data.monthlyHistory || [data.monthly];
  const [selectedMonthId, setSelectedMonthId] = useState<string>(history[0]?.id || "2026-09");

  const currentMonthIndex = history.findIndex(m => m.id === selectedMonthId);
  const activeMonth: MonthlyData = history[currentMonthIndex >= 0 ? currentMonthIndex : 0] || data.monthly;

  const answerRate = ((activeMonth.answeredComplaints / (activeMonth.receivedComplaints || 1)) * 100).toFixed(1);
  const solutionRateOnEvaluated = activeMonth.evaluatedComplaints > 0 
    ? ((activeMonth.resolvedComplaints / activeMonth.evaluatedComplaints) * 100).toFixed(1)
    : "0,0";
  const unresolvedRateOnEvaluated = activeMonth.evaluatedComplaints > 0
    ? ((activeMonth.unresolvedComplaints / activeMonth.evaluatedComplaints) * 100).toFixed(1)
    : "0,0";
  const unevaluatedRateOnTotal = ((activeMonth.unevaluatedComplaints / (activeMonth.totalComplaints || 1)) * 100).toFixed(1);

  const handlePrevMonth = () => {
    if (currentMonthIndex < history.length - 1) {
      setSelectedMonthId(history[currentMonthIndex + 1].id);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIndex > 0) {
      setSelectedMonthId(history[currentMonthIndex - 1].id);
    }
  };

  return (
    <section id="mensal" className="py-10 sm:py-16 border-b border-black/[0.08] bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header with Unified Month Selector */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/[0.06] pb-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#007636] block">
              Desempenho Pontual Individual
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-black tracking-tight">
              Análise Mensal — {activeMonth.monthLabel}
            </h2>
          </div>

          {/* Clean filter control: Dropdown + Previous/Next Stepper */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-black/[0.08] shadow-2xs self-start sm:self-auto">
            <button
              onClick={handlePrevMonth}
              disabled={currentMonthIndex >= history.length - 1}
              className="p-1.5 rounded-lg text-black hover:bg-black/5 disabled:opacity-20 disabled:pointer-events-none transition-colors cursor-pointer"
              title="Mês anterior"
              aria-label="Mês anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1 px-2">
              <Calendar className="w-3.5 h-3.5 text-[#007636]" />
              <select
                value={activeMonth.id}
                onChange={(e) => setSelectedMonthId(e.target.value)}
                className="text-xs font-semibold text-black bg-transparent border-none focus:outline-none cursor-pointer pr-1"
              >
                {history.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.monthLabel}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleNextMonth}
              disabled={currentMonthIndex <= 0}
              className="p-1.5 rounded-lg text-black hover:bg-black/5 disabled:opacity-20 disabled:pointer-events-none transition-colors cursor-pointer"
              title="Próximo mês"
              aria-label="Próximo mês"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 6 Core Functional Metrics in a Balanced Modern 3x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* 1. Total de Reclamações */}
          <div className="p-6 rounded-xl border border-black/[0.08] bg-white shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-black/50 uppercase tracking-wider">
                Total de Reclamações
              </span>
              <Inbox className="w-4 h-4 text-black/40" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold text-black font-mono-numbers">
                {activeMonth.totalComplaints}
              </span>
              <span className="text-xs text-black/50 font-medium">chamados</span>
            </div>
            <p className="text-xs text-black/60 pt-1 font-normal">
              100% dos chamados recebidos no mês foram devidamente respondidos na plataforma.
            </p>
          </div>

          {/* 2. Taxa de Resposta */}
          <div className="p-6 rounded-xl border border-black/[0.08] bg-white shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-black/50 uppercase tracking-wider">
                Taxa de Resposta
              </span>
              <MessageSquare className="w-4 h-4 text-[#007636]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold text-black font-mono-numbers">
                {answerRate.replace('.', ',')}%
              </span>
              <span className="text-xs font-semibold text-[#007636]">
                {activeMonth.answeredComplaints}/{activeMonth.receivedComplaints}
              </span>
            </div>
            <p className="text-xs text-black/60 pt-1 font-normal">
              Zero demandas pendentes de retorno inicial pela equipe de atendimento.
            </p>
          </div>

          {/* 3. Reclamações Resolvidas */}
          <div className="p-6 rounded-xl border border-black/[0.08] bg-white shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-black/50 uppercase tracking-wider">
                Reclamações Resolvidas
              </span>
              <CheckCircle2 className="w-4 h-4 text-[#007636]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold text-black font-mono-numbers">
                {activeMonth.resolvedComplaints}
              </span>
              <span className="text-xs font-semibold text-[#007636]">
                ({solutionRateOnEvaluated.replace('.', ',')}% das avaliadas)
              </span>
            </div>
            <p className="text-xs text-black/60 pt-1 font-normal">
              Dos {activeMonth.evaluatedComplaints} consumidores que avaliaram o caso, {activeMonth.resolvedComplaints} confirmaram a solução do problema.
            </p>
          </div>

          {/* 4. Reclamações Não Resolvidas */}
          <div className="p-6 rounded-xl border border-black/[0.08] bg-white shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-black/50 uppercase tracking-wider">
                Reclamações Não Resolvidas
              </span>
              <XCircle className="w-4 h-4 text-black/40" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold text-black font-mono-numbers">
                {activeMonth.unresolvedComplaints}
              </span>
              <span className="text-xs font-medium text-black/50">
                ({unresolvedRateOnEvaluated.replace('.', ',')}% das avaliadas)
              </span>
            </div>
            <p className="text-xs text-black/60 pt-1 font-normal">
              Casos com desfecho insatisfatório na perspectiva do consumidor avaliador.
            </p>
          </div>

          {/* 5. Reclamações Não Avaliadas */}
          <div className="p-6 rounded-xl border border-black/[0.08] bg-white shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-black/50 uppercase tracking-wider">
                Reclamações Não Avaliadas
              </span>
              <HelpCircle className="w-4 h-4 text-black/40" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold text-black font-mono-numbers">
                {activeMonth.unevaluatedComplaints}
              </span>
              <span className="text-xs font-medium text-black/50">
                ({unevaluatedRateOnTotal.replace('.', ',')}% do total)
              </span>
            </div>
            <p className="text-xs text-black/60 pt-1 font-normal">
              Reclamações respondidas pela empresa, mas que o consumidor ainda não concluiu a avaliação.
            </p>
          </div>

          {/* 6. Avaliação Geral / Intenção de Retorno */}
          <div className="p-6 rounded-xl border border-black/[0.08] bg-white shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-black/50 uppercase tracking-wider">
                Voltaria a Fazer Negócio
              </span>
              <ThumbsUp className="w-4 h-4 text-[#007636]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold text-black font-mono-numbers">
                {activeMonth.wouldDoBusinessAgainCount ?? 0}
              </span>
              <span className="text-xs text-black/50 font-medium">
                de {activeMonth.evaluatedComplaints} avaliações
              </span>
            </div>
            <p className="text-xs text-black/60 pt-1 font-normal">
              {activeMonth.wouldDoBusinessAgainCount ? (
                <span>
                  <strong>{((activeMonth.wouldDoBusinessAgainCount / (activeMonth.evaluatedComplaints || 1)) * 100).toFixed(1).replace('.', ',')}%</strong> dos clientes declararam intenção positiva de retorno comercial.
                </span>
              ) : (
                <span>Percentual apurado com base nos usuários que finalizaram a avaliação do mês.</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
