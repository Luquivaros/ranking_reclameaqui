import { supabase } from '../lib/supabase';
import { ReportConfig } from '../types/report';
import { initialReportData } from '../data/defaultReportData';

export const DEFAULT_REPORT_ID = 'default';

// Converter do formato do banco (snake_case) para ReportConfig (camelCase)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromReportDbRow(row: any): ReportConfig {
  const companyName = (!row.company_name || row.company_name === 'Diagnóstico Corporativo')
    ? initialReportData.companyName
    : row.company_name;

  return {
    companyName,
    cnpj: row.cnpj || undefined,
    segment: row.segment || initialReportData.segment,
    reportDate: row.report_date || initialReportData.reportDate,
    preparedBy: row.prepared_by || initialReportData.preparedBy,
    semester: row.semester || initialReportData.semester,
    monthly: row.monthly || initialReportData.monthly,
    monthlyHistory: Array.isArray(row.monthly_history) && row.monthly_history.length > 0 
      ? row.monthly_history 
      : initialReportData.monthlyHistory,
    reasons: Array.isArray(row.reasons) && row.reasons.length > 0 
      ? row.reasons 
      : initialReportData.reasons,
    totalReasonsCount: typeof row.total_reasons_count === 'number' 
      ? row.total_reasons_count 
      : initialReportData.totalReasonsCount,
  };
}

// Converter de ReportConfig para o formato do banco (snake_case)
function toReportDbRow(config: ReportConfig, id: string = DEFAULT_REPORT_ID): Record<string, unknown> {
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
 * Busca o relatório no Supabase. Caso o banco esteja vazio ou a tabela ainda não exista,
 * retorna os dados locais (initialReportData) com fallback seguro.
 */
export async function getReportData(): Promise<{ data: ReportConfig; fromDb: boolean; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('id', DEFAULT_REPORT_ID)
      .maybeSingle();

    if (error) {
      // Se der erro (ex: tabela reports ainda não criada no Supabase), avisa no console e usa dados padrão
      console.warn('Supabase reports aviso (usando fallback local):', error.message);
      return { data: initialReportData, fromDb: false, error: error.message };
    }

    if (data) {
      return { data: fromReportDbRow(data), fromDb: true, error: null };
    }

    // Se a tabela existe mas o registro padrão ainda não foi inserido, tenta criar
    try {
      const row = toReportDbRow(initialReportData, DEFAULT_REPORT_ID);
      await supabase.from('reports').insert({ ...row, created_at: Date.now() });
    } catch (insertErr) {
      console.warn('Não foi possível inserir o relatório inicial no Supabase:', insertErr);
    }

    return { data: initialReportData, fromDb: false, error: null };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Erro desconhecido ao carregar relatório';
    console.error('Falha ao conectar com o Supabase reports:', err);
    return { data: initialReportData, fromDb: false, error: msg };
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
