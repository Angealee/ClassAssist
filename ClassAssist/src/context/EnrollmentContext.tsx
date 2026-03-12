import React, { createContext, useContext, useState } from 'react';
import type { EnrolledStudent, EnrollmentTarget } from '../types';

// ── Shape of one saved enrollment (a section + its students) ─────────────────

export interface EnrolledSection {
  target: EnrollmentTarget;   // subject + section meta
  students: EnrolledStudent[];
}

export interface GradeEntry {
  quiz: string;
  recitation: string;
  pt: string;
  exam: string;
}

// key = `${sectionId}_${studentId}`
export type GradeStore = Record<string, GradeEntry>;

// ── Context shape ─────────────────────────────────────────────────────────────

interface EnrollmentContextValue {
  enrolledSections: EnrolledSection[];
  addEnrolledSection: (section: EnrolledSection) => void;
  grades: GradeStore;
  saveGrade: (sectionId: string, studentId: string, entry: GradeEntry) => void;
  getGrade: (sectionId: string, studentId: string) => GradeEntry | undefined;
}

const EnrollmentContext = createContext<EnrollmentContextValue | null>(null);

// ── Provider — wrap your app (or IonApp) with this ────────────────────────────

export const EnrollmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [enrolledSections, setEnrolledSections] = useState<EnrolledSection[]>([]);
  const [grades, setGrades] = useState<GradeStore>({});

  const addEnrolledSection = (incoming: EnrolledSection) => {
    setEnrolledSections(prev => {
      // replace if same sectionId already exists, otherwise append
      const exists = prev.findIndex(s => s.target.sectionId === incoming.target.sectionId);
      if (exists >= 0) {
        const next = [...prev];
        next[exists] = incoming;
        return next;
      }
      return [...prev, incoming];
    });
  };

  const saveGrade = (sectionId: string, studentId: string, entry: GradeEntry) => {
    setGrades(prev => ({ ...prev, [`${sectionId}_${studentId}`]: entry }));
  };

  const getGrade = (sectionId: string, studentId: string): GradeEntry | undefined =>
    grades[`${sectionId}_${studentId}`];

  return (
    <EnrollmentContext.Provider value={{ enrolledSections, addEnrolledSection, grades, saveGrade, getGrade }}>
      {children}
    </EnrollmentContext.Provider>
  );
};

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useEnrollmentStore() {
  const ctx = useContext(EnrollmentContext);
  if (!ctx) throw new Error('useEnrollmentStore must be used inside <EnrollmentProvider>');
  return ctx;
}