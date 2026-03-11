import type { AttendanceStatus } from '../types';

/**
 * Format an ISO date string into a human-readable label.
 * e.g. "2025-03-10" → "Mon, Mar 10"
 */
export function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

/**
 * Returns today's ISO date string (YYYY-MM-DD)
 */
export function todayISO(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Computes attendance rate as a rounded percentage string.
 */
export function attendanceRatePct(present: number, total: number): string {
  if (total === 0) return '0%';
  return `${Math.round((present / total) * 100)}%`;
}

/**
 * Tailwind color class for each attendance status
 */
export const statusColor: Record<AttendanceStatus, string> = {
  present: 'text-emerald-500',
  absent: 'text-rose-500',
  late: 'text-amber-500',
  excused: 'text-sky-500',
};

export const statusBg: Record<AttendanceStatus, string> = {
  present: 'bg-emerald-500/10 text-emerald-600',
  absent: 'bg-rose-500/10 text-rose-600',
  late: 'bg-amber-500/10 text-amber-600',
  excused: 'bg-sky-500/10 text-sky-600',
};

/**
 * Clamp a number between min and max
 */
export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}