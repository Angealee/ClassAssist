/**
 * dashboardService.ts
 *
 * All data-fetching logic for the Dashboard module.
 * Currently returns mock data. Replace each function body with
 * real fetch() / axios calls when the backend is ready.
 *
 * Convention: every function returns a Promise so the UI
 * never needs to change when switching from mock → real API.
 */

import type { DashboardStats, TodayClass, RecentActivity } from '../types';
import {
  mockDashboardStats,
  mockTodayClasses,
  mockRecentActivity,
  mockWeeklyRates,
  mockInstructor,
} from './mockData';

// Simulate network latency in development
const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

// ─── GET /api/dashboard/stats ─────────────────────────────────────────────────
export async function fetchDashboardStats(): Promise<DashboardStats> {
  await delay();
  // TODO: return await api.get('/api/dashboard/stats');
  return mockDashboardStats;
}

// ─── GET /api/classes/today ───────────────────────────────────────────────────
export async function fetchTodayClasses(): Promise<TodayClass[]> {
  await delay();
  // TODO: return await api.get('/api/classes/today');
  return mockTodayClasses;
}

// ─── GET /api/attendance/recent ───────────────────────────────────────────────
export async function fetchRecentActivity(): Promise<RecentActivity[]> {
  await delay();
  // TODO: return await api.get('/api/attendance/recent');
  return mockRecentActivity;
}

// ─── GET /api/attendance/weekly-rates ─────────────────────────────────────────
export async function fetchWeeklyRates(): Promise<number[]> {
  await delay();
  // TODO: return await api.get('/api/attendance/weekly-rates');
  return mockWeeklyRates;
}

// ─── GET /api/instructor/me ───────────────────────────────────────────────────
export async function fetchInstructor() {
  await delay(100);
  // TODO: return await api.get('/api/instructor/me');
  return mockInstructor;
}