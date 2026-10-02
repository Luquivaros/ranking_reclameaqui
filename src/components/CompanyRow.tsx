import React from 'react';
import { Trophy, Star, MoreVertical, Edit2, Trash2, ShieldCheck, AlertCircle } from 'lucide-react';
import { Company } from '../types';
import { getReputationBadgeDetails } from '../utils/reclameAqui';

interface CompanyRowProps {
  company: Company;
  rank: number;
  onEdit: (company: Company) => void;
  onDelete: (company: Company) => void;
}

export const CompanyRow: React.FC<CompanyRowProps> = ({
  company,
  rank,
  onEdit,
  onDelete,
}) => {
  const badge = getReputationBadgeDetails(company.raStatus ?? 'Sem Avaliação');

  return (
    <div
      id={`company-row-${company.id}`}
      className="group relative flex items-center justify-between py-3 px-4 border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors rounded-xl mx-1"
    >
      {/* Left side: Rank + Avatar + Name */}
      <div className="flex items-center gap-3.5 min-w-0 pr-2">
        {/* Rank indicator with small trophy icon as seen in photo */}
        <div className="flex items-center gap-1 w-9 shrink-0 text-slate-400 font-semibold text-xs tracking-tight">
          <Trophy className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className="text-slate-300 font-bold">{rank}</span>
        </div>

        {/* Avatar with cyan diamond badge */}
        <div className="relative shrink-0">
          <img
            src={company.avatarUrl}
            alt={company.name}
            className="w-10 h-10 rounded-full object-cover bg-slate-800 border border-white/10"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=1e293b&color=94a3b8`;
            }}
          />
          {/* Cyan Diamond Badge from the photo */}
          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-slate-900 border border-cyan-400/80 flex items-center justify-center shadow-xs">
            <span className="text-[8px] leading-none text-cyan-300">💎</span>
          </div>
        </div>

        {/* Company Name & Handle */}
        <div className="min-w-0 flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-white font-semibold text-sm tracking-tight truncate max-w-[140px] sm:max-w-[200px]">
              {company.name}
            </span>
          </div>
          <span className="text-slate-400 text-xs font-normal truncate">
            {company.handle || (company.category ?? 'Empresa do Grupo')}
          </span>
        </div>
      </div>

      {/* Right side: Score with Star, Solution % and Actions */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="flex flex-col items-end text-right">
          {company.isUnrated || company.score === null ? (
            <div className="flex flex-col items-end">
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-800/80 text-slate-400 border border-slate-700/60">
                Sem avaliação
              </span>
              <span className="text-[10px] text-slate-500 mt-0.5">
                Aguardando dados
              </span>
            </div>
          ) : (
            <>
              {/* Star + Score (e.g. ⭐ 8.8) */}
              <div className="flex items-center gap-1 text-white font-bold text-sm tracking-tight">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{company.score.toFixed(1)}</span>
              </div>
              {/* Green resolution % or badge (e.g. +92.02%) */}
              <span className="text-emerald-400 font-medium text-xs tracking-tight">
                {company.solutionRate ? `+${company.solutionRate.toFixed(1)}%` : badge.label}
              </span>
            </>
          )}
        </div>

        {/* Action Buttons (Edit & Delete) */}
        <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity pl-1">
          <button
            id={`btn-edit-${company.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(company);
            }}
            title="Editar empresa"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            id={`btn-delete-${company.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(company);
            }}
            title="Excluir empresa"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
