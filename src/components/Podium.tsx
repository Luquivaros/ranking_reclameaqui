import React from 'react';
import { Trophy, Award, Edit3, Star } from 'lucide-react';
import { Company } from '../types';
import { formatScore, getReputationBadgeDetails } from '../utils/reclameAqui';

interface PodiumProps {
  first?: Company;
  second?: Company;
  third?: Company;
  onSelectCompany: (company: Company) => void;
}

export const Podium: React.FC<PodiumProps> = ({
  first,
  second,
  third,
  onSelectCompany,
}) => {
  return (
    <div className="relative pt-3 pb-2 px-3 overflow-hidden select-none">
      {/* Background glow behind top 1 */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-3 items-end max-w-sm mx-auto">
        {/* 2nd Place (Left) */}
        <div className="flex flex-col items-center z-10">
          {second ? (
            <div
              onClick={() => onSelectCompany(second)}
              className="group flex flex-col items-center cursor-pointer transition-transform hover:-translate-y-1"
            >
              {/* Avatar + Silver Ribbon */}
              <div className="relative mb-1.5">
                <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-cyan-500 via-sky-400 to-teal-300 shadow-lg shadow-cyan-950/40">
                  <img
                    src={second.avatarUrl}
                    alt={second.name}
                    className="w-full h-full object-cover rounded-full bg-slate-800"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(second.name)}&background=0284c7&color=fff`;
                    }}
                  />
                </div>
                {/* Silver Ribbon / Badge */}
                <div className="absolute -top-1 -right-1 flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 border border-slate-700 shadow-md">
                  <span className="flex items-center justify-center text-[11px] font-black text-slate-200">
                    🥈
                  </span>
                </div>
              </div>

              {/* Name */}
              <span className="text-xs font-semibold text-white tracking-tight text-center max-w-[85px] truncate group-hover:text-cyan-400 transition-colors">
                {second.name}
              </span>

              {/* Cyan Score Pill (like $300 in image) */}
              <div className="mt-1 px-2.5 py-0.5 rounded-md bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-extrabold text-[12px] shadow-sm shadow-cyan-500/20 flex items-center gap-1">
                <span>{second.isUnrated ? 'S/ Nota' : second.score?.toFixed(1)}</span>
              </div>
            </div>
          ) : (
            <div className="h-28 flex items-center justify-center text-slate-600 text-xs">Vazio</div>
          )}

          {/* 3D Podium Block 2 */}
          <div className="w-full mt-3 flex flex-col items-center">
            {/* 3D Top surface */}
            <div className="w-full h-3.5 bg-gradient-to-r from-slate-800 to-slate-700 rounded-t-sm border-t border-white/15 transform -skew-x-2"></div>
            {/* Front surface */}
            <div className="w-full h-24 bg-gradient-to-b from-[#181a24] to-[#0c0d12] border-x border-b border-white/5 rounded-b-md flex items-center justify-center shadow-2xl relative">
              <span className="text-4xl font-extrabold text-slate-500/70 font-mono select-none">
                2
              </span>
              <div className="absolute bottom-1 text-[9px] text-slate-500 font-medium">
                {second ? (second.raStatus ?? '2º Lugar') : '2º'}
              </div>
            </div>
          </div>
        </div>

        {/* 1st Place (Center - Highest) */}
        <div className="flex flex-col items-center z-20">
          {first ? (
            <div
              onClick={() => onSelectCompany(first)}
              className="group flex flex-col items-center cursor-pointer transition-transform hover:-translate-y-1"
            >
              {/* Avatar + Gold Trophy */}
              <div className="relative mb-1.5">
                <div className="w-19 h-19 rounded-full p-[2.5px] bg-gradient-to-tr from-amber-400 via-lime-400 to-emerald-400 shadow-xl shadow-lime-950/50">
                  <img
                    src={first.avatarUrl}
                    alt={first.name}
                    className="w-full h-full object-cover rounded-full bg-slate-800"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(first.name)}&background=10b981&color=fff`;
                    }}
                  />
                </div>
                {/* Gold Trophy badge */}
                <div className="absolute -top-1.5 -right-1 flex items-center justify-center w-7 h-7 rounded-full bg-slate-900 border border-amber-400/60 shadow-lg shadow-amber-500/20">
                  <span className="text-sm">🏆</span>
                </div>
              </div>

              {/* Name */}
              <span className="text-xs font-bold text-white tracking-tight text-center max-w-[95px] truncate group-hover:text-lime-400 transition-colors">
                {first.name}
              </span>

              {/* Lime Green Score Pill (like $500 in image) */}
              <div className="mt-1 px-3 py-0.5 rounded-md bg-gradient-to-r from-lime-400 to-emerald-400 text-slate-950 font-black text-[13px] shadow-md shadow-lime-500/30 flex items-center gap-1">
                <span>{first.isUnrated ? 'S/ Nota' : first.score?.toFixed(1)}</span>
              </div>
            </div>
          ) : (
            <div className="h-32 flex items-center justify-center text-slate-600 text-xs">Vazio</div>
          )}

          {/* 3D Podium Block 1 */}
          <div className="w-full mt-3 flex flex-col items-center">
            {/* 3D Top surface */}
            <div className="w-full h-4 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-t-sm border-t border-white/25"></div>
            {/* Front surface */}
            <div className="w-full h-32 bg-gradient-to-b from-[#202330] to-[#0c0d14] border-x border-b border-white/10 rounded-b-md flex items-center justify-center shadow-2xl relative">
              <span className="text-5xl font-black text-slate-400/80 font-mono select-none">
                1
              </span>
              <div className="absolute bottom-1.5 text-[10px] text-lime-400 font-semibold tracking-wide uppercase">
                {first ? (first.raStatus ?? '1º Lugar') : '1º'}
              </div>
            </div>
          </div>
        </div>

        {/* 3rd Place (Right) */}
        <div className="flex flex-col items-center z-10">
          {third ? (
            <div
              onClick={() => onSelectCompany(third)}
              className="group flex flex-col items-center cursor-pointer transition-transform hover:-translate-y-1"
            >
              {/* Avatar + Bronze Ribbon */}
              <div className="relative mb-1.5">
                <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-pink-500 via-rose-400 to-amber-300 shadow-lg shadow-pink-950/40">
                  <img
                    src={third.avatarUrl}
                    alt={third.name}
                    className="w-full h-full object-cover rounded-full bg-slate-800"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(third.name)}&background=ec4899&color=fff`;
                    }}
                  />
                </div>
                {/* Bronze Ribbon / Badge */}
                <div className="absolute -top-1 -right-1 flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 border border-slate-700 shadow-md">
                  <span className="flex items-center justify-center text-[11px] font-black text-amber-500">
                    🥉
                  </span>
                </div>
              </div>

              {/* Name */}
              <span className="text-xs font-semibold text-white tracking-tight text-center max-w-[85px] truncate group-hover:text-pink-400 transition-colors">
                {third.name}
              </span>

              {/* Pink/Coral Score Pill (like $200 in image) */}
              <div className="mt-1 px-2.5 py-0.5 rounded-md bg-gradient-to-r from-pink-400 to-rose-400 text-slate-950 font-extrabold text-[12px] shadow-sm shadow-pink-500/20 flex items-center gap-1">
                <span>{third.isUnrated ? 'S/ Nota' : third.score?.toFixed(1)}</span>
              </div>
            </div>
          ) : (
            <div className="h-24 flex items-center justify-center text-slate-600 text-xs">Vazio</div>
          )}

          {/* 3D Podium Block 3 */}
          <div className="w-full mt-3 flex flex-col items-center">
            {/* 3D Top surface */}
            <div className="w-full h-3 bg-gradient-to-r from-slate-800 to-slate-700 rounded-t-sm border-t border-white/15 transform skew-x-2"></div>
            {/* Front surface */}
            <div className="w-full h-18 bg-gradient-to-b from-[#161720] to-[#0a0b10] border-x border-b border-white/5 rounded-b-md flex items-center justify-center shadow-2xl relative">
              <span className="text-3xl font-extrabold text-slate-600/70 font-mono select-none">
                3
              </span>
              <div className="absolute bottom-1 text-[9px] text-slate-500 font-medium">
                {third ? (third.raStatus ?? '3º Lugar') : '3º'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
