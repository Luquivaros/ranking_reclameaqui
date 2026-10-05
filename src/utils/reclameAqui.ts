import { Company, ReclameAquiReputation } from '../types';

export function getReputation(
  score: number | null,
  isUnrated: boolean,
  solutionRate = 85,
  explicitStatus?: ReclameAquiReputation
): ReclameAquiReputation {
  if (explicitStatus) {
    return explicitStatus;
  }

  if (isUnrated || score === null) {
    return 'Sem Avaliação';
  }

  // RA1000 is reserved specifically for companies with maximum score 10.0
  if (score >= 10) {
    return 'RA1000';
  }
  if (score >= 8.0) {
    return 'Ótimo';
  }
  if (score >= 7.0) {
    return 'Bom';
  }
  if (score >= 6.0) {
    return 'Regular';
  }
  if (score >= 5.0) {
    return 'Ruim';
  }
  return 'Não Recomendada';
}

export function getReputationBadgeDetails(status: ReclameAquiReputation) {
  switch (status) {
    case 'RA1000':
      return {
        label: 'RA 1000',
        bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        pillColor: '#059669',
      };
    case 'Ótimo':
      return {
        label: 'Ótimo',
        bg: 'bg-green-50 text-green-800 border-green-200',
        text: 'text-green-700',
        border: 'border-green-200',
        pillColor: '#16a34a',
      };
    case 'Bom':
      return {
        label: 'Bom',
        bg: 'bg-blue-50 text-blue-800 border-blue-200',
        text: 'text-blue-700',
        border: 'border-blue-200',
        pillColor: '#2563eb',
      };
    case 'Regular':
      return {
        label: 'Regular',
        bg: 'bg-amber-50 text-amber-800 border-amber-200',
        text: 'text-amber-700',
        border: 'border-amber-200',
        pillColor: '#d97706',
      };
    case 'Ruim':
      return {
        label: 'Ruim',
        bg: 'bg-orange-50 text-orange-800 border-orange-200',
        text: 'text-orange-700',
        border: 'border-orange-200',
        pillColor: '#ea580c',
      };
    case 'Não Recomendada':
      return {
        label: 'Não Recomendada',
        bg: 'bg-rose-50 text-rose-800 border-rose-200',
        text: 'text-rose-700',
        border: 'border-rose-200',
        pillColor: '#e11d48',
      };
    case 'Sem Reputação':
      return {
        label: 'Sem Reputação',
        bg: 'bg-slate-100 text-slate-700 border-slate-200',
        text: 'text-slate-600',
        border: 'border-slate-200',
        pillColor: '#64748b',
      };
    case 'Não está no Reclame Aqui':
      return {
        label: 'Não no RA',
        bg: 'bg-zinc-100 text-zinc-600 border-zinc-200',
        text: 'text-zinc-600',
        border: 'border-zinc-200',
        pillColor: '#71717a',
      };
    case 'Sem Avaliação':
    default:
      return {
        label: 'Sem avaliação',
        bg: 'bg-slate-100 text-slate-600 border-slate-200',
        text: 'text-slate-600',
        border: 'border-slate-200',
        pillColor: '#94a3b8',
      };
  }
}

/**
 * Priority order for sorting:
 * 1. Score (descending from 10.0 to 0.0) -> ANY company with a valid numeric score!
 * 2. 'Não Recomendada' (evaluated but bad reputation, without numerical score)
 * 3. 'Sem Reputação' (registered on Reclame Aqui but not enough reviews)
 * 4. 'Não está no Reclame Aqui' (not listed on Reclame Aqui)
 */
export function getStatusTier(company: Company): number {
  if (company.raStatus === 'Não está no Reclame Aqui' || company.statusType === 'nao_cadastrada') {
    return 4;
  }
  if (company.raStatus === 'Sem Reputação' || company.statusType === 'sem_reputacao') {
    return 3;
  }

  // Se a empresa possui uma nota numérica válida, ela SEMPRE entra no Tier 1 (ranking por nota)
  const numScore =
    company.score !== null && company.score !== undefined ? Number(company.score) : null;
  const hasValidScore = numScore !== null && !isNaN(numScore) && !company.isUnrated;

  if (hasValidScore) {
    return 1;
  }

  if (company.raStatus === 'Não Recomendada' || company.statusType === 'nao_recomendada') {
    return 2;
  }

  return 3; // fallback unrated
}

export function sortCompaniesByRanking(companies: Company[]): Company[] {
  return [...companies].sort((a, b) => {
    const tierA = getStatusTier(a);
    const tierB = getStatusTier(b);

    if (tierA !== tierB) {
      return tierA - tierB;
    }

    // Se ambos possuem nota numérica válida, ordenar pela nota de forma decrescente (10.0 -> 0.0)
    const numScoreA =
      a.score !== null && a.score !== undefined && !a.isUnrated ? Number(a.score) : null;
    const numScoreB =
      b.score !== null && b.score !== undefined && !b.isUnrated ? Number(b.score) : null;
    const scoreA = numScoreA !== null && !isNaN(numScoreA) ? numScoreA : null;
    const scoreB = numScoreB !== null && !isNaN(numScoreB) ? numScoreB : null;

    if (scoreA !== null && scoreB !== null && scoreB !== scoreA) {
      return scoreB - scoreA;
    }
    if (scoreA !== null && scoreB === null) {
      return -1;
    }
    if (scoreA === null && scoreB !== null) {
      return 1;
    }

    // Critério de desempate secundário: taxa de solução (solution rate) decrescente
    const numRateA = typeof a.solutionRate === 'number' && !isNaN(a.solutionRate) ? a.solutionRate : -1;
    const numRateB = typeof b.solutionRate === 'number' && !isNaN(b.solutionRate) ? b.solutionRate : -1;
    if (numRateB !== numRateA) {
      return numRateB - numRateA;
    }

    // Critério de desempate final: ordem alfabética
    return a.name.localeCompare(b.name, 'pt-BR');
  });
}

export function formatScore(company: Company): string {
  if (company.raStatus === 'Não está no Reclame Aqui' || company.statusType === 'nao_cadastrada') {
    return 'Não no RA';
  }
  if (company.raStatus === 'Sem Reputação' || company.statusType === 'sem_reputacao') {
    return 'Sem Reputação';
  }

  // Verifica nota antes de avaliar rótulos textuais
  const numScore =
    company.score !== null && company.score !== undefined ? Number(company.score) : null;
  if (numScore !== null && !isNaN(numScore) && !company.isUnrated) {
    if (numScore >= 10) {
      return 'RA1000';
    }
    return numScore.toFixed(1);
  }

  if (company.raStatus === 'Não Recomendada' || company.statusType === 'nao_recomendada') {
    return 'Não Recomendada';
  }
  return 'Sem Avaliação';
}
