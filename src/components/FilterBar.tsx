import React from 'react';
import { Search, X, Filter } from 'lucide-react';
import { ReclameAquiReputation } from '../types';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedFilter: string;
  onSelectFilter: (f: string) => void;
  counts: Record<string, number>;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedFilter,
  onSelectFilter,
  counts,
}) => {
  const filters = [
    { id: 'all', label: 'Todas', count: counts['all'] || 0 },
    { id: 'top3', label: 'Pódio (Top 3)', count: 3 },
    { id: 'RA1000', label: 'RA 1000', count: counts['RA1000'] || 0 },
    { id: 'Ótimo', label: 'Ótimo', count: counts['Ótimo'] || 0 },
    { id: 'Bom', label: 'Bom', count: counts['Bom'] || 0 },
    { id: 'Regular', label: 'Regular', count: counts['Regular'] || 0 },
    { id: 'Ruim', label: 'Ruim', count: counts['Ruim'] || 0 },
    { id: 'Não Recomendada', label: 'Não Recomendada', count: counts['Não Recomendada'] || 0 },
    { id: 'Sem Avaliação', label: 'Sem Avaliação', count: counts['Sem Avaliação'] || 0 },
  ];

  return (
    <div className="px-5 py-2 space-y-2 border-b border-white/5 bg-black/20">
      {/* Search Input */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          id="search-companies-input"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por nome, @handle ou segmento..."
          className="w-full pl-8 pr-8 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-hidden focus:border-emerald-500 transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Filter Badges scrollable */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
        {filters.map((filter) => {
          const isActive = selectedFilter === filter.id;
          return (
            <button
              key={filter.id}
              onClick={() => onSelectFilter(filter.id)}
              className={`shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all flex items-center gap-1 border ${
                isActive
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-xs'
                  : 'bg-white/[0.03] text-slate-400 border-white/5 hover:bg-white/[0.06] hover:text-slate-200'
              }`}
            >
              <span>{filter.label}</span>
              <span className={`text-[10px] px-1 rounded-full ${isActive ? 'bg-emerald-400/30 text-emerald-200' : 'bg-white/10 text-slate-400'}`}>
                {filter.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
