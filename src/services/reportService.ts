import { supabase } from '../lib/supabase';
import { ReportConfig } from '../types/report';
import { initialReportData } from '../data/defaultReportData';
import { novareReportData } from '../data/novareReportData';

export const DEFAULT_REPORT_ID = 'default';

// Helper para obter dados padrão da empresa
export function getCompanyDefaultData(companyId: string): ReportConfig {
  if (companyId === 'novare') {
    return novareReportData;
  }
  return initialReportData;
}

// Converter do formato do banco (snake_case) para ReportConfig (camelCase)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromReportDbRow(row: any, fallback: ReportConfig): ReportConfig {
  const companyName = (!row.company_name || row.company_name === 'Diagnóstico Corporativo')
    ? fallback.companyName
    : row.company_name;

  return {
    companyId: row.company_id || fallback.companyId,
    companyName,
    reclameAquiUrl: row.reclame_aqui_url || fallback.reclameAquiUrl,
    cnpj: row.cnpj || fallback.cnpj,
    segment: row.segment || fallback.segment,
    reportDate: row.report_date || fallback.reportDate,
    preparedBy: row.prepared_by || fallback.preparedBy,
    semester: row.semester || fallback.semester,
    monthly: row.monthly || fallback.monthly,
    monthlyHistory: Array.isArray(row.monthly_history) && row.monthly_history.length > 0 
      ? row.monthly_history 
      : fallback.monthlyHistory,
    reasons: Array.isArray(row.reasons) && row.reasons.length > 0 
      ? row.reasons 
      : fallback.reasons,
    totalReasonsCount: typeof row.total_reasons_count === 'number' 
      ? row.total_reasons_count 
      : fallback.totalReasonsCount,
  };
}

// Converter de ReportConfig para o formato do banco (snake_case)
function toReportDbRow(config: ReportConfig, id: string): Record<string, unknown> {
  const now = Date.now();
  return {
    id,
    company_name: config.companyName,
    cnpj: config.cnpj ?? null,
    segment: config.segment,
    report_date: config.reportDate,
    prepared_by: config.preparedBy,
    semester: config.semester,
    monthly: config.monthly,
    monthly_history: config.monthlyHistory,
    reasons: config.reasons,
    total_reasons_count: config.totalReasonsCount,
    updated_at: now,
  };
}

/**
 * Busca o relatório da empresa (Nexus ou Novare) no Supabase com fallback seguro.
 */
export async function getReportData(companyId: string = 'nexus'): Promise<{ data: ReportConfig; fromDb: boolean; error: string | null }> {
  const fallback = getCompanyDefaultData(companyId);
  const targetId = companyId === 'novare' ? 'novare' : DEFAULT_REPORT_ID;

  try {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('id', targetId)
      .maybeSingle();

    if (error) {
      console.warn('Supabase reports aviso (usando fallback local):', error.message);
      return { data: fallback, fromDb: false, error: error.message };
    }

    if (data) {
      return { data: fromReportDbRow(data, fallback), fromDb: true, error: null };
    }

    // Se o registro não existe no banco, tenta persistir o padrão da empresa
    try {
      const row = toReportDbRow(fallback, targetId);
      await supabase.from('reports').insert({ ...row, created_at: Date.now() });
    } catch (insertErr) {
      console.warn('Aviso ao inserir dados iniciais:', insertErr);
    }

    return { data: fallback, fromDb: false, error: null };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Erro ao carregar relatório';
    console.error('Falha de conexão com Supabase:', err);
    return { data: fallback, fromDb: false, error: msg };
  }
}

/**
 * Salva ou atualiza os dados do relatório no Supabase.
 */
export async function saveReportData(config: ReportConfig): Promise<{ success: boolean; error: string | null }> {
  try {
    const now = Date.now();
    const row = toReportDbRow(config, DEFAULT_REPORT_ID);

    const { error } = await supabase
      .from('reports')
      .upsert({ ...row, created_at: now }, { onConflict: 'id' });

    if (error) {
      console.error('Erro ao atualizar relatório no Supabase:', error);
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Erro ao salvar relatório';
    console.error('Falha crítica ao salvar relatório:', err);
    return { success: false, error: msg };
  }
}
