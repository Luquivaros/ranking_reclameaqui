import React from 'react';
import { Building2, Search, Bell, Plus, SlidersHorizontal, RefreshCw, Smartphone, Monitor } from 'lucide-react';
import { ViewMode } from '../types';

interface HeaderBarProps {
  totalCount: number;
  onAddNew: () => void;
  onToggleSearch: () => void;
  isSearchOpen: boolean;
  onOpenStats: () => void;
  viewMode: ViewMode;
  onToggleViewMode: () => void;
  onResetData: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  totalCount,
  onAddNew,
  onToggleSearch,
  isSearchOpen,
  onOpenStats,
  viewMode,
  onToggleViewMode,
  onResetData,
}) => {
  return (
    <div className="px-5 pt-2 pb-3">
      <div className="flex items-center justify-between">
        {/* Title matching the image */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>Leaderboard</span>
          </h1>
          <p className="text-[11px] font-medium text-slate-400 mt-0.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Ranking Reclame Aqui • {totalCount} empresas</span>
          </p>
        </div>

        {/* Action icons like in the reference image */}
        <div className="flex items-center gap-2">
          {/* Store / Group Stats icon */}
          <button
            id="btn-group-stats"
            onClick={onOpenStats}
            title="Estatísticas do Grupo"
            className="p-2 rounded-xl text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/10 border border-white/5 transition-all"
          >
            <Building2 className="w-4 h-4" />
          </button>

          {/* Search / Filter toggle */}
          <button
            id="btn-toggle-search"
            onClick={onToggleSearch}
            title="Buscar e filtrar empresas"
            className={`p-2 rounded-xl transition-all border ${
              isSearchOpen
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                : 'text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/10 border-white/5'
            }`}
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Add Company Button (prominent) */}
          <button
            id="btn-add-company-header"
            onClick={onAddNew}
            title="Adicionar Empresa Manualmente"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all hover:scale-102"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span className="hidden sm:inline">Nova Empresa</span>
          </button>
        </div>
      </div>
    </div>
  );
};
