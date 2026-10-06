-- ==============================================================================
-- 1. TABELA PRINCIPAL DE EMPRESAS (RANKING RECLAME AQUI)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS companies (
  id            TEXT PRIMARY KEY,
  name          TEXT NOT NULL,
  handle        TEXT NOT NULL,
  score         NUMERIC(4,1),
  is_unrated    BOOLEAN NOT NULL DEFAULT false,
  avatar_url    TEXT,
  initials      TEXT,
  avatar_bg     TEXT,
  status_type   TEXT CHECK (status_type IN ('score','nao_recomendada','sem_reputacao','nao_cadastrada')),
  solution_rate NUMERIC(5,2),
  ra_status     TEXT,
  complaints_count INTEGER,
  category      TEXT,
  created_at    BIGINT NOT NULL
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso público para companies
DROP POLICY IF EXISTS "Leitura pública" ON companies;
CREATE POLICY "Leitura pública" ON companies
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Escrita pública" ON companies;
CREATE POLICY "Escrita pública" ON companies
  FOR ALL USING (true) WITH CHECK (true);


-- ==============================================================================
-- 2. TABELA DE RELATÓRIOS EXECUTIVOS DO RECLAME AQUI
-- ==============================================================================
CREATE TABLE IF NOT EXISTS reports (
  id                  TEXT PRIMARY KEY DEFAULT 'default',
  company_name        TEXT NOT NULL,
  cnpj                TEXT,
  segment             TEXT NOT NULL,
  report_date         TEXT NOT NULL,
  prepared_by         TEXT NOT NULL,
  semester            JSONB NOT NULL,
  monthly             JSONB NOT NULL,
  monthly_history     JSONB NOT NULL DEFAULT '[]'::jsonb,
  reasons             JSONB NOT NULL DEFAULT '[]'::jsonb,
  total_reasons_count INTEGER NOT NULL DEFAULT 0,
  created_at          BIGINT NOT NULL,
  updated_at          BIGINT NOT NULL
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso público para reports
DROP POLICY IF EXISTS "Leitura pública de relatórios" ON reports;
CREATE POLICY "Leitura pública de relatórios" ON reports
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Escrita pública de relatórios" ON reports;
CREATE POLICY "Escrita pública de relatórios" ON reports
  FOR ALL USING (true) WITH CHECK (true);


-- ==============================================================================
-- 3. INSERÇÃO DOS DADOS INICIAIS DO RELATÓRIO EXECUTIVO (SE NÃO EXISTIR)
-- ==============================================================================
INSERT INTO reports (
  id,
  company_name,
  cnpj,
  segment,
  report_date,
  prepared_by,
  semester,
  monthly,
  monthly_history,
  reasons,
  total_reasons_count,
  created_at,
  updated_at
) VALUES (
  'default',
  'Nexus Soluções Financeiras',
  '12.345.678/0001-90',
  'Serviços ao Consumidor',
  '30 de Setembro de 2026',
  'Lucas Eduardo',
  '{
    "reputationTier": "Boa",
    "reputationScore": 7.3,
    "analyzedPeriod": "01/04/2026 a 30/09/2026 (6 meses)",
    "receivedComplaints": 119,
    "answeredComplaints": 119,
    "waitingAnswerComplaints": 0,
    "evaluatedComplaints": 83,
    "resolvedComplaints": 62,
    "unresolvedComplaints": 21,
    "unevaluatedComplaints": 36,
    "wouldDoBusinessAgainRate": 59.0,
    "averageConsumerScore": 6.41,
    "averageResponseTime": "3 dias e 20 horas"
  }'::jsonb,
  '{
    "id": "2026-09",
    "monthLabel": "Setembro / 2026",
    "shortLabel": "Set/26",
    "totalComplaints": 24,
    "receivedComplaints": 24,
    "answeredComplaints": 24,
    "unevaluatedComplaints": 3,
    "unresolvedComplaints": 6,
    "resolvedComplaints": 15,
    "evaluatedComplaints": 21,
    "wouldDoBusinessAgainCount": 13,
    "wouldNotDoBusinessAgainCount": 8,
    "scoreBreakdown": [
      { "score": 10, "count": 13 },
      { "score": 8, "count": 1 },
      { "score": 5, "count": 1 },
      { "score": 1, "count": 1 },
      { "score": 0, "count": 5 }
    ]
  }'::jsonb,
  '[
    {
      "id": "2026-09",
      "monthLabel": "Setembro / 2026",
      "shortLabel": "Set/26",
      "totalComplaints": 24,
      "receivedComplaints": 24,
      "answeredComplaints": 24,
      "unevaluatedComplaints": 3,
      "unresolvedComplaints": 6,
      "resolvedComplaints": 15,
      "evaluatedComplaints": 21,
      "wouldDoBusinessAgainCount": 13,
      "wouldNotDoBusinessAgainCount": 8,
      "scoreBreakdown": [
        { "score": 10, "count": 13 },
        { "score": 8, "count": 1 },
        { "score": 5, "count": 1 },
        { "score": 1, "count": 1 },
        { "score": 0, "count": 5 }
      ]
    },
    {
      "id": "2026-08",
      "monthLabel": "Agosto / 2026",
      "shortLabel": "Ago/26",
      "totalComplaints": 22,
      "receivedComplaints": 22,
      "answeredComplaints": 22,
      "unevaluatedComplaints": 7,
      "unresolvedComplaints": 4,
      "resolvedComplaints": 11,
      "evaluatedComplaints": 15,
      "wouldDoBusinessAgainCount": 9,
      "wouldNotDoBusinessAgainCount": 6,
      "scoreBreakdown": [
        { "score": 10, "count": 11 },
        { "score": 7, "count": 1 },
        { "score": 0, "count": 3 }
      ]
    },
    {
      "id": "2026-07",
      "monthLabel": "Julho / 2026",
      "shortLabel": "Jul/26",
      "totalComplaints": 22,
      "receivedComplaints": 22,
      "answeredComplaints": 22,
      "unevaluatedComplaints": 5,
      "unresolvedComplaints": 3,
      "resolvedComplaints": 14,
      "evaluatedComplaints": 17,
      "wouldDoBusinessAgainCount": 14,
      "wouldNotDoBusinessAgainCount": 3,
      "scoreBreakdown": [
        { "score": 10, "count": 14 },
        { "score": 4, "count": 1 },
        { "score": 1, "count": 1 },
        { "score": 0, "count": 1 }
      ]
    },
    {
      "id": "2026-06",
      "monthLabel": "Junho / 2026",
      "shortLabel": "Jun/26",
      "totalComplaints": 16,
      "receivedComplaints": 16,
      "answeredComplaints": 16,
      "unevaluatedComplaints": 5,
      "unresolvedComplaints": 1,
      "resolvedComplaints": 10,
      "evaluatedComplaints": 11,
      "wouldDoBusinessAgainCount": 9,
      "wouldNotDoBusinessAgainCount": 2,
      "scoreBreakdown": [
        { "score": 10, "count": 9 },
        { "score": 4, "count": 1 },
        { "score": 0, "count": 1 }
      ]
    },
    {
      "id": "2026-05",
      "monthLabel": "Maio / 2026",
      "shortLabel": "Mai/26",
      "totalComplaints": 13,
      "receivedComplaints": 13,
      "answeredComplaints": 13,
      "unevaluatedComplaints": 6,
      "unresolvedComplaints": 2,
      "resolvedComplaints": 5,
      "evaluatedComplaints": 7,
      "wouldDoBusinessAgainCount": 1,
      "wouldNotDoBusinessAgainCount": 6,
      "scoreBreakdown": [
        { "score": 9, "count": 1 },
        { "score": 5, "count": 1 },
        { "score": 0, "count": 5 }
      ]
    },
    {
      "id": "2026-04",
      "monthLabel": "Abril / 2026",
      "shortLabel": "Abr/26",
      "totalComplaints": 23,
      "receivedComplaints": 23,
      "answeredComplaints": 23,
      "unevaluatedComplaints": 12,
      "unresolvedComplaints": 3,
      "resolvedComplaints": 8,
      "evaluatedComplaints": 11,
      "wouldDoBusinessAgainCount": 3,
      "wouldNotDoBusinessAgainCount": 8,
      "scoreBreakdown": [
        { "score": 7, "count": 1 },
        { "score": 5, "count": 1 },
        { "score": 4, "count": 2 },
        { "score": 3, "count": 1 },
        { "score": 0, "count": 6 }
      ]
    },
    {
      "id": "2026-03",
      "monthLabel": "Março / 2026",
      "shortLabel": "Mar/26",
      "totalComplaints": 24,
      "receivedComplaints": 24,
      "answeredComplaints": 24,
      "unevaluatedComplaints": 17,
      "unresolvedComplaints": 4,
      "resolvedComplaints": 3,
      "evaluatedComplaints": 7,
      "wouldDoBusinessAgainCount": 0,
      "wouldNotDoBusinessAgainCount": 7,
      "scoreBreakdown": [
        { "score": 0, "count": 7 }
      ]
    }
  ]'::jsonb,
  '[
    {
      "id": "1",
      "reason": "Cobrança indevida",
      "count": 7,
      "percentage": 31.82,
      "percentageFormatted": "31,82%",
      "department": "Financeiro / Cobrança"
    },
    {
      "id": "2",
      "reason": "Ligações excessivas",
      "count": 6,
      "percentage": 27.27,
      "percentageFormatted": "27,27%",
      "department": "Telemarketing / Contato"
    },
    {
      "id": "3",
      "reason": "Cancelamento",
      "count": 4,
      "percentage": 18.18,
      "percentageFormatted": "18,18%",
      "department": "Retenção / Contratos"
    },
    {
      "id": "4",
      "reason": "Atendimento",
      "count": 4,
      "percentage": 18.18,
      "percentageFormatted": "18,18%",
      "department": "Suporte / Operações"
    },
    {
      "id": "5",
      "reason": "Prejuízo financeiro",
      "count": 1,
      "percentage": 4.55,
      "percentageFormatted": "4,55%",
      "department": "Jurídico / Sinistro"
    }
  ]'::jsonb,
  22,
  1791244800000,
  1791244800000
) ON CONFLICT (id) DO UPDATE SET
  company_name = EXCLUDED.company_name,
  cnpj = EXCLUDED.cnpj,
  segment = EXCLUDED.segment,
  report_date = EXCLUDED.report_date,
  prepared_by = EXCLUDED.prepared_by,
  semester = EXCLUDED.semester,
  monthly = EXCLUDED.monthly,
  monthly_history = EXCLUDED.monthly_history,
  reasons = EXCLUDED.reasons,
  total_reasons_count = EXCLUDED.total_reasons_count,
  updated_at = EXCLUDED.updated_at;
