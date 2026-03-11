import React from 'react';
import type { RecentActivity } from '../../types';
import { formatDate } from '../../utils';

interface RecentActivityRowProps {
  item: RecentActivity;
}

const RecentActivityRow: React.FC<RecentActivityRowProps> = ({ item }) => {
  const rate = Math.round((item.present / item.total) * 100);
  const rateColor =
    rate >= 85 ? 'text-emerald-600 bg-emerald-50' :
    rate >= 70 ? 'text-amber-600 bg-amber-50' :
    'text-rose-600 bg-rose-50';

  return (
    <div className="flex items-center gap-3 py-3 border-b border-slate-100 last:border-0">
      {/* Subject badge */}
      <div className="shrink-0 w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
        <span className="text-[10px] font-bold text-indigo-600 text-center leading-tight">{item.subjectCode}</span>
      </div>

      {/* Section + date */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-700">{item.section}</p>
        <p className="text-xs text-slate-400">{formatDate(item.date)}</p>
      </div>

      {/* Attendance mini breakdown */}
      <div className="hidden sm:flex items-center gap-3 text-xs text-slate-500">
        <span className="text-emerald-600 font-medium">{item.present}P</span>
        <span className="text-rose-500 font-medium">{item.absent}A</span>
        <span className="text-amber-500 font-medium">{item.late}L</span>
      </div>

      {/* Rate badge */}
      <span className={`shrink-0 text-[11px] font-bold px-2 py-0.5 rounded-full ${rateColor}`}>
        {rate}%
      </span>
    </div>
  );
};

export default RecentActivityRow;