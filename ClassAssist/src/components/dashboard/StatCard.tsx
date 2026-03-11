import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ReactNode;
  accent: 'indigo' | 'emerald' | 'amber' | 'sky';
  loading?: boolean;
}

const accentMap = {
  indigo: {
    bg: 'bg-indigo-500/10',
    icon: 'text-indigo-500',
    bar: 'bg-indigo-500',
    ring: 'ring-indigo-500/20',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    icon: 'text-emerald-500',
    bar: 'bg-emerald-500',
    ring: 'ring-emerald-500/20',
  },
  amber: {
    bg: 'bg-amber-500/10',
    icon: 'text-amber-500',
    bar: 'bg-amber-500',
    ring: 'ring-amber-500/20',
  },
  sky: {
    bg: 'bg-sky-500/10',
    icon: 'text-sky-500',
    bar: 'bg-sky-500',
    ring: 'ring-sky-500/20',
  },
};

const StatCard: React.FC<StatCardProps> = ({ label, value, sub, icon, accent, loading }) => {
  const a = accentMap[accent];

  if (loading) {
    return (
      <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-5 animate-pulse">
        <div className="h-10 w-10 rounded-xl bg-slate-100 mb-4" />
        <div className="h-7 w-16 bg-slate-100 rounded mb-2" />
        <div className="h-4 w-24 bg-slate-100 rounded" />
      </div>
    );
  }

  return (
    <div className={`rounded-2xl bg-white ring-1 ${a.ring} p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow`}>
      <div className={`w-10 h-10 rounded-xl ${a.bg} flex items-center justify-center ${a.icon}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-800 leading-none">{value}</p>
        {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
      </div>
      <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">{label}</p>
    </div>
  );
};

export default StatCard;