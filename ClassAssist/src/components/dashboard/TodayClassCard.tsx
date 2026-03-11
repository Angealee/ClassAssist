import React from 'react';
import type { TodayClass } from '../../types';

interface TodayClassCardProps {
  cls: TodayClass;
  onTakeAttendance?: (cls: TodayClass) => void;
}

const TodayClassCard: React.FC<TodayClassCardProps> = ({ cls, onTakeAttendance }) => {
  const isLab = cls.classType === 'Laboratory';

  return (
    <div className={`rounded-xl border p-4 flex items-center gap-4 transition-all
      ${cls.attendanceTaken
        ? 'bg-slate-50 border-slate-200 opacity-70'
        : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-sm'
      }`}>

      {/* Class type pill */}
      <div className={`shrink-0 w-12 h-12 rounded-xl flex flex-col items-center justify-center text-center
        ${isLab ? 'bg-violet-500/10 text-violet-600' : 'bg-indigo-500/10 text-indigo-600'}`}>
        <span className="text-[9px] font-bold uppercase leading-none">{isLab ? 'LAB' : 'LEC'}</span>
        <span className="text-[10px] font-semibold leading-none mt-0.5">{cls.subjectCode}</span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800 truncate">{cls.subjectName}</p>
        <p className="text-xs text-slate-500">{cls.section} · {cls.room}</p>
        <p className="text-xs text-slate-400 mt-0.5">{cls.schedule} · {cls.studentCount} students</p>
      </div>

      {/* Action */}
      {cls.attendanceTaken ? (
        <span className="shrink-0 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
          ✓ Done
        </span>
      ) : (
        <button
          onClick={() => onTakeAttendance?.(cls)}
          className="shrink-0 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors"
        >
          Take
        </button>
      )}
    </div>
  );
};

export default TodayClassCard;