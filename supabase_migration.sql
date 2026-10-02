-- Tabela principal de empresas do Ranking Reclame Aqui
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

-- Habilitar Row Level Security (segurança por linha)
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- Política: qualquer usuário anon pode ler
CREATE POLICY "Leitura pública" ON companies
  FOR SELECT USING (true);

-- Política: qualquer usuário anon pode inserir, atualizar e deletar
-- (para uso sem autenticação; remova e use auth se precisar de controle de acesso)
CREATE POLICY "Escrita pública" ON companies
  FOR ALL USING (true) WITH CHECK (true);
