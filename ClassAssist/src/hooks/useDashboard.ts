import { useState, useEffect } from 'react';
import type { DashboardStats, TodayClass, RecentActivity } from '../types';
import {
  fetchDashboardStats,
  fetchTodayClasses,
  fetchRecentActivity,
  fetchWeeklyRates,
  fetchInstructor,
} from '../services/dashboardService';

interface DashboardData {
  stats: DashboardStats | null;
  todayClasses: TodayClass[];
  recentActivity: RecentActivity[];
  weeklyRates: number[];
  instructorName: string;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useDashboard(): DashboardData {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [todayClasses, setTodayClasses] = useState<TodayClass[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [weeklyRates, setWeeklyRates] = useState<number[]>([]);
  const [instructorName, setInstructorName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  const refresh = () => setTick((t) => t + 1);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [s, tc, ra, wr, inst] = await Promise.all([
          fetchDashboardStats(),
          fetchTodayClasses(),
          fetchRecentActivity(),
          fetchWeeklyRates(),
          fetchInstructor(),
        ]);
        if (!cancelled) {
          setStats(s);
          setTodayClasses(tc);
          setRecentActivity(ra);
          setWeeklyRates(wr);
          setInstructorName(inst.name);
        }
      } catch (e) {
        if (!cancelled) setError('Failed to load dashboard data.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [tick]);

  return { stats, todayClasses, recentActivity, weeklyRates, instructorName, loading, error, refresh };
}