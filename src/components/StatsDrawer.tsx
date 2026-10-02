import React from 'react';
import { X, Trophy, Download, Upload, RotateCcw, ShieldCheck, AlertCircle, TrendingUp, Star } from 'lucide-react';
import { Company } from '../types';

interface StatsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  companies: Company[];
  onReset: () => void;
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const StatsDrawer: React.FC<StatsDrawerProps> = ({
  isOpen,
  onClose,
  companies,
  onReset,
  onExport,
  onImport,
}) => {
  if (!isOpen) return null;

  const rated = companies.filter((c) => !c.isUnrated && c.score !== null);
  const unrated = companies.filter((c) => c.isUnrated || c.score === null);
  const avgScore = rated.length > 0 ? rated.reduce((acc, c) => acc + (c.score || 0), 0) / rated.length : 0;
  
  const ra1000Count = companies.filter((c) => c.raStatus === 'RA1000').length;
  const otimoCount = companies.filter((c) => c.raStatus === 'Ótimo').length;
  const bomCount = companies.filter((c) => c.raStatus === 'Bom').length;
  const regularCount = companies.filter((c) => c.raStatus === 'Regular').length;
  const ruimCount = companies.filter((c) => c.raStatus === 'Ruim' || c.raStatus === 'Não Recomendada').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-[#13141c] border border-white/10 rounded-2xl shadow-2xl p-5 space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span>Painel do Grupo Empresarial</span>
            </h3>
            <p className="text-xs text-slate-400">
              Desempenho consolidado no Reclame Aqui
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <span className="text-[11px] text-slate-400 block font-medium">Nota Média do Grupo</span>
            <div className="flex items-center gap-1.5 mt-1">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-xl font-extrabold text-white">
                {avgScore.toFixed(2)}
              </span>
              <span className="text-[11px] text-slate-400">/ 10.0</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <span className="text-[11px] text-slate-400 block font-medium">Total de Empresas</span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-xl font-extrabold text-white">{companies.length}</span>
              <span className="text-[11px] text-slate-400">
                ({unrated.length} s/ nota)
              </span>
            </div>
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs">
          <span className="font-semibold text-slate-300 block">Distribuição de Reputação:</span>
          
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-emerald-400 font-medium">RA 1000 & Ótimo (8.0 a 10)</span>
              <span className="font-bold text-white">{ra1000Count + otimoCount} empresas</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5">
              <div
                className="bg-emerald-400 h-1.5 rounded-full"
                style={{ width: `${((ra1000Count + otimoCount) / (companies.length || 1)) * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] pt-1">
              <span className="text-blue-400 font-medium">Bom (7.0 a 7.9)</span>
              <span className="font-bold text-white">{bomCount} empresas</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5">
              <div
                className="bg-blue-400 h-1.5 rounded-full"
                style={{ width: `${(bomCount / (companies.length || 1)) * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] pt-1">
              <span className="text-amber-400 font-medium">Regular (6.0 a 6.9)</span>
              <span className="font-bold text-white">{regularCount} empresas</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5">
              <div
                className="bg-amber-400 h-1.5 rounded-full"
                style={{ width: `${(regularCount / (companies.length || 1)) * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] pt-1">
              <span className="text-rose-400 font-medium">Ruim / Não Recomendada (&lt; 6.0)</span>
              <span className="font-bold text-white">{ruimCount} empresas</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5">
              <div
                className="bg-rose-400 h-1.5 rounded-full"
                style={{ width: `${(ruimCount / (companies.length || 1)) * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] pt-1">
              <span className="text-slate-400 font-medium">Sem Avaliação</span>
              <span className="font-bold text-slate-300">{unrated.length} empresas</span>
            </div>
          </div>
        </div>

        {/* Data Management Actions */}
        <div className="pt-2 border-t border-white/10 space-y-2">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Gerenciamento de Dados
          </span>
          <div className="flex flex-col gap-2">
            <button
              onClick={onExport}
              className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold border border-white/10 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Exportar Backup do Ranking (JSON)</span>
            </button>

            <label className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold border border-white/10 transition-colors cursor-pointer">
              <Upload className="w-3.5 h-3.5 text-emerald-400" />
              <span>Importar Ranking (JSON)</span>
              <input type="file" accept=".json" onChange={onImport} className="hidden" />
            </label>

            <button
              onClick={onReset}
              className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-500/20 transition-colors mt-1"
            >
              <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
              <span>Restaurar as 34 Empresas Iniciais</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
