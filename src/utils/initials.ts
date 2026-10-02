export interface Palette {
  bg: string;
  hexBg: string;
  hexText: string;
  text?: string;
  border?: string;
}

export const PALETTES: Palette[] = [
  { bg: 'bg-slate-900 text-white border-slate-800', hexBg: '#0f172a', hexText: '#ffffff' },
  { bg: 'bg-blue-600 text-white border-blue-700', hexBg: '#2563eb', hexText: '#ffffff' },
  { bg: 'bg-emerald-600 text-white border-emerald-700', hexBg: '#059669', hexText: '#ffffff' },
  { bg: 'bg-indigo-600 text-white border-indigo-700', hexBg: '#4f46e5', hexText: '#ffffff' },
  { bg: 'bg-amber-600 text-white border-amber-700', hexBg: '#d97706', hexText: '#ffffff' },
  { bg: 'bg-teal-600 text-white border-teal-700', hexBg: '#0d9488', hexText: '#ffffff' },
  { bg: 'bg-violet-600 text-white border-violet-700', hexBg: '#7c3aed', hexText: '#ffffff' },
  { bg: 'bg-rose-600 text-white border-rose-700', hexBg: '#e11d48', hexText: '#ffffff' },
  { bg: 'bg-cyan-700 text-white border-cyan-800', hexBg: '#0e7490', hexText: '#ffffff' },
  { bg: 'bg-purple-600 text-white border-purple-700', hexBg: '#9333ea', hexText: '#ffffff' },
  { bg: 'bg-sky-600 text-white border-sky-700', hexBg: '#0284c7', hexText: '#ffffff' },
  { bg: 'bg-stone-700 text-white border-stone-800', hexBg: '#44403c', hexText: '#ffffff' },
];

/**
 * Extracts initials from a company name (e.g., "Novare Assessoria" -> "NA", "WNR Consultoria" -> "WNR", "C&M Pneus" -> "C&M")
 */
export function getCompanyInitials(name: string): string {
  const clean = name.trim();
  if (!clean) return '??';

  // Acronyms at start (e.g. WNR, EWS, C&M)
  const acronymMatch = clean.match(/^([A-Z&]{2,4})(\s|$)/);
  if (acronymMatch) {
    return acronymMatch[1];
  }

  // Split into words, excluding common stop words
  const stopWords = new Set([
    'e',
    'de',
    'da',
    'do',
    'das',
    'dos',
    'em',
    'com',
    'para',
    'ltda',
    'me',
    'epp',
    'sa',
    's/a',
  ]);

  const words = clean
    .split(/[\s\-]+/)
    .filter((w) => !stopWords.has(w.toLowerCase().replace(/[^a-z0-9&]/gi, '')));

  if (words.length === 0) {
    return clean.slice(0, 2).toUpperCase();
  }
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  // First letters of the first two significant words
  const first = words[0][0] || '';
  const second = words[1][0] || '';
  return (first + second).toUpperCase();
}

/**
 * Returns a consistent palette for a given name
 */
export function getCompanyPalette(name: string): Palette {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % PALETTES.length;
  return PALETTES[index];
}

/**
 * Creates an SVG Data URL containing the company initials
 */
export function createInitialsSvgDataUrl(
  initials: string,
  hexBg = '#0f172a',
  hexText = '#ffffff'
): string {
  const fontSize = initials.length >= 3 ? 34 : 44;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect width="100" height="100" rx="50" fill="${hexBg}"/>
  <text x="50" y="50" dy="0.36em" fill="${hexText}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="${fontSize}" font-weight="700" text-anchor="middle" letter-spacing="-1">${initials}</text>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
