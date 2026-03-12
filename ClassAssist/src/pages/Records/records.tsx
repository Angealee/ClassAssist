import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonContent } from '@ionic/react';
import { useIonRouter } from '@ionic/react';
import AppSidebar from '../../layouts/AppSidebar';
import StudentGradeList from '../../components/records/StudentGradeList';
import GradeEntrySheet from '../../components/records/GradeEntrySheet';
import { useEnrollmentStore } from '../../context/EnrollmentContext';
import type { GradeEntry, EnrolledSection } from '../../context/EnrollmentContext';
import type { EnrolledStudent } from '../../types';

const Records: React.FC = () => {
  const router = useIonRouter();
  const { enrolledSections, grades, saveGrade, getGrade } = useEnrollmentStore();

  const [activeSection, setActiveSection] = useState<EnrolledSection | null>(null);
  const [activeStudent, setActiveStudent] = useState<EnrolledStudent | null>(null);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  }).toUpperCase();

  const tabs = [
    { label: 'Dashboard',  path: '/dashboard' },
    { label: 'Attendance', path: '/attendance' },
    { label: 'Records',    path: '/records' },
    { label: 'Enroll',     path: '/enroll' },
  ];

  return (
    <IonPage>
      <div style={{ display: 'flex', height: '100%', background: '#f7f8fc' }}>
        <AppSidebar />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* Header */}
          <IonHeader className="ion-no-border">
            <IonToolbar style={{ '--background': 'white', '--border-color': '#f0f0f5' } as React.CSSProperties}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px' }}>
                <div>
                  <p style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
                    {today}
                  </p>
                  <h1 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', margin: 0, lineHeight: 1.3 }}>
                    Grade Records
                  </h1>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#4f46e5', background: '#eef2ff', padding: '6px 14px', borderRadius: 20 }}>
                  {enrolledSections.length} {enrolledSections.length === 1 ? 'Section' : 'Sections'}
                </span>
              </div>
            </IonToolbar>
          </IonHeader>

          {/* Content */}
          <IonContent style={{ '--background': '#f7f8fc' } as React.CSSProperties}>
            <div style={{ padding: '20px 24px', maxWidth: 960, display: 'flex', flexDirection: 'column', gap: 12 }}>

              {enrolledSections.length === 0 ? (
                <EmptyState />
              ) : (
                <>
                  <p style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
                    All Sections
                  </p>
                  {enrolledSections.map((sec, idx) => (
                    <SectionCard
                      key={sec.target.sectionId}
                      section={sec}
                      grades={grades}
                      accent={ACCENTS[idx % ACCENTS.length]}
                      onClick={() => setActiveSection(sec)}
                    />
                  ))}
                </>
              )}

              <div style={{ height: 24 }} />
            </div>
          </IonContent>

          {/* Mobile tab bar — same style as EnrollPage */}
          <nav style={{ display: 'flex', background: 'white', borderTop: '1px solid #f0f0f5' }} className="md:hidden">
            {tabs.map(tab => {
              const isActive = router.routeInfo.pathname.startsWith(tab.path);
              return (
                <a key={tab.path} href={tab.path} style={{
                  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                  padding: '10px 0', fontSize: 10, fontWeight: 500, textDecoration: 'none',
                  color: isActive ? '#4f46e5' : '#94a3b8',
                }}>
                  {tab.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Student list modal */}
      <StudentGradeList
        section={activeSection}
        grades={grades}
        getGrade={getGrade}
        onSelectStudent={setActiveStudent}
        onClose={() => setActiveSection(null)}
      />

      {/* Grade entry modal */}
      <GradeEntrySheet
        section={activeSection}
        student={activeStudent}
        existing={
          activeStudent && activeSection
            ? getGrade(activeSection.target.sectionId, activeStudent.studentId)
            : undefined
        }
        onSave={(entry: GradeEntry) => {
          if (!activeSection || !activeStudent) return;
          saveGrade(activeSection.target.sectionId, activeStudent.studentId, entry);
          setActiveStudent(null);
        }}
        onClose={() => setActiveStudent(null)}
      />
    </IonPage>
  );
};

// ── Section card ──────────────────────────────────────────────────────────────

const ACCENTS = [
  { icon: '#eef2ff', iconText: '#4f46e5', bar: '#4f46e5', badge: '#eef2ff', badgeText: '#4338ca' },
  { icon: '#e0f2fe', iconText: '#0284c7', bar: '#0284c7', badge: '#e0f2fe', badgeText: '#0369a1' },
  { icon: '#d1fae5', iconText: '#059669', bar: '#059669', badge: '#d1fae5', badgeText: '#047857' },
  { icon: '#fef3c7', iconText: '#d97706', bar: '#f59e0b', badge: '#fef3c7', badgeText: '#b45309' },
];

interface Accent { icon: string; iconText: string; bar: string; badge: string; badgeText: string; }

interface SectionCardProps {
  section: EnrolledSection;
  grades: Record<string, GradeEntry>;
  accent: Accent;
  onClick: () => void;
}

const SectionCard: React.FC<SectionCardProps> = ({ section, grades, accent, onClick }) => {
  const total   = section.students.length;
  const graded  = section.students.filter(s => grades[`${section.target.sectionId}_${s.studentId}`]).length;
  const pct     = total > 0 ? Math.round((graded / total) * 100) : 0;
  const allDone = graded === total && total > 0;

  return (
    <button
      onClick={onClick}
      style={{
        width: '100%', textAlign: 'left',
        background: 'white', border: '1px solid #f0f0f5',
        borderRadius: 16, padding: '16px 20px',
        cursor: 'pointer', transition: 'box-shadow 0.15s',
        display: 'flex', alignItems: 'center', gap: 14,
      }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)')}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
    >
      {/* Icon */}
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: accent.icon, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="20" height="20" fill="none" stroke={accent.iconText} strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', margin: 0 }}>
            {section.target.sectionName}
          </p>
          {allDone && (
            <span style={{ fontSize: 10, fontWeight: 700, color: '#059669', background: '#d1fae5', padding: '2px 8px', borderRadius: 20 }}>
              Complete
            </span>
          )}
        </div>
        <p style={{ fontSize: 12, color: '#94a3b8', margin: '0 0 8px' }}>
          {section.target.subjectCode} — {section.target.subjectName}
        </p>

        {/* Progress bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ flex: 1, height: 6, background: '#f1f5f9', borderRadius: 99, overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 99,
              background: accent.bar,
              width: `${pct}%`,
              transition: 'width 0.4s ease',
            }} />
          </div>
          <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500, whiteSpace: 'nowrap' }}>
            {graded}/{total} graded
          </span>
        </div>
      </div>

      {/* Student count badge + chevron */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: accent.badgeText, background: accent.badge, padding: '4px 10px', borderRadius: 20 }}>
          {total} students
        </span>
        <svg width="16" height="16" fill="none" stroke="#cbd5e1" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
};

// ── Empty state ───────────────────────────────────────────────────────────────

const EmptyState: React.FC = () => (
  <div style={{ textAlign: 'center', padding: '60px 24px' }}>
    <div style={{ width: 64, height: 64, borderRadius: 20, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
      <svg width="28" height="28" fill="none" stroke="#4f46e5" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    </div>
    <p style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', margin: '0 0 6px' }}>No sections enrolled yet</p>
    <p style={{ fontSize: 13, color: '#94a3b8', margin: '0 0 20px' }}>Go to Enroll to import students and they'll appear here.</p>
    <a href="/enroll" style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      fontSize: 13, fontWeight: 600, color: '#4f46e5',
      background: '#eef2ff', padding: '10px 20px', borderRadius: 10,
      textDecoration: 'none',
    }}>
      Go to Enroll →
    </a>
  </div>
);

export default Records;