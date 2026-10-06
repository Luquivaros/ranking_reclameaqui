import React, { useState } from 'react';
import { ReportConfig } from '../../types/report';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface SemesterEvolutionChartProps {
  data: ReportConfig;
}

type ReputationType = 'boa' | 'regular' | 'ruim' | 'nao_recomendada' | 'otimo' | 'sem_reputacao';

const MASCOT_IMAGES: Record<ReputationType, string> = {
  ruim: '/image/ruim.png',
  nao_recomendada: '/image/nao-recomendada.png',
  regular: '/image/regular.png',
  boa: '/image/bom.png',
  otimo: '/image/otimo.png',
  sem_reputacao: '/image/sem-reputacao.png',
};

interface MonthDataPoint {
  id: string;
  monthShort: string;
  monthFull: string;
  reputationType: ReputationType;
  reputationLabel: string;
  reputationColorText: string;
  reputationBadgeBg: string;
  scoreText: string;
  complaintsText: string;
  x: number;
  y: number;
}

export function SemesterEvolutionChart({ data }: { data: ReportConfig }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedMonthId, setSelectedMonthId] = useState<string>('2026-09');

  const isNovare = data.companyName.toLowerCase().includes('novare');

  const points: MonthDataPoint[] = isNovare ? [
    {
      id: '2026-04',
      monthShort: 'Abr',
      monthFull: 'Abril / 2026',
      reputationType: 'sem_reputacao',
      reputationLabel: 'Sem reputação',
      reputationColorText: 'text-slate-500',
      reputationBadgeBg: 'bg-[#90B823]/15 text-[#2E4A05] border border-[#90B823]/35',
      scoreText: 'Sem reputação',
      complaintsText: '0 reclamações recebidas',
      x: 80,
      y: 190,
    },
    {
      id: '2026-05',
      monthShort: 'Mai',
      monthFull: 'Maio / 2026',
      reputationType: 'sem_reputacao',
      reputationLabel: 'Sem reputação',
      reputationColorText: 'text-slate-500',
      reputationBadgeBg: 'bg-[#90B823]/15 text-[#2E4A05] border border-[#90B823]/35',
      scoreText: 'Sem reputação',
      complaintsText: '2 reclamações recebidas · 1 resolvida · 0 voltariam',
      x: 230,
      y: 190,
    },
    {
      id: '2026-06',
      monthShort: 'Jun',
      monthFull: 'Junho / 2026',
      reputationType: 'otimo',
      reputationLabel: 'Ótimo',
      reputationColorText: 'text-[#16A34A]',
      reputationBadgeBg: 'bg-[#90B823]/15 text-[#2E4A05] border border-[#90B823]/35',
      scoreText: '8,8 / 10',
      complaintsText: '8 reclamações recebidas · 7 resolvidas · 7 voltariam',
      x: 390,
      y: 65,
    },
    {
      id: '2026-07',
      monthShort: 'Jul',
      monthFull: 'Julho / 2026',
      reputationType: 'otimo',
      reputationLabel: 'Ótimo',
      reputationColorText: 'text-[#16A34A]',
      reputationBadgeBg: 'bg-[#90B823]/15 text-[#2E4A05] border border-[#90B823]/35',
      scoreText: '8,8 / 10',
      complaintsText: '3 reclamações recebidas · 2 resolvidas · 2 voltariam',
      x: 550,
      y: 65,
    },
    {
      id: '2026-08',
      monthShort: 'Ago',
      monthFull: 'Agosto / 2026',
      reputationType: 'otimo',
      reputationLabel: 'Ótimo',
      reputationColorText: 'text-[#16A34A]',
      reputationBadgeBg: 'bg-[#90B823]/15 text-[#2E4A05] border border-[#90B823]/35',
      scoreText: '8,8 / 10',
      complaintsText: '4 reclamações recebidas · 2 resolvidas · 2 voltariam',
      x: 710,
      y: 65,
    },
    {
      id: '2026-09',
      monthShort: 'Set',
      monthFull: 'Setembro / 2026',
      reputationType: 'otimo',
      reputationLabel: 'Ótimo',
      reputationColorText: 'text-[#16A34A]',
      reputationBadgeBg: 'bg-[#90B823]/15 text-[#2E4A05] border border-[#90B823]/35',
      scoreText: '8,9 / 10',
      complaintsText: '7 reclamações recebidas · 6 resolvidas · 4 voltariam',
      x: 855,
      y: 60,
    },
  ] : [
    {
      id: '2026-04',
      monthShort: 'Abr',
      monthFull: 'Abril / 2026',
      reputationType: 'ruim',
      reputationLabel: 'Ruim',
      reputationColorText: 'text-[#DC2626]',
      reputationBadgeBg: 'bg-[#90B823]/15 text-[#2E4A05] border border-[#90B823]/35',
      scoreText: '5,0 / 10',
      complaintsText: '23 reclamações recebidas · 8 resolvidas · 3 voltariam',
      x: 80,
      y: 155,
    },
    {
      id: '2026-05',
      monthShort: 'Mai',
      monthFull: 'Maio / 2026',
      reputationType: 'nao_recomendada',
      reputationLabel: 'Não recomendada',
      reputationColorText: 'text-[#9333EA]',
      reputationBadgeBg: 'bg-[#90B823]/15 text-[#2E4A05] border border-[#90B823]/35',
      scoreText: '4,3 / 10',
      complaintsText: '13 reclamações recebidas · 5 resolvidas · 1 voltariam',
      x: 230,
      y: 190,
    },
    {
      id: '2026-06',
      monthShort: 'Jun',
      monthFull: 'Junho / 2026',
      reputationType: 'ruim',
      reputationLabel: 'Ruim',
      reputationColorText: 'text-[#DC2626]',
      reputationBadgeBg: 'bg-[#90B823]/15 text-[#2E4A05] border border-[#90B823]/35',
      scoreText: '5,0 / 10',
      complaintsText: '16 reclamações recebidas · 10 resolvidas · 9 voltariam',
      x: 390,
      y: 155,
    },
    {
      id: '2026-07',
      monthShort: 'Jul',
      monthFull: 'Julho / 2026',
      reputationType: 'regular',
      reputationLabel: 'Regular',
      reputationColorText: 'text-[#D97706]',
      reputationBadgeBg: 'bg-[#90B823]/15 text-[#2E4A05] border border-[#90B823]/35',
      scoreText: '6,2 / 10',
      complaintsText: '22 reclamações recebidas · 14 resolvidas · 14 voltariam',
      x: 550,
      y: 120,
    },
    {
      id: '2026-08',
      monthShort: 'Ago',
      monthFull: 'Agosto / 2026',
      reputationType: 'regular',
      reputationLabel: 'Regular',
      reputationColorText: 'text-[#D97706]',
      reputationBadgeBg: 'bg-[#90B823]/15 text-[#2E4A05] border border-[#90B823]/35',
      scoreText: '6,8 / 10',
      complaintsText: '22 reclamações recebidas · 11 resolvidas · 9 voltariam',
      x: 710,
      y: 95,
    },
    {
      id: '2026-09',
      monthShort: 'Set',
      monthFull: 'Setembro / 2026',
      reputationType: 'boa',
      reputationLabel: 'Boa',
      reputationColorText: 'text-[#2563EB]',
      reputationBadgeBg: 'bg-[#90B823]/15 text-[#2E4A05] border border-[#90B823]/35',
      scoreText: '7,3 / 10',
      complaintsText: '24 reclamações recebidas · 15 resolvidas · 13 voltariam',
      x: 855,
      y: 75,
    },
  ];

  const activeIndex = points.findIndex((p) => p.id === selectedMonthId);
  const activePoint = points[activeIndex >= 0 ? activeIndex : points.length - 1];

  const handlePrev = () => {
    if (activeIndex > 0) {
      setSelectedMonthId(points[activeIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (activeIndex < points.length - 1) {
      setSelectedMonthId(points[activeIndex + 1].id);
    }
  };

  // Traçado exato da linha curva conectando os pontos
  const curvePath = isNovare
    ? "M 80 190 C 140 190, 175 190, 230 190 C 285 190, 335 65, 390 65 C 445 65, 495 65, 550 65 C 605 65, 655 65, 710 65 C 765 65, 805 62, 855 60"
    : "M 80 155 C 140 165, 175 190, 230 190 C 285 190, 335 165, 390 155 C 445 145, 495 130, 550 120 C 605 110, 655 102, 710 95 C 765 88, 805 78, 855 75";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
      {/* Header do Card com Título e Subtítulo Fiéis ao Reclame Aqui */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Histórico da reputação
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
            Confira como esteve a reputação da <strong className="font-bold text-slate-900">{data.companyName}</strong> nos últimos 6 meses
          </p>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          title={isExpanded ? "Recolher histórico" : "Expandir histórico"}
          aria-label={isExpanded ? "Recolher histórico" : "Expandir histórico"}
        >
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Canvas do Gráfico SVG Vetorial Fiel à Imagem de Referência */}
          <div className="relative w-full overflow-x-auto select-none pt-2 pb-1">
            <div className="min-w-[760px] max-w-[940px] mx-auto">
              <svg viewBox="0 0 940 250" className="w-full h-auto overflow-visible">
                {/* 6 Linhas verticais tracejadas periwinkle/azul suave */}
                {points.map((p) => (
                  <line
                    key={`line-${p.id}`}
                    x1={p.x}
                    y1={25}
                    x2={p.x}
                    y2={235}
                    stroke="#CBD5E1"
                    strokeWidth="1.8"
                    strokeDasharray="4 6"
                  />
                ))}

                {/* Linha curva verde lima contínua (#94BA29) passando exatamente pelos centros */}
                <path
                  d={curvePath}
                  fill="none"
                  stroke="#94BA29"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* 6 Mascotes Oficiais do Reclame Aqui sobre os pontos */}
                {points.map((p) => {
                  const isSelected = p.id === selectedMonthId;
                  const mascotSrc = MASCOT_IMAGES[p.reputationType];

                  return (
                    <g
                      key={`mascot-${p.id}`}
                      className="cursor-pointer select-none"
                      onClick={() => setSelectedMonthId(p.id)}
                    >
                      {/* Halo decorativo no ponto de Setembro (mês atual apurado na imagem de referência) */}
                      {p.id === '2026-09' && (
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r="30"
                          fill="#ECFCCB"
                          fillOpacity="0.65"
                          stroke="#BEF264"
                          strokeWidth="1.5"
                        />
                      )}

                      {/* Anel de seleção suave quando o usuário seleciona qualquer outro mês */}
                      {isSelected && p.id !== '2026-09' && (
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r="28"
                          fill="#F1F5F9"
                          fillOpacity="0.8"
                          stroke="#94A3B8"
                          strokeWidth="2"
                          strokeDasharray="3 3"
                        />
                      )}

                      {/* Imagem oficial do mascote do Reclame Aqui */}
                      <image
                        href={mascotSrc}
                        x={p.x - 24}
                        y={p.y - 24}
                        width="48"
                        height="48"
                        preserveAspectRatio="xMidYMid meet"
                      />
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Divisor Sutil */}
          <div className="border-t border-slate-100" />

          {/* Barra de Seleção dos 6 Meses com Badges Fiéis */}
          <div className="grid grid-cols-6 gap-2 sm:gap-4 items-center text-center">
            {points.map((p) => {
              const isSelected = p.id === selectedMonthId;

              return (
                <div
                  key={`pill-${p.id}`}
                  onClick={() => setSelectedMonthId(p.id)}
                  className={`flex flex-col items-center justify-center py-2 px-1 sm:px-3 rounded-2xl cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#F4FAF1] border border-[#DCFCE7] shadow-2xs'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <span
                    className={`text-xs sm:text-sm mb-1.5 block ${
                      isSelected
                        ? 'font-bold text-[#16A34A]'
                        : 'font-semibold text-slate-800'
                    }`}
                  >
                    {p.monthShort}
                  </span>

                  <span
                    className={`text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-full inline-block truncate max-w-full ${
                      p.reputationBadgeBg
                    }`}
                  >
                    {p.reputationLabel}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Barra de Rolagem / Slider Horizontal com Setas */}
          <div className="flex items-center gap-2 px-1">
            <button
              onClick={handlePrev}
              disabled={activeIndex <= 0}
              className="text-slate-400 hover:text-slate-600 disabled:opacity-20 cursor-pointer p-0.5"
              aria-label="Mês anterior"
            >
              <span className="text-xs">◀</span>
            </button>

            <div className="flex-1 h-2.5 bg-slate-300/80 rounded-full overflow-hidden relative">
              <div 
                className="h-full bg-slate-500 rounded-full transition-all duration-300"
                style={{
                  width: `${((activeIndex + 1) / points.length) * 100}%`
                }}
              />
            </div>

            <button
              onClick={handleNext}
              disabled={activeIndex >= points.length - 1}
              className="text-slate-400 hover:text-slate-600 disabled:opacity-20 cursor-pointer p-0.5"
              aria-label="Próximo mês"
            >
              <span className="text-xs">▶</span>
            </button>
          </div>

          {/* Card Detalhado do Mês Selecionado (Exatamente idêntico ao da imagem) */}
          <div className="border border-slate-200/90 rounded-2xl p-4 sm:p-5 bg-white shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={MASCOT_IMAGES[activePoint.reputationType]}
                alt={activePoint.reputationLabel}
                className="w-8 h-8 object-contain shrink-0"
              />
              <div>
                <strong className="font-bold text-slate-900 text-xs sm:text-sm flex flex-wrap items-center gap-2">
                  <span>{activePoint.monthFull}</span>
                  <span className="inline-block px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-[#90B823]/15 text-[#2E4A05] border border-[#90B823]/35">
                    Reputação {activePoint.reputationLabel}
                  </span>
                </strong>
                <p className="text-[11px] sm:text-xs text-slate-500 font-normal mt-0.5">
                  {activePoint.complaintsText}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 w-full sm:w-auto justify-between sm:justify-end">
              <span className="text-xs text-slate-400 font-medium">Nota / Indicador:</span>
              <div className="px-3.5 py-1 rounded-xl border border-slate-200 bg-white font-bold text-xs sm:text-sm text-slate-900 font-mono-numbers shadow-2xs">
                {activePoint.scoreText}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
