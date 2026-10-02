export type ReclameAquiReputation = 
  | 'RA1000'
  | 'Ótimo'
  | 'Bom'
  | 'Regular'
  | 'Ruim'
  | 'Não Recomendada'
  | 'Sem Reputação'
  | 'Não está no Reclame Aqui'
  | 'Sem Avaliação';

export type CompanyStatusType =
  | 'score'
  | 'nao_recomendada'
  | 'sem_reputacao'
  | 'nao_cadastrada';

export interface Company {
  id: string;
  name: string;
  handle: string; // e.g., @logistica, @telecom, etc.
  score: number | null; // null represents unrated/no score, otherwise 0.0 to 10.0
  isUnrated: boolean;
  avatarUrl: string;
  initials?: string;
  avatarBg?: string;
  statusType?: CompanyStatusType;
  solutionRate?: number; // e.g. 92.4%
  raStatus?: ReclameAquiReputation;
  complaintsCount?: number;
  category?: string;
  createdAt: number;
}

export type ViewMode = 'mobile' | 'expanded';
