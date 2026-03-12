import React, { useState } from 'react';
import { IonModal, IonPage, IonHeader, IonToolbar, IonContent } from '@ionic/react';
import type { EnrolledSection, GradeEntry, GradeStore } from '../../context/EnrollmentContext';
import type { EnrolledStudent } from '../../types';

// ── Helpers ───────────────────────────────────────────────────────────────────

const toNum = (v: string) => {
  const n = parseFloat(v);
  return isNaN(n) ? 0 : Math.min(100, Math.max(0, n));
};

const computeFinal = (g: GradeEntry) =>
  (toNum(g.quiz) + toNum(g.recitation) + toNum(g.pt) + toNum(g.exam)) / 4;

const gradeEquivalent = (score: number) => {
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

const scoreColor = (score: number) => {
  if (score >= 88) return '#059669';
  if (score >= 75) return '#0284c7';
  return '#e11d48';
};

const AVATAR_COLORS = [
  { bg: '#eef2ff', text: '#4f46e5' },
  { bg: '#e0f2fe', text: '#0284c7' },
  { bg: '#d1fae5', text: '#059669' },
  { bg: '#fef3c7', text: '#d97706' },
  { bg: '#fce7f3', text: '#db2777' },
  { bg: '#ede9fe', text: '#7c3aed' },
];

const avatarColor = (id: string) => AVATAR_COLORS[parseInt(id.slice(-1)) % AVATAR_COLORS.length];

// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  section: EnrolledSection | null;
  grades: GradeStore;
  getGrade: (sectionId: string, studentId: string) => GradeEntry | undefined;
  onSelectStudent: (student: EnrolledStudent) => void;
  onClose: () => void;
}

const StudentGradeList: React.FC<Props> = ({
  section, grades, getGrade, onSelectStudent, onClose,
}) => {
  const [search, setSearch] = useState('');

  if (!section) return null;

  const { target, students } = section;
  const gradedCount = students.filter(s => getGrade(target.sectionId, s.studentId)).length;
  const pct = students.length > 0 ? Math.round((gradedCount / students.length) * 100) : 0;

  const filtered = students.filter(s =>
    `${s.lastName} ${s.firstName} ${s.studentId}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <IonModal isOpen={!!section} onDidDismiss={onClose}>
      <IonPage>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#f7f8fc' }}>

          {/* Header */}
          <IonHeader className="ion-no-border">
            <IonToolbar style={{ '--background': 'white', '--border-color': '#f0f0f5' } as React.CSSProperties}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px' }}>
                <button
                  onClick={onClose}
                  style={{ width: 32, height: 32, borderRadius: '50%', background: '#f1f5f9', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                >
                  <svg width="16" height="16" fill="none" stroke="#64748b" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: 0, lineHeight: 1.2 }}>
                    {target.sectionName}
                  </h2>
                  <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>
                    {target.subjectCode} — {target.subjectName}
                  </p>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#0284c7', background: '#e0f2fe', padding: '5px 12px', borderRadius: 20, flexShrink: 0 }}>
                  {gradedCount}/{students.length} graded
                </span>
              </div>
            </IonToolbar>
          </IonHeader>

          <IonContent style={{ '--background': '#f7f8fc' } as React.CSSProperties}>
            <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>

              {/* Progress bar card */}
              <div style={{ background: 'white', borderRadius: 14, border: '1px solid #f0f0f5', padding: '14px 18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
                    Grading Progress
                  </p>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{pct}%</span>
                </div>
                <div style={{ height: 8, background: '#f1f5f9', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: '#4f46e5', borderRadius: 99, transition: 'width 0.4s ease' }} />
                </div>
                <div style={{ display: 'flex', gap: 16, marginTop: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4f46e5', display: 'inline-block' }} />
                    <span style={{ fontSize: 11, color: '#64748b' }}>{gradedCount} graded</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#e2e8f0', display: 'inline-block' }} />
                    <span style={{ fontSize: 11, color: '#64748b' }}>{students.length - gradedCount} pending</span>
                  </div>
                </div>
              </div>

              {/* Search */}
              <div style={{ position: 'relative' }}>
                <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="16" height="16" fill="none" stroke="#94a3b8" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search name or student ID…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px 10px 36px', fontSize: 13, background: 'white', border: '1px solid #e2e8f0', borderRadius: 10, outline: 'none', boxSizing: 'border-box', color: '#0f172a' }}
                />
              </div>

              {/* Student list card */}
              <div style={{ background: 'white', borderRadius: 14, border: '1px solid #f0f0f5', overflow: 'hidden' }}>
                <div style={{ padding: '12px 18px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>Students</p>
                  <span style={{ fontSize: 11, color: '#94a3b8' }}>Tap to enter grade</span>
                </div>

                {filtered.map((student, idx) => {
                  const g     = getGrade(target.sectionId, student.studentId);
                  const final = g ? computeFinal(g) : null;
                  const color = avatarColor(student.studentId);
                  const initials = ((student.firstName?.[0] ?? '') + (student.lastName?.[0] ?? '')).toUpperCase();
                  const isLast = idx === filtered.length - 1;

                  return (
                    <button
                      key={student.studentId}
                      onClick={() => onSelectStudent(student)}
                      style={{
                        width: '100%', textAlign: 'left',
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: '12px 18px',
                        borderTop: '1px solid #f8fafc',
                        borderBottom: isLast ? 'none' : undefined,
                        background: 'none', border: 'none', cursor: 'pointer',
                        borderLeft: 'none', borderRight: 'none',
                        borderTopColor: '#f8fafc',
                        transition: 'background 0.1s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#fafafa')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                    >
                      {/* Avatar */}
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: color.bg, color: color.text, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                        {initials}
                      </div>

                      {/* Name */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {student.lastName}, {student.firstName}
                        </p>
                        <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>{student.studentId}</p>
                      </div>

                      {/* Grade */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                        {g && final !== null ? (
                          <div style={{ textAlign: 'right' }}>
                            <p style={{ fontSize: 14, fontWeight: 700, color: scoreColor(final), margin: 0 }}>
                              {final.toFixed(1)}
                            </p>
                            <p style={{ fontSize: 10, color: '#94a3b8', margin: 0 }}>GE {gradeEquivalent(final)}</p>
                          </div>
                        ) : (
                          <span style={{ fontSize: 11, fontWeight: 500, color: '#94a3b8', background: '#f1f5f9', padding: '4px 10px', borderRadius: 20 }}>
                            Pending
                          </span>
                        )}
                        <svg width="14" height="14" fill="none" stroke="#cbd5e1" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  );
                })}

                {filtered.length === 0 && (
                  <div style={{ padding: '40px 20px', textAlign: 'center', color: '#94a3b8' }}>
                    <p style={{ fontSize: 13, margin: 0 }}>No students found</p>
                  </div>
                )}
              </div>

              <div style={{ height: 24 }} />
            </div>
          </IonContent>
        </div>
      </IonPage>
    </IonModal>
  );
};

export default StudentGradeList;