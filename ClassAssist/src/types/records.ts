export interface Student {
  id: string;
  lastName: string;
  firstName: string;
  middleName: string;
}

export interface Section {
  id: string;
  name: string;
  subject: string;
  room: string;
  schedule: string;
  students: Student[];
}

export interface GradeEntry {
  quiz: string;
  recitation: string;
  pt: string;
  exam: string;
}

export type GradeStore = Record<string, GradeEntry>;

// Derived
export const toNum = (v: string): number => {
  const n = parseFloat(v);
  return isNaN(n) ? 0 : Math.min(100, Math.max(0, n));
};

export const computeFinal = (g: GradeEntry): number =>
  (toNum(g.quiz) + toNum(g.recitation) + toNum(g.pt) + toNum(g.exam)) / 4;

export const gradeLabel = (score: number): string => {
  if (score >= 97) return '1.0';
  if (score >= 94) return '1.25';
  if (score >= 91) return '1.50';
  if (score >= 88) return '1.75';
  if (score >= 85) return '2.0';
  if (score >= 82) return '2.25';
  if (score >= 79) return '2.50';
  if (score >= 76) return '2.75';
  if (score >= 75) return '3.0';
  return '5.0';
};

export const gradeTextColor = (score: number): string => {
  if (score >= 88) return 'text-emerald-600';
  if (score >= 80) return 'text-sky-600';
  if (score >= 75) return 'text-amber-500';
  return 'text-red-500';
};

export const gradeBarColor = (score: number): string => {
  if (score >= 88) return 'bg-emerald-500';
  if (score >= 80) return 'bg-sky-500';
  if (score >= 75) return 'bg-amber-400';
  return 'bg-red-400';
};

export const AVATAR_COLORS = [
  { bg: 'bg-indigo-100', text: 'text-indigo-600' },
  { bg: 'bg-sky-100',    text: 'text-sky-600' },
  { bg: 'bg-emerald-100',text: 'text-emerald-600' },
  { bg: 'bg-amber-100',  text: 'text-amber-600' },
  { bg: 'bg-rose-100',   text: 'text-rose-600' },
  { bg: 'bg-violet-100', text: 'text-violet-600' },
];

export const avatarColor = (id: string) =>
  AVATAR_COLORS[parseInt(id.slice(-1)) % AVATAR_COLORS.length];

export const SECTION_ACCENTS = [
  { icon: 'bg-indigo-100', iconText: 'text-indigo-600', bar: 'bg-indigo-500', badge: 'bg-indigo-50 text-indigo-600', ring: 'ring-indigo-200' },
  { icon: 'bg-sky-100',    iconText: 'text-sky-600',    bar: 'bg-sky-500',    badge: 'bg-sky-50 text-sky-600',       ring: 'ring-sky-200' },
  { icon: 'bg-emerald-100',iconText: 'text-emerald-600',bar: 'bg-emerald-500',badge: 'bg-emerald-50 text-emerald-600',ring: 'ring-emerald-200' },
  { icon: 'bg-amber-100',  iconText: 'text-amber-600',  bar: 'bg-amber-400',  badge: 'bg-amber-50 text-amber-600',   ring: 'ring-amber-200' },
];