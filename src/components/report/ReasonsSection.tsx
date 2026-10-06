import React, { useState } from 'react';
import { ReportConfig } from '../../types/report';
import { Search, AlertCircle } from 'lucide-react';

export function ReasonsSection({ data }: { data: ReportConfig }) {
  const [searchTerm, setSearchTerm] = useState('');
  const reasons = data.reasons;
  const totalCount = reasons.reduce((acc, curr) => acc + curr.count, 0);

  const filteredReasons = reasons.filter(r => 
    r.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (r.department && r.department.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section id="motivos" className="pt-10 sm:pt-16 pb-6 sm:pb-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/[0.06] pb-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#007636] block">
              Diagnóstico de Causas
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-black tracking-tight">
              Principais Motivos das Reclamações
            </h2>
          </div>

          {/* Search Filter for Instant Table Filtering */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-black/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar motivo ou departamento..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-black/[0.1] bg-[#FAFAFA] text-black placeholder:text-black/40 focus:outline-none focus:border-[#007636] focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Pareto Insight Alert */}
        <div className="p-5 rounded-xl border border-black/[0.08] bg-[#FAFAFA] flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-[#007636] shrink-0 mt-0.5" />
          <div className="text-xs text-black/75 leading-relaxed font-normal">
            <strong className="font-semibold text-black">Concentração Prioritária de Chamados: </strong>
            Os motivos <strong>Cobrança indevida (7 ocorrências · 31,82%)</strong> e <strong>Ligações excessivas (6 ocorrências · 27,27%)</strong> respondem conjuntamente por <strong>59,09%</strong> de todas as queixas registradas. Ações preventivas focadas nessas duas vertentes reduzirão mais da metade da volumetria no Reclame AQUI.
          </div>
        </div>

        {/* Desktop & Tablet Table View */}
        <div className="hidden sm:block overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-2xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-black/[0.08] text-[11px] font-semibold uppercase tracking-wider text-black/50 bg-[#FAFAFA]">
                <th scope="col" className="py-3.5 px-6">Motivo da Reclamação</th>
                <th scope="col" className="py-3.5 px-4">Área / Departamento</th>
                <th scope="col" className="py-3.5 px-4 text-center font-mono-numbers">Quantidade</th>
                <th scope="col" className="py-3.5 px-4 text-right font-mono-numbers">%</th>
                <th scope="col" className="py-3.5 px-6 text-left">Distribuição Proporcional</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.06] text-xs font-normal">
              {filteredReasons.map((item, index) => (
                <tr key={item.id} className="hover:bg-black/[0.01] transition-colors">
                  <td className="py-4 px-6 font-semibold text-black">
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-black/5 flex items-center justify-center text-[10px] font-bold text-black/60 font-mono-numbers">
                        {index + 1}
                      </span>
                      <span>{item.reason}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-black/60">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-black/[0.04] text-[11px] font-medium text-black/70">
                      {item.department || "Operações"}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center font-bold text-black font-mono-numbers">
                    {item.count}
                  </td>
                  <td className="py-4 px-4 text-right font-bold text-black font-mono-numbers">
                    {item.percentageFormatted}
                  </td>
                  <td className="py-4 px-6">
                    <div className="w-full bg-black/[0.06] rounded-full h-2 overflow-hidden flex">
                      <div 
                        className="bg-[#007636] h-full rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {filteredReasons.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-black/40 text-xs">
                    Nenhum motivo encontrado para "{searchTerm}".
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className="border-t border-black/[0.1] bg-[#FAFAFA] font-bold text-xs text-black">
                <td className="py-3.5 px-6">Total Analisado</td>
                <td className="py-3.5 px-4 text-black/50 font-normal">—</td>
                <td className="py-3.5 px-4 text-center font-mono-numbers">{totalCount}</td>
                <td className="py-3.5 px-4 text-right font-mono-numbers">100,00%</td>
                <td className="py-3.5 px-6">
                  <div className="w-full bg-[#007636] h-2 rounded-full opacity-30" />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Mobile-Friendly Interactive Card List */}
        <div className="sm:hidden space-y-3">
          {filteredReasons.map((item, index) => (
            <div key={item.id} className="p-4 rounded-xl border border-black/[0.08] bg-white space-y-2.5 shadow-2xs">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-black/5 flex items-center justify-center text-[10px] font-bold text-black/60 font-mono-numbers shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-xs font-bold text-black">{item.reason}</span>
                </div>
                <span className="text-xs font-bold text-black font-mono-numbers shrink-0">
                  {item.percentageFormatted}
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-black/60 pt-1">
                <span className="px-2 py-0.5 rounded bg-black/[0.04] font-medium">
                  {item.department || "Operações"}
                </span>
                <span className="font-mono-numbers font-semibold text-black">
                  {item.count} chamados
                </span>
              </div>

              <div className="w-full bg-black/[0.06] rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-[#007636] h-full rounded-full"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
          {filteredReasons.length === 0 && (
            <div className="p-6 text-center text-black/40 text-xs bg-white rounded-xl border border-black/[0.08]">
              Nenhum motivo encontrado para "{searchTerm}".
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
