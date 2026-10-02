import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { Company } from '../types';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  company: Company | null;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  company,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !company) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-sm bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 shrink-0">
            <Trash2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Remover do Ranking?
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Tem certeza que deseja apagar a empresa{' '}
              <strong className="text-slate-900">{company.name}</strong>? Esta ação
              recalculará a posição de todas as outras empresas no ranking.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
          >
            Excluir Empresa
          </button>
        </div>
      </div>
    </div>
  );
};
