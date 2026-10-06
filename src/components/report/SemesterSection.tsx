import React from 'react';
import { ReportConfig } from '../../types/report';
import { SemesterEvolutionChart } from './SemesterEvolutionChart';
import { 
  Calendar, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  RotateCcw, 
  Star, 
  Inbox, 
  Hourglass, 
  ThumbsUp, 
  Award,
  ShieldCheck
} from 'lucide-react';

export function SemesterSection({ data }: { data: ReportConfig }) {
  const sem = data.semester;
  const answerRate = ((sem.answeredComplaints / (sem.receivedComplaints || 1)) * 100).toFixed(1);
  const evaluationRate = ((sem.evaluatedComplaints / (sem.receivedComplaints || 1)) * 100).toFixed(1);
  const resolvedRateOnEvaluated = 74.7; // Official: 74,7% das 83 avaliadas

  return (
    <section id="semestral" className="py-10 sm:py-16 border-b border-black/[0.08] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/[0.06] pb-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#007636] block">
              Métricas Consolidadas (180 dias)
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-black tracking-tight">
              Análise Semestral
            </h2>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#FAFAFA] border border-black/[0.08] text-xs font-mono-numbers text-black/80">
            <Calendar className="w-3.5 h-3.5 text-[#007636]" />
            <span>Período Analisado ( 6 meses ): <strong className="font-semibold text-black">{sem.analyzedPeriod}</strong></span>
          </div>
        </div>

        {/* 10 Core Requested Metrics in an Executive Minimalist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* 1. Reputação (Nota Atual) */}
          <div className="p-6 rounded-xl border border-[#007636] bg-[#007636] text-white shadow-sm flex flex-col justify-between transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-white/90">
                Reputação (Nota Atual)
              </span>
              <Award className="w-4 h-4 text-white" />
            </div>
            <div className="my-3 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold text-white font-mono-numbers">
                {sem.reputationScore.toFixed(1).replace('.', ',')}
              </span>
              <span className="text-sm font-medium text-white/60">/ 10</span>
            </div>
            <span className="text-xs text-white/80 font-normal">Score consolidado no algoritmo oficial RA</span>
          </div>

          {/* 2. Selo de Reputação */}
          <div className="p-6 rounded-xl border border-black/[0.08] bg-[#FAFAFA] shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-black/50 uppercase tracking-wider">
                Selo de Reputação
              </span>
              <ShieldCheck className="w-4 h-4 text-[#007636]" />
            </div>
            <div className="my-3 flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-black uppercase tracking-tight block">
                {sem.reputationTier}
              </span>
            </div>
            <span className="text-xs text-black/50 font-normal">Classificação oficial conferida pela plataforma</span>
          </div>

          {/* 3. Reclamações Recebidas */}
          <div className="p-6 rounded-xl border border-black/[0.08] bg-white shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-black/50 uppercase tracking-wider">
                Reclamações Recebidas
              </span>
              <Inbox className="w-4 h-4 text-black/40" />
            </div>
            <div className="my-3 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-black font-mono-numbers">
                {sem.receivedComplaints}
              </span>
              <span className="text-xs text-black/50">chamados</span>
            </div>
            <span className="text-xs text-black/50 font-normal">Volumetria total de queixas abertas no semestre</span>
          </div>

          {/* 4. Reclamações Respondidas */}
          <div className="p-6 rounded-xl border border-black/[0.08] bg-white shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-black/50 uppercase tracking-wider">
                Reclamações Respondidas
              </span>
              <MessageSquare className="w-4 h-4 text-[#007636]" />
            </div>
            <div className="my-3 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-black font-mono-numbers">
                {sem.answeredComplaints}
              </span>
              <span className="text-xs font-semibold text-[#007636]">
                ({answerRate.replace('.', ',')}%)
              </span>
            </div>
            <span className="text-xs text-[#007636] font-medium">100% de cobertura e respostas enviadas</span>
          </div>

          {/* 5. Reclamações Aguardando Resposta */}
          <div className="p-6 rounded-xl border border-black/[0.08] bg-white shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-black/50 uppercase tracking-wider">
                Aguardando Resposta
              </span>
              <Hourglass className="w-4 h-4 text-[#007636]" />
            </div>
            <div className="my-3 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#007636] font-mono-numbers">
                {sem.waitingAnswerComplaints}
              </span>
              <span className="text-xs text-black/50">pendências</span>
            </div>
            <span className="text-xs text-[#007636] font-medium">Fila zerada no Reclame AQUI</span>
          </div>

          {/* 6. Reclamações Avaliadas */}
          <div className="p-6 rounded-xl border border-black/[0.08] bg-white shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-black/50 uppercase tracking-wider">
                Reclamações Avaliadas
              </span>
              <Star className="w-4 h-4 text-black/40" />
            </div>
            <div className="my-3 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-black font-mono-numbers">
                {sem.evaluatedComplaints}
              </span>
              <span className="text-xs text-black/50">
                ({evaluationRate.replace('.', ',')}% do recebido)
              </span>
            </div>
            <span className="text-xs text-black/50 font-normal">Consumidores que retornaram nota final</span>
          </div>

          {/* 7. Índice de Solução */}
          <div className="p-6 rounded-xl border border-black/[0.08] bg-white shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-black/50 uppercase tracking-wider">
                Índice de Solução
              </span>
              <CheckCircle className="w-4 h-4 text-[#007636]" />
            </div>
            <div className="my-3 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-black font-mono-numbers">
                {resolvedRateOnEvaluated.toFixed(1).replace('.', ',')}%
              </span>
              <span className="text-xs font-semibold text-[#007636]">
                {sem.resolvedComplaints}/{sem.evaluatedComplaints}
              </span>
            </div>
            <span className="text-xs text-black/50 font-normal">{sem.resolvedComplaints} resolvidas de {sem.evaluatedComplaints} avaliadas</span>
          </div>

          {/* 8. Voltaria a Fazer Negócio */}
          <div className="p-6 rounded-xl border border-black/[0.08] bg-white shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-black/50 uppercase tracking-wider">
                Voltaria a Fazer Negócio
              </span>
              <RotateCcw className="w-4 h-4 text-[#007636]" />
            </div>
            <div className="my-3 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-black font-mono-numbers">
                {sem.wouldDoBusinessAgainRate.toFixed(1).replace('.', ',')}%
              </span>
            </div>
            <span className="text-xs text-black/50 font-normal">Taxa de retenção e confiança do cliente</span>
          </div>

          {/* 9. Nota do Consumidor */}
          <div className="p-6 rounded-xl border border-black/[0.08] bg-white shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-black/50 uppercase tracking-wider">
                Nota Média do Consumidor
              </span>
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
            </div>
            <div className="my-3 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-black font-mono-numbers">
                {sem.averageConsumerScore.toFixed(2).replace('.', ',')}
              </span>
              <span className="text-sm font-medium text-black/40">/ 10</span>
            </div>
            <span className="text-xs text-black/50 font-normal">Média aritmética direta atribuída pelos clientes</span>
          </div>

          {/* 10. Tempo Médio de Resposta */}
          <div className="sm:col-span-2 lg:col-span-3 p-6 rounded-xl border border-black/[0.08] bg-[#FAFAFA] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#007636]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-black/60">
                  Tempo Médio de Resposta
                </span>
              </div>
              <p className="text-xs text-black/50 font-normal max-w-xl">
                Tempo decorrido entre a publicação da reclamação no portal Reclame AQUI e a resposta pública oficial da empresa.
              </p>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-black font-mono-numbers whitespace-nowrap bg-white px-5 py-2.5 rounded-xl border border-black/[0.06] shadow-2xs self-start sm:self-auto">
              {sem.averageResponseTime}
            </div>
          </div>
        </div>

        {/* Gráfico Vetorial de Evolução Semestral */}
        <SemesterEvolutionChart data={data} />
      </div>
    </section>
  );
}
