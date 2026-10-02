import React, { useState, useEffect } from 'react';
import { X, Star, Check, AlertTriangle, Building } from 'lucide-react';
import { Company, CompanyStatusType, ReclameAquiReputation } from '../types';
import { getReputation, getReputationBadgeDetails } from '../utils/reclameAqui';
import {
  getCompanyInitials,
  getCompanyPalette,
  createInitialsSvgDataUrl,
} from '../utils/initials';

interface CompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (companyData: Partial<Company>) => void;
  initialData?: Company | null;
}

export const CompanyModal: React.FC<CompanyModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const isEditing = !!initialData;

  const [name, setName] = useState('');
  const [customInitials, setCustomInitials] = useState('');
  const [handle, setHandle] = useState('');
  const [category, setCategory] = useState('');
  const [statusType, setStatusType] = useState<CompanyStatusType>('score');
  const [score, setScore] = useState<number>(7.5);
  const [solutionRate, setSolutionRate] = useState<number>(85);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setCustomInitials(initialData.initials || getCompanyInitials(initialData.name));
      setHandle(initialData.handle || '');
      setCategory(initialData.category || '');
      setStatusType(initialData.statusType || (initialData.score !== null ? 'score' : 'sem_reputacao'));
      setScore(initialData.score ?? 7.0);
      setSolutionRate(initialData.solutionRate ?? 85);
    } else {
      setName('');
      setCustomInitials('');
      setHandle('');
      setCategory('Serviços');
      setStatusType('score');
      setScore(7.5);
      setSolutionRate(85);
    }
    setError(null);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const activeInitials = (customInitials.trim() || getCompanyInitials(name || 'Empresa')).toUpperCase();
  const palette = getCompanyPalette(name || 'Empresa');

  let currentReputation: ReclameAquiReputation = 'Sem Reputação';
  if (statusType === 'score') {
    currentReputation = getReputation(score, false, solutionRate);
  } else if (statusType === 'nao_recomendada') {
    currentReputation = 'Não Recomendada';
  } else if (statusType === 'sem_reputacao') {
    currentReputation = 'Sem Reputação';
  } else if (statusType === 'nao_cadastrada') {
    currentReputation = 'Não está no Reclame Aqui';
  }

  const badge = getReputationBadgeDetails(currentReputation);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('O nome da empresa é obrigatório.');
      return;
    }

    const initials = activeInitials;
    const svgDataUrl = createInitialsSvgDataUrl(initials, palette.hexBg, palette.hexText);

    const isScoreStatus = statusType === 'score';
    const finalScore = isScoreStatus ? Number(Number(score).toFixed(1)) : null;

    const companyData: Partial<Company> = {
      name: name.trim(),
      initials,
      avatarBg: palette.bg,
      avatarUrl: svgDataUrl,
      handle: handle.trim()
        ? (handle.startsWith('@') ? handle.trim() : `@${handle.trim()}`)
        : `@${name.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
      category: category.trim() || 'Serviços Financeiros',
      statusType,
      isUnrated: !isScoreStatus,
      score: finalScore,
      solutionRate: isScoreStatus ? Number(solutionRate) : undefined,
      raStatus: currentReputation,
    };

    onSave(companyData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        id="company-modal-card"
        className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              {isEditing ? 'Editar Empresa' : 'Adicionar Nova Empresa'}
            </h2>
            <p className="text-xs text-slate-500">
              Gestão de empresas e notas do Reclame Aqui
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          {error && (
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Initials Avatar Preview */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3.5">
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center font-extrabold text-base tracking-tight shadow-sm border ${palette.bg}`}
            >
              {activeInitials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 text-xs">
                  Foto / Iniciais Geradas
                </span>
                <span className="text-[10px] text-slate-500">Automático</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Foto baseada nas iniciais do nome da empresa.
              </p>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="text-[10px] text-slate-500">Iniciais:</span>
                <input
                  type="text"
                  maxLength={4}
                  value={customInitials}
                  onChange={(e) => setCustomInitials(e.target.value.toUpperCase())}
                  placeholder={getCompanyInitials(name || 'Empresa')}
                  className="w-20 px-2 py-0.5 rounded-lg bg-white border border-slate-200 text-slate-900 font-bold text-xs uppercase focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Company Name */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Nome da Empresa <span className="text-rose-500">*</span>
            </label>
            <input
              id="input-company-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Nexus Soluções Financeiras, Novare Assessoria..."
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 text-xs font-medium"
            />
          </div>

          {/* Handle / Identificador & Sector */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Identificador / @
              </label>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="@empresa"
                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Segmento / Setor
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Ex: Financeiro, Assessoria..."
                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 text-xs"
              />
            </div>
          </div>

          {/* Reclame Aqui Status Selection */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                Situação no Reclame Aqui
              </span>
              <div className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${badge.bg} ${badge.text} ${badge.border}`}>
                {badge.label}
              </div>
            </div>

            {/* Status Type Tabs */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-200/70 rounded-xl">
              <button
                type="button"
                onClick={() => setStatusType('score')}
                className={`py-1.5 px-2 rounded-lg font-medium text-center transition-all duration-300 ease-out cursor-pointer ${
                  statusType === 'score'
                    ? 'bg-white text-slate-900 font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
                }`}
              >
                Com Nota (0 a RA1000)
              </button>
              <button
                type="button"
                onClick={() => setStatusType('nao_recomendada')}
                className={`py-1.5 px-2 rounded-lg font-medium text-center transition-all duration-300 ease-out cursor-pointer ${
                  statusType === 'nao_recomendada'
                    ? 'bg-white text-rose-700 font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
                }`}
              >
                Não Recomendada
              </button>
              <button
                type="button"
                onClick={() => setStatusType('sem_reputacao')}
                className={`py-1.5 px-2 rounded-lg font-medium text-center transition-all duration-300 ease-out cursor-pointer ${
                  statusType === 'sem_reputacao'
                    ? 'bg-white text-slate-900 font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
                }`}
              >
                Sem Reputação
              </button>
              <button
                type="button"
                onClick={() => setStatusType('nao_cadastrada')}
                className={`py-1.5 px-2 rounded-lg font-medium text-center transition-all duration-300 ease-out cursor-pointer ${
                  statusType === 'nao_cadastrada'
                    ? 'bg-white text-slate-900 font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
                }`}
              >
                Não está no RA
              </button>
            </div>

            {statusType === 'score' ? (
              <div className="space-y-3 pt-2">
                {/* Score Input & Slider with RA1000 as Maximum */}
                <div>
                  <div className="flex items-center justify-between mb-1.5 text-[11px]">
                    <span className="text-slate-600 font-medium">Nota no Reclame Aqui:</span>
                    <div className="flex items-center gap-1.5">
                      {score >= 10 ? (
                        <span className="inline-flex items-center gap-1 text-emerald-800 font-extrabold text-xs px-2.5 py-0.5 rounded-lg bg-emerald-100 border border-emerald-300 shadow-2xs animate-pulse">
                          <span>🏆</span> RA1000 (Nota Máxima)
                        </span>
                      ) : (
                        <span className="text-slate-900 font-bold text-xs px-2 py-0.5 rounded-lg bg-white border border-slate-200">
                          ⭐ {Number(score).toFixed(1)}
                        </span>
                      )}
                    </div>
                  </div>

                  <input
                    id="input-company-score"
                    type="range"
                    min="0"
                    max="10"
                    step="0.1"
                    value={score}
                    onChange={(e) => setScore(parseFloat(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />

                  {/* Slider graduation labels showing RA1000 as the maximum */}
                  <div className="flex justify-between items-center text-[10px] text-slate-400 px-0.5 pt-1">
                    <span>0.0</span>
                    <span>5.0 (Ruim)</span>
                    <span>7.0 (Bom)</span>
                    <span>8.0 (Ótimo)</span>
                    <button
                      type="button"
                      onClick={() => setScore(10)}
                      className={`font-bold transition-colors cursor-pointer px-1 py-0.5 rounded ${
                        score >= 10
                          ? 'text-emerald-700 bg-emerald-100 font-extrabold'
                          : 'text-emerald-600 hover:text-emerald-800'
                      }`}
                      title="Definir nota máxima RA1000 (10.0)"
                    >
                      ★ RA1000 (10.0)
                    </button>
                  </div>
                </div>

                {/* Quick RA1000 Shortcut */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50/80 border border-emerald-200 text-[11px]">
                  <div className="flex items-center gap-1.5 text-emerald-900">
                    <span className="font-bold">Nota máxima:</span>
                    <span className="text-emerald-700">Todas as empresas nota 10 recebem RA1000</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setScore(10)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      score >= 10
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                    }`}
                  >
                    {score >= 10 ? '✓ RA1000 Ativo' : 'Definir RA1000'}
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <label className="text-[11px] text-slate-500 block mb-1">
                      Digitar nota (0 a 10 ou RA1000):
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      value={score}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        if (!isNaN(val)) setScore(Math.min(10, Math.max(0, val)));
                      }}
                      className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-900 font-bold text-xs focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-[11px] text-slate-500 block mb-1">
                      Taxa de Solução (%):
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      value={solutionRate}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        if (!isNaN(val)) setSolutionRate(Math.min(100, Math.max(0, val)));
                      }}
                      className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-900 font-bold text-xs focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>
              </div>
            ) : statusType === 'nao_recomendada' ? (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[11px] leading-relaxed">
                Empresa avaliada pelos consumidores com índice insatisfatório no Reclame Aqui.
              </div>
            ) : statusType === 'sem_reputacao' ? (
              <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-[11px] leading-relaxed">
                Empresa cadastrada no Reclame Aqui, porém sem volume suficiente de reclamações avaliadas para formar um índice no período.
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-700 text-[11px] leading-relaxed">
                Empresa sem cadastro ou página ativa identificada na plataforma do Reclame Aqui.
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-all duration-300 ease-out font-semibold cursor-pointer"
            >
              Cancelar
            </button>
            <button
              id="btn-save-company"
              type="submit"
              className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold tracking-tight shadow-xs transition-all duration-300 ease-out hover:scale-[1.02] flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>{isEditing ? 'Salvar Alterações' : 'Adicionar ao Ranking'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
