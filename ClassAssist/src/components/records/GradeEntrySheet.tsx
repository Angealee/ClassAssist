import React, { useState, useEffect } from 'react';
import { IonModal, IonPage, IonHeader, IonToolbar, IonContent, IonToast } from '@ionic/react';
import type { EnrolledSection, GradeEntry } from '../../context/EnrollmentContext';
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

const barColor = (score: number) => {
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

const EMPTY: GradeEntry = { quiz: '', recitation: '', pt: '', exam: '' };

const COMPONENTS: {
  key: keyof GradeEntry;
  label: string;
  emoji: string;
  bg: string;
  bar: string;
  ring: string;
}[] = [
  { key: 'quiz',       label: 'Quiz',             emoji: '📝', bg: '#eef2ff', bar: '#4f46e5', ring: '#c7d2fe' },
  { key: 'recitation', label: 'Recitation',       emoji: '🗣️',  bg: '#e0f2fe', bar: '#0284c7', ring: '#bae6fd' },
  { key: 'pt',         label: 'Performance Task', emoji: '🔬', bg: '#d1fae5', bar: '#059669', ring: '#a7f3d0' },
  { key: 'exam',       label: 'Exam',             emoji: '📄', bg: '#fef3c7', bar: '#f59e0b', ring: '#fde68a' },
];

// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  section: EnrolledSection | null;
  student: EnrolledStudent | null;
  existing?: GradeEntry;
  onSave: (entry: GradeEntry) => void;
  onClose: () => void;
}

const GradeEntrySheet: React.FC<Props> = ({
  section, student, existing, onSave, onClose,
}) => {
  const [draft, setDraft]         = useState<GradeEntry>(EMPTY);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setDraft(existing ?? EMPTY);
  }, [student, existing]);

  if (!student || !section) return null;

  const allFilled  = COMPONENTS.every(c => draft[c.key] !== '');
  const finalScore = computeFinal(draft);
  const color      = avatarColor(student.studentId);
  const initials   = ((student.firstName?.[0] ?? '') + (student.lastName?.[0] ?? '')).toUpperCase();

  const handleSave = () => {
    if (!allFilled) return;
    onSave(draft);
    setShowToast(true);
  };

  return (
    <>
      <IonModal isOpen={!!student} onDidDismiss={onClose}>
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
                    <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: 0 }}>Grade Entry</h2>
                    <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>
                      {section.target.sectionName} · {section.target.subjectCode}
                    </p>
                  </div>
                  <button
                    onClick={handleSave}
                    disabled={!allFilled}
                    style={{
                      fontSize: 13, fontWeight: 600, padding: '7px 18px', borderRadius: 20, border: 'none', cursor: allFilled ? 'pointer' : 'not-allowed',
                      background: allFilled ? '#4f46e5' : '#e2e8f0',
                      color: allFilled ? 'white' : '#94a3b8',
                      transition: 'all 0.15s',
                    }}
                  >
                    Save
                  </button>
                </div>
              </IonToolbar>
            </IonHeader>

            <IonContent style={{ '--background': '#f7f8fc' } as React.CSSProperties}>
              <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>

                {/* Student card */}
                <div style={{ background: 'white', borderRadius: 14, border: '1px solid #f0f0f5', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 46, height: 46, borderRadius: '50%', background: color.bg, color: color.text, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, flexShrink: 0 }}>
                    {initials}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {student.firstName}{student.middleName ? ` ${student.middleName}` : ''} {student.lastName}
                    </p>
                    <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>{student.studentId}</p>
                  </div>
                  {existing && (
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#d97706', background: '#fef3c7', padding: '4px 10px', borderRadius: 20, flexShrink: 0 }}>
                      Editing
                    </span>
                  )}
                </div>

                {/* Grade inputs */}
                <div style={{ background: 'white', borderRadius: 14, border: '1px solid #f0f0f5', overflow: 'hidden' }}>
                  <div style={{ padding: '12px 18px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f8fafc' }}>
                    <p style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
                      Grade Components
                    </p>
                    <span style={{ fontSize: 11, color: '#94a3b8' }}>Each 25%</span>
                  </div>

                  {COMPONENTS.map(({ key, label, emoji, bg, bar, ring }) => {
                    const val = toNum(draft[key]);
                    return (
                      <div key={key} style={{ padding: '14px 18px', borderBottom: '1px solid #f8fafc' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                          <div style={{ width: 32, height: 32, borderRadius: 8, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <span style={{ fontSize: 15 }}>{emoji}</span>
                          </div>
                          <p style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', flex: 1, margin: 0 }}>{label}</p>
                          {draft[key] !== '' && (
                            <span style={{ fontSize: 13, fontWeight: 700, color: val >= 75 ? '#059669' : '#e11d48' }}>
                              {val}
                            </span>
                          )}
                        </div>
                        <input
                          type="number"
                          inputMode="decimal"
                          min={0}
                          max={100}
                          placeholder="0 – 100"
                          value={draft[key]}
                          onChange={e => setDraft(prev => ({ ...prev, [key]: e.target.value }))}
                          style={{
                            width: '100%', padding: '10px 14px', fontSize: 14, color: '#0f172a',
                            background: '#f8fafc', border: `1px solid #e2e8f0`,
                            borderRadius: 10, outline: 'none', boxSizing: 'border-box',
                            transition: 'border-color 0.15s',
                          }}
                          onFocus={e => (e.target.style.borderColor = ring)}
                          onBlur={e => (e.target.style.borderColor = '#e2e8f0')}
                        />
                        {draft[key] !== '' && (
                          <div style={{ marginTop: 8, height: 4, background: '#f1f5f9', borderRadius: 99, overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${val}%`, background: bar, borderRadius: 99, transition: 'width 0.3s ease' }} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Final grade preview */}
                <div style={{ background: 'white', borderRadius: 14, border: '1px solid #f0f0f5', overflow: 'hidden' }}>
                  <div style={{ padding: '12px 18px 8px', borderBottom: '1px solid #f8fafc' }}>
                    <p style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
                      Final Grade Preview
                    </p>
                  </div>
                  <div style={{ padding: '16px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, marginBottom: 14 }}>
                      <p style={{ fontSize: 52, fontWeight: 800, color: scoreColor(finalScore), margin: 0, lineHeight: 1 }}>
                        {finalScore.toFixed(1)}
                      </p>
                      <div style={{ marginBottom: 4 }}>
                        <p style={{ fontSize: 11, color: '#94a3b8', margin: '0 0 2px' }}>Grade Equivalent</p>
                        <p style={{ fontSize: 24, fontWeight: 700, color: scoreColor(finalScore), margin: 0 }}>
                          {gradeEquivalent(finalScore)}
                        </p>
                      </div>
                    </div>
                    <div style={{ height: 8, background: '#f1f5f9', borderRadius: 99, overflow: 'hidden', marginBottom: 14 }}>
                      <div style={{ height: '100%', width: `${finalScore}%`, background: barColor(finalScore), borderRadius: 99, transition: 'width 0.5s ease' }} />
                    </div>
                    {/* Breakdown */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                      {COMPONENTS.map(({ key, label, bg }) => (
                        <div key={key} style={{ textAlign: 'center' }}>
                          <div style={{ width: 36, height: 36, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px' }}>
                            <p style={{ fontSize: 11, fontWeight: 700, color: '#0f172a', margin: 0 }}>
                              {draft[key] !== '' ? toNum(draft[key]) : '—'}
                            </p>
                          </div>
                          <p style={{ fontSize: 9, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, margin: 0 }}>
                            {label.split(' ')[0]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Save button */}
                <button
                  onClick={handleSave}
                  disabled={!allFilled}
                  style={{
                    width: '100%', padding: '14px', borderRadius: 12, border: 'none',
                    fontSize: 14, fontWeight: 600, cursor: allFilled ? 'pointer' : 'not-allowed',
                    background: allFilled ? '#4f46e5' : '#e2e8f0',
                    color: allFilled ? 'white' : '#94a3b8',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    transition: 'all 0.15s',
                  }}
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {allFilled ? 'Save Grade' : 'Fill all components to save'}
                </button>

                <div style={{ height: 24 }} />
              </div>
            </IonContent>
          </div>
        </IonPage>
      </IonModal>

      <IonToast
        isOpen={showToast}
        message={`Grade saved for ${student.firstName} ${student.lastName}`}
        duration={2000}
        onDidDismiss={() => { setShowToast(false); onClose(); }}
        color="success"
        position="top"
      />
    </>
  );
};

export default GradeEntrySheet;