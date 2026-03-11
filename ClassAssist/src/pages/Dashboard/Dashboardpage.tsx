import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/react';
import { useDashboard } from '../../hooks/useDashboard';
import StatCard from '../../components/dashboard/StatCard';
import AttendanceRateGauge from '../../components/dashboard/AttendanceRateGauge';
import TodayClassCard from '../../components/dashboard/TodayClassCard';
import RecentActivityRow from '../../components/dashboard/RecentActivityRow';
import AppSidebar from '../../layouts/AppSidebar';
import type { TodayClass } from '../../types';

// icons for svg proper
const IconSections = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);
const IconStudents = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
  </svg>
);
const IconWeek = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const Dashboard: React.FC = () => {
  const {
    stats,
    todayClasses,
    recentActivity,
    weeklyRates,
    instructorName,
    loading,
    refresh,
  } = useDashboard();

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  });

  const handleTakeAttendance = (cls: TodayClass) => {
    // TODO: navigate to /attendance with pre-selected class context
    console.log('Take attendance for:', cls.id);
  };

  const handleRefresh = (e: CustomEvent) => {
    refresh();
    setTimeout(() => (e.target as HTMLIonRefresherElement).complete(), 600);
  };

  const classesDone = todayClasses.filter((c) => c.attendanceTaken).length;
  const classesTotal = todayClasses.length;

  return (
    <IonPage>
      {/* main layout */}
      <div className="flex h-full bg-slate-50">
        <AppSidebar />

        {/* panel */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">

          {/* header */}
          <IonHeader className="ion-no-border">
            <IonToolbar className="bg-amber-700 border-b border-slate-200 px-4 md:px-6" style={{ '--background': 'white' } as React.CSSProperties}>
              <div className="flex items-center justify-between py-3">
                {/* Left: greeting */}
                <div>
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest">{today}</p>
                  <h1 className="text-lg font-bold text-slate-900 leading-tight">
                    {loading ? 'Loading…' : `Good day, ${instructorName.split(' ')[1] ?? instructorName}!`}
                  </h1>
                </div>

                {/* Right: week chip + notification */}
                <div className="flex items-center gap-2">
                  {stats && (
                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full">
                      Week {stats.currentWeek}
                    </span>
                  )}
                  <button className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </button>
                </div>
              </div>
            </IonToolbar>
          </IonHeader>

          {/* scrollable */}
          <IonContent className="flex-1" style={{ '--background': '#f8fafc' } as React.CSSProperties}>
            <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
              <IonRefresherContent />
            </IonRefresher>

            <div className="px-4 md:px-6 py-5 space-y-6 max-w-5xl">

              {/* dito KPI */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <StatCard
                  label="Sections"
                  value={stats?.totalSections ?? '—'}
                  sub="active this term"
                  icon={IconSections}
                  accent="indigo"
                  loading={loading}
                />
                <StatCard
                  label="Students"
                  value={stats?.totalStudents ?? '—'}
                  sub="across all sections"
                  icon={IconStudents}
                  accent="sky"
                  loading={loading}
                />
                <StatCard
                  label="Academic Week"
                  value={stats ? `Wk ${stats.currentWeek}` : '—'}
                  sub="of 18 weeks"
                  icon={IconWeek}
                  accent="amber"
                  loading={loading}
                />
                <StatCard
                  label="Classes Today"
                  value={loading ? '—' : `${classesDone}/${classesTotal}`}
                  sub="attendance taken"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                  accent="emerald"
                  loading={loading}
                />
              </div>

              {/* Attendance rate and classes for tiday */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* scale */}
                <div className="md:col-span-1">
                  {loading ? (
                    <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-5 h-52 animate-pulse" />
                  ) : (
                    <AttendanceRateGauge
                      rate={stats?.attendanceRate ?? 0}
                      weeklyRates={weeklyRates}
                    />
                  )}
                </div>

                {/* Today's classes */}
                <div className="md:col-span-2 rounded-2xl bg-white ring-1 ring-slate-200 p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">Today's Classes</p>
                    {!loading && (
                      <span className="text-xs text-slate-400">{classesDone}/{classesTotal} done</span>
                    )}
                  </div>

                  {loading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-16 rounded-xl bg-slate-100 animate-pulse" />
                      ))}
                    </div>
                  ) : todayClasses.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-slate-400">
                      <svg className="w-10 h-10 mb-2 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm">No classes scheduled today</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {todayClasses.map((cls) => (
                        <TodayClassCard
                          key={cls.id}
                          cls={cls}
                          onTakeAttendance={handleTakeAttendance}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* recent attendance */}
              <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">Recent Attendance</p>
                  <button className="text-xs font-semibold text-indigo-600 hover:underline">View all</button>
                </div>

                {loading ? (
                  <div className="space-y-3 mt-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-12 rounded-xl bg-slate-100 animate-pulse" />
                    ))}
                  </div>
                ) : recentActivity.length === 0 ? (
                  <p className="text-sm text-slate-400 py-6 text-center">No attendance records yet.</p>
                ) : (
                  <div className="mt-1">
                    {recentActivity.map((item) => (
                      <RecentActivityRow key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom padding for tab bar spoace */}
              <div className="h-6" />
            </div>
          </IonContent>

          {/* Mobile bottom tab bar */}
          <MobileTabBar />
        </div>
      </div>
    </IonPage>
  );
};

//Mobile bottom navigation
const MobileTabBar: React.FC = () => {
  const tabs = [
    { label: 'Dashboard', path: '/dashboard', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    )},
    { label: 'Attendance', path: '/attendance', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
    { label: 'Records', path: '/records', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )},
    { label: 'Enroll', path: '/enroll', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    )},
  ];

  //  current path for active state
  const current = typeof window !== 'undefined' ? window.location.pathname : '/dashboard';

  return (
    <nav className="md:hidden shrink-0 bg-white border-t border-slate-100 pb-safe">
      <div className="flex">
        {tabs.map((tab) => {
          const isActive = current.startsWith(tab.path);
          return (
            <a
              key={tab.path}
              href={tab.path}
              className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors
                ${isActive ? 'text-indigo-600' : 'text-slate-400'}`}
            >
              {tab.icon}
              {tab.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default Dashboard;