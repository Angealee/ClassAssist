import React, { useRef, useState } from 'react';

interface FileDropZoneProps {
  onFile: (file: File) => void;
  importing: boolean;
  fileName: string;
}

const FileDropZone: React.FC<FileDropZoneProps> = ({ onFile, importing, fileName }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFile(file);
  };

  return (
    <div
      onClick={() => !importing && inputRef.current?.click()}
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      style={{
        border: `2px dashed ${dragging ? '#4f46e5' : '#e2e8f0'}`,
        borderRadius: 16,
        padding: '40px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        cursor: importing ? 'not-allowed' : 'pointer',
        background: dragging ? '#eef2ff' : '#fafafa',
        transition: 'all 0.2s',
        textAlign: 'center',
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".csv,.xlsx,.xls"
        style={{ display: 'none' }}
        onChange={handleChange}
      />

      {importing ? (
        <>
          <div style={{ width: 40, height: 40, border: '3px solid #e2e8f0', borderTopColor: '#4f46e5', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <p style={{ fontSize: 14, color: '#64748b', fontWeight: 500 }}>Parsing file…</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </>
      ) : fileName ? (
        <>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="22" height="22" fill="none" stroke="#059669" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <p style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{fileName}</p>
          <p style={{ fontSize: 12, color: '#94a3b8' }}>Click to replace file</p>
        </>
      ) : (
        <>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="22" height="22" fill="none" stroke="#4f46e5" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
            </svg>
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', marginBottom: 4 }}>
              Drop your file here, or <span style={{ color: '#4f46e5' }}>browse</span>
            </p>
            <p style={{ fontSize: 12, color: '#94a3b8' }}>Supports .xlsx and .csv</p>
          </div>
          <div style={{ marginTop: 4, padding: '6px 14px', background: '#f1f5f9', borderRadius: 20 }}>
            <p style={{ fontSize: 11, color: '#64748b', fontFamily: 'monospace' }}>
              Student ID · Last Name · First Name · Middle Name
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default FileDropZone;