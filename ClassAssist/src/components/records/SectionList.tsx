import React from 'react';
import type { Section, GradeStore } from '../../pages/Records/records';

interface Props {
  sections: Section[];
  grades: GradeStore;
  onSelect: (section: Section) => void;
}

const ACCENTS = [
  { icon: 'bg-indigo-100', iconText: 'text-indigo-600', bar: 'bg-indigo-500', badge: 'bg-indigo-50 text-indigo-600' },
  { icon: 'bg-sky-100',    iconText: 'text-sky-600',    bar: 'bg-sky-500',    badge: 'bg-sky-50 text-sky-600' },
  { icon: 'bg-emerald-100',iconText: 'text-emerald-600',bar: 'bg-emerald-500',badge: 'bg-emerald-50 text-emerald-600' },
  { icon: 'bg-amber-100',  iconText: 'text-amber-600',  bar: 'bg-amber-400',  badge: 'bg-amber-50 text-amber-600' },
];

const SectionList: React.FC<Props> = ({ sections, grades, onSelect }) => {
  const totalStudents = sections.reduce((a, s) => a + s.students.length, 0);
  const totalGraded   = Object.keys(grades).length;
  const overallPct    = totalStudents > 0 ? Math.round((totalGraded / totalStudents) * 100) : 0;

  return (
    <div className="space-y-5">

      {/* Summary stat cards — same 2-col pattern as Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          iconBg="bg-indigo-100"
          icon={
            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          }
          value={sections.length}
          sub="active this term"
          label="SECTIONS"
        />
        <StatCard
          iconBg="bg-sky-100"
          icon={
            <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
            </svg>
          }
          value={totalStudents}
          sub="across all sections"
          label="STUDENTS"
        />
        <StatCard
          iconBg="bg-emerald-100"
          icon={
            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          value={totalGraded}
          sub="grades recorded"
          label="GRADED"
        />
        <StatCard
          iconBg="bg-amber-100"
          icon={
            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
          }
          value={`${overallPct}%`}
          sub="completion rate"
          label="PROGRESS"
        />
      </div>

      {/* Section list card */}
      <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">All Sections</p>
          <span className="text-xs text-slate-400">{sections.length} total</span>
        </div>

        <div className="space-y-2">
          {sections.map((section, idx) => {
            const accent      = ACCENTS[idx % ACCENTS.length];
            const gradedCount = section.students.filter(s => grades[`${section.id}_${s.id}`]).length;
            const pct         = section.students.length > 0
              ? Math.round((gradedCount / section.students.length) * 100) : 0;
            const allDone     = gradedCount === section.students.length && section.students.length > 0;

            return (
              <button
                key={section.id}
                onClick={() => onSelect(section)}
                className="w-full text-left rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100 active:scale-[0.99] transition-all p-4"
              >
                <div className="flex items-center gap-3">
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-xl ${accent.icon} flex items-center justify-center shrink-0`}>
                    <svg className={`w-5 h-5 ${accent.iconText}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-semibold text-slate-800 text-sm">{section.name}</p>
                      {allDone && (
                        <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                          Complete
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 truncate">{section.subject} · {section.schedule}</p>
                    {/* Progress bar */}
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${accent.bar}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                        {gradedCount}/{section.students.length} graded
                      </span>
                    </div>
                  </div>

                  {/* Chevron */}
                  <svg className="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ── Reusable stat card (same shape as Dashboard's StatCard) ───────────────────

interface StatCardProps {
  iconBg: string;
  icon: React.ReactNode;
  value: string | number;
  sub: string;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ iconBg, icon, value, sub, label }) => (
  <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-4 shadow-sm">
    <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center mb-3`}>
      {icon}
    </div>
    <p className="text-2xl font-bold text-slate-900">{value}</p>
    <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mt-2">{label}</p>
  </div>
);

export default SectionList;