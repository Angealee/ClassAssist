import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
} from '@ionic/react';
import { useIonRouter } from '@ionic/react';
import AppSidebar from '../../layouts/AppSidebar';
import FileDropZone from '../../components/enroll/FileDropZone';
import StudentPreviewTable from '../../components/enroll/StudentPreviewTable';
import { useEnrollment } from '../../hooks/useEnrollment';

// ─── Shared style tokens ──────────────────────────────────────────────────────
const card: React.CSSProperties = {
  background: 'white',
  borderRadius: 16,
  border: '1px solid #f0f0f5',
  padding: 20,
};

const label: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  color: '#64748b',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: 8,
  display: 'block',
};

const select: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  fontSize: 14,
  fontWeight: 500,
  color: '#0f172a',
  background: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: 10,
  outline: 'none',
  cursor: 'pointer',
  appearance: 'none',
};

const EnrollPage: React.FC = () => {
  const router = useIonRouter();

  const {
    subjects, sections,
    selectedSubject, setSelectedSubject,
    selectedSection, setSelectedSection,
    students, importErrors, fileName,
    loadingSubjects, loadingSections,
    importing, saving, saved,
    handleFileImport, handleSave, handleReset, removeStudent,
  } = useEnrollment();

  const canSave = selectedSubject && selectedSection && students.length > 0 && !saved;
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  // ─── Mobile bottom tab bar ──────────────────────────────────────────────────
  const tabs = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Attendance', path: '/attendance' },
    { label: 'Records', path: '/records' },
    { label: 'Enroll', path: '/enroll' },
  ];

  return (
    <IonPage>
      <div style={{ display: 'flex', height: '100%', background: '#f7f8fc' }}>
        <AppSidebar />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* ── Header ─────────────────────────────────────────────────── */}
          <IonHeader className="ion-no-border">
            <IonToolbar style={{ '--background': 'white', '--border-color': '#f0f0f5' } as React.CSSProperties}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px' }}>
                <div>
                  <p style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{today}</p>
                  <h1 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', margin: 0, lineHeight: 1.3 }}>Student Enrollment</h1>
                </div>
                {saved && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#ecfdf5', padding: '8px 16px', borderRadius: 10 }}>
                    <svg width="16" height="16" fill="none" stroke="#059669" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#059669' }}>Enrollment saved!</span>
                  </div>
                )}
              </div>
            </IonToolbar>
          </IonHeader>

          {/* ── Content ────────────────────────────────────────────────── */}
          <IonContent style={{ '--background': '#f7f8fc' } as React.CSSProperties}>
            <div style={{ padding: '20px 24px', maxWidth: 960, display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* ── Step 1: Select Subject & Section ───────────────────── */}
              <div style={card}>
                {/* Step label */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>1</span>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Select Subject & Section</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {/* Select Subject */}
                  <div>
                    <span style={label}>Subject</span>
                    <div style={{ position: 'relative' }}>
                      <select
                        style={select}
                        value={selectedSubject?.id ?? ''}
                        onChange={e => {
                          const subj = subjects.find(s => s.id === e.target.value) ?? null;
                          setSelectedSubject(subj);
                        }}
                        disabled={loadingSubjects}
                      >
                        <option value="">{loadingSubjects ? 'Loading…' : 'Choose a subject'}</option>
                        {subjects.map(s => (
                          <option key={s.id} value={s.id}>{s.code} — {s.name}</option>
                        ))}
                      </select>
                      <svg style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#94a3b8' }} width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                      </svg>
                    </div>
                  </div>

                  {/* Select Section */}
                  <div>
                    <span style={label}>Section</span>
                    <div style={{ position: 'relative' }}>
                      <select
                        style={{ ...select, opacity: !selectedSubject ? 0.5 : 1 }}
                        value={selectedSection?.id ?? ''}
                        onChange={e => {
                          const sec = sections.find(s => s.id === e.target.value) ?? null;
                          setSelectedSection(sec);
                        }}
                        disabled={!selectedSubject || loadingSections}
                      >
                        <option value="">{loadingSections ? 'Loading…' : !selectedSubject ? 'Select subject first' : 'Choose a section'}</option>
                        {sections.map(s => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                      </select>
                      <svg style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#94a3b8' }} width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Selected summary pill */}
                {selectedSubject && selectedSection && (
                  <div style={{ marginTop: 14, padding: '8px 14px', background: '#eef2ff', borderRadius: 10, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <svg width="14" height="14" fill="none" stroke="#4f46e5" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#4338ca' }}>
                      {selectedSubject.code} · {selectedSection.name}
                    </span>
                  </div>
                )}
              </div>

              {/* ── Step 2: Import File ─────────────────────────────────── */}
              <div style={card}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: students.length > 0 ? '#059669' : '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {students.length > 0
                        ? <svg width="13" height="13" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                        : <span style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>2</span>
                      }
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Import Student List</span>
                  </div>
                  {students.length > 0 && (
                    <button onClick={handleReset} style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px' }}>
                      Clear & re-import
                    </button>
                  )}
                </div>

                <FileDropZone
                  onFile={handleFileImport}
                  importing={importing}
                  fileName={fileName}
                />

                {/* Import errors */}
                {importErrors.length > 0 && (
                  <div style={{ marginTop: 12, padding: 14, background: '#fff1f2', borderRadius: 10, border: '1px solid #fecdd3' }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: '#e11d48', marginBottom: 6 }}>
                      ⚠ {importErrors.length} row{importErrors.length > 1 ? 's' : ''} skipped
                    </p>
                    {importErrors.map((err, i) => (
                      <p key={i} style={{ fontSize: 11, color: '#9f1239', marginTop: 2 }}>• {err.reason}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Step 3: Preview & Save ──────────────────────────────── */}
              {students.length > 0 && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>3</span>
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Review & Confirm</span>
                    </div>

                    {/* Save button */}
                    <button
                      onClick={handleSave}
                      disabled={!canSave || saving}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: '10px 24px', borderRadius: 10, border: 'none',
                        fontSize: 14, fontWeight: 600, cursor: canSave && !saving ? 'pointer' : 'not-allowed',
                        background: saved ? '#ecfdf5' : canSave ? '#4f46e5' : '#e2e8f0',
                        color: saved ? '#059669' : canSave ? 'white' : '#94a3b8',
                        transition: 'all 0.2s',
                      }}
                    >
                      {saving ? (
                        <>
                          <div style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                          Saving…
                        </>
                      ) : saved ? (
                        <>✓ Saved</>
                      ) : (
                        <>
                          <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
                          </svg>
                          Enroll {students.length} Students
                        </>
                      )}
                    </button>
                  </div>

                  {/* Warning if no target selected */}
                  {(!selectedSubject || !selectedSection) && (
                    <div style={{ marginBottom: 12, padding: '10px 14px', background: '#fffbeb', borderRadius: 10, border: '1px solid #fde68a', fontSize: 13, color: '#92400e' }}>
                      ⚠ Please select a subject and section before saving.
                    </div>
                  )}

                  <StudentPreviewTable students={students} onRemove={removeStudent} />
                </div>
              )}

              {/* Bottom spacer for mobile */}
              <div style={{ height: 24 }} />
            </div>
          </IonContent>

          {/* ── Mobile bottom tab bar ───────────────────────────────────── */}
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
    </IonPage>
  );
};

export default EnrollPage;