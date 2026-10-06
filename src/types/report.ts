export type ReputationTier = 
  | 'RA1000' 
  | 'Ótimo' 
  | 'Bom' 
  | 'Boa'
  | 'Regular' 
  | 'Ruim' 
  | 'Não Recomendada';

export interface SemesterData {
  reputationScore: number; // 7.3
  reputationTier: ReputationTier; // 'Boa'
  receivedComplaints: number; // 119
  answeredComplaints: number; // 119 (100.0%)
  waitingAnswerComplaints: number; // 0
  evaluatedComplaints: number; // 83
  resolvedComplaints: number; // 62 (74.7% das avaliadas)
  unresolvedComplaints: number; // 21 (25.3% das avaliadas)
  unevaluatedComplaints: number; // 36 (30.25% do recebido)
  wouldDoBusinessAgainRate: number; // 59.0%
  averageConsumerScore: number; // 6.41
  averageResponseTime: string; // "3 dias e 20 horas"
  analyzedPeriod: string; // "01/04/2026 a 30/09/2026 (6 meses)"
}

export interface ScoreBreakdown {
  score: number;
  count: number;
}

export interface MonthlyData {
  id: string; // "2026-09"
  monthLabel: string; // "Setembro / 2026"
  shortLabel: string; // "Set/26"
  totalComplaints: number;
  receivedComplaints: number;
  answeredComplaints: number;
  unevaluatedComplaints: number;
  unresolvedComplaints: number;
  resolvedComplaints: number;
  evaluatedComplaints: number;
  wouldDoBusinessAgainCount?: number;
  wouldNotDoBusinessAgainCount?: number;
  scoreBreakdown?: ScoreBreakdown[];
}

export interface ComplaintReason {
  id: string;
  reason: string;
  count: number;
  percentage: number; // e.g. 31.82
  percentageFormatted: string; // e.g. "31,82%"
  department?: string;
}

export interface ReportConfig {
  companyId?: string;
  companyName: string;
  reclameAquiUrl?: string;
  cnpj?: string;
  segment: string;
  reportDate: string;
  preparedBy: string;
  semester: SemesterData;
  monthly: MonthlyData;
  monthlyHistory: MonthlyData[];
  reasons: ComplaintReason[];
  totalReasonsCount: number;
}
