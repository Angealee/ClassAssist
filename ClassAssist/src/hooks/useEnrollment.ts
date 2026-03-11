import { useState, useEffect } from 'react';
import type { EnrolledStudent, EnrollmentTarget } from '../types';
import { fetchSubjects, fetchSectionsBySubject, saveEnrollment } from '../services/enrollmentService';
import { parseEnrollmentFile } from '../utils/enrollmentParser';

interface Subject { id: string; code: string; name: string; }
interface Section { id: string; name: string; subjectId: string; }

export function useEnrollment() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [students, setStudents] = useState<EnrolledStudent[]>([]);
  const [importErrors, setImportErrors] = useState<{ row: number; reason: string }[]>([]);
  const [loadingSubjects, setLoadingSubjects] = useState(true);
  const [loadingSections, setLoadingSections] = useState(false);
  const [importing, setImporting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [fileName, setFileName] = useState('');

  // Load subjects on mount
  useEffect(() => {
    fetchSubjects().then(data => {
      setSubjects(data);
      setLoadingSubjects(false);
    });
  }, []);

  // Load sections when subject changes
  useEffect(() => {
    if (!selectedSubject) { setSections([]); setSelectedSection(null); return; }
    setLoadingSections(true);
    setSelectedSection(null);
    fetchSectionsBySubject(selectedSubject.id).then(data => {
      setSections(data);
      setLoadingSections(false);
    });
  }, [selectedSubject]);

  const handleFileImport = async (file: File) => {
    setImporting(true);
    setStudents([]);
    setImportErrors([]);
    setSaved(false);
    setFileName(file.name);

    const result = await parseEnrollmentFile(file);
    setStudents(result.success);
    setImportErrors(result.errors);
    setImporting(false);
  };

  const handleSave = async () => {
    if (!selectedSubject || !selectedSection || students.length === 0) return;
    setSaving(true);
    const target: EnrollmentTarget = {
      subjectId: selectedSubject.id,
      subjectCode: selectedSubject.code,
      subjectName: selectedSubject.name,
      sectionId: selectedSection.id,
      sectionName: selectedSection.name,
    };
    await saveEnrollment(target, students);
    setSaving(false);
    setSaved(true);
  };

  const handleReset = () => {
    setStudents([]);
    setImportErrors([]);
    setFileName('');
    setSaved(false);
  };

  const removeStudent = (studentId: string) => {
    setStudents(prev => prev.filter(s => s.studentId !== studentId));
  };

  return {
    subjects, sections,
    selectedSubject, setSelectedSubject,
    selectedSection, setSelectedSection,
    students, importErrors, fileName,
    loadingSubjects, loadingSections, importing, saving, saved,
    handleFileImport, handleSave, handleReset, removeStudent,
  };
}