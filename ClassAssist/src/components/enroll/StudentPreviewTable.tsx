import React, { useState } from 'react';
import type { EnrolledStudent } from '../../types';

interface StudentPreviewTableProps {
  students: EnrolledStudent[];
  onRemove: (studentId: string) => void;
}

const StudentPreviewTable: React.FC<StudentPreviewTableProps> = ({ students, onRemove }) => {
  const [search, setSearch] = useState('');

  const filtered = students.filter(s => {
    const q = search.toLowerCase();
    return (
      s.studentId.toLowerCase().includes(q) ||
      s.lastName.toLowerCase().includes(q) ||
      s.firstName.toLowerCase().includes(q)
    );
  });

  return (
    <div style={{ background: 'white', borderRadius: 16, border: '1px solid #f0f0f5', overflow: 'hidden' }}>

      {/* Table header bar */}
      <div style={{ padding: '14px 16px', borderBottom: '1px solid #f0f0f5', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>
            {students.length} Students
          </span>
          <span style={{ fontSize: 11, color: '#94a3b8', background: '#f1f5f9', padding: '2px 8px', borderRadius: 20 }}>
            Preview
          </span>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', flex: 1, maxWidth: 240 }}>
          <svg style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
            width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search student…"
            style={{
              width: '100%', paddingLeft: 32, paddingRight: 12, paddingTop: 7, paddingBottom: 7,
              fontSize: 13, border: '1px solid #e2e8f0', borderRadius: 8, outline: 'none',
              background: '#f8fafc', color: '#0f172a', boxSizing: 'border-box',
            }}
          />
        </div>
      </div>

      {/* Scrollable table */}
      <div style={{ overflowX: 'auto', maxHeight: 400, overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#f8fafc', position: 'sticky', top: 0, zIndex: 1 }}>
              {['#', 'Student ID', 'Last Name', 'First Name', 'Middle Name', ''].map((h, i) => (
                <th key={i} style={{
                  padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 600,
                  color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em',
                  borderBottom: '1px solid #f0f0f5', whiteSpace: 'nowrap',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, i) => (
              <tr key={s.studentId}
                style={{ borderBottom: '1px solid #f8fafc', transition: 'background 0.1s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#fafafa')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <td style={{ padding: '10px 14px', color: '#94a3b8', fontSize: 12 }}>{i + 1}</td>
                <td style={{ padding: '10px 14px', fontWeight: 600, color: '#4f46e5', fontFamily: 'monospace', fontSize: 12 }}>
                  {s.studentId}
                </td>
                <td style={{ padding: '10px 14px', fontWeight: 600, color: '#0f172a' }}>{s.lastName}</td>
                <td style={{ padding: '10px 14px', color: '#334155' }}>{s.firstName}</td>
                <td style={{ padding: '10px 14px', color: '#64748b' }}>{s.middleName || <span style={{ color: '#cbd5e1' }}>—</span>}</td>
                <td style={{ padding: '10px 14px' }}>
                  <button
                    onClick={() => onRemove(s.studentId)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#cbd5e1', padding: 4, borderRadius: 4, display: 'flex', alignItems: 'center' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#cbd5e1')}
                    title="Remove student"
                  >
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: '32px', textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>
                  No students match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentPreviewTable;