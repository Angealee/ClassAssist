/**
 * enrollmentService.ts
 * Replace function bodies with real API calls when backend is ready.
 */

import type { EnrolledStudent, EnrollmentTarget } from '../types';

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms));

// ─── Mock subjects + sections for the dropdown selectors ─────────────────────
export const mockSubjects = [
  { id: 'subj-001', code: 'IT-13', name: 'Introduction to Computing' },
  { id: 'subj-002', code: 'IT-TABALU', name: 'Data Structures' },
  { id: 'subj-003', code: 'IT-25', name: 'Multimedia Systems' },
  { id: 'subj-004', code: 'ELECTIVE 1', name: 'Event-Driven Programming' },
];

export const mockSections = [
  { id: 'sec-001', name: 'BSIT-1A', subjectId: 'subj-001' },
  { id: 'sec-002', name: 'BSIT-1B', subjectId: 'subj-001' },
  { id: 'sec-003', name: 'BSIT-2A', subjectId: 'subj-002' },
  { id: 'sec-004', name: 'BSIT-2B', subjectId: 'subj-002' },
  { id: 'sec-005', name: 'BSIT-3A', subjectId: 'subj-003' },
  { id: 'sec-006', name: 'BSIT-4A', subjectId: 'subj-004' },
];

// ─── GET /api/subjects ────────────────────────────────────────────────────────
export async function fetchSubjects() {
  await delay();
  return mockSubjects;
}

// ─── GET /api/sections?subjectId=xxx ─────────────────────────────────────────
export async function fetchSectionsBySubject(subjectId: string) {
  await delay(200);
  return mockSections.filter(s => s.subjectId === subjectId);
}

// ─── POST /api/enrollment ─────────────────────────────────────────────────────
export async function saveEnrollment(
  target: EnrollmentTarget,
  students: EnrolledStudent[]
): Promise<{ saved: number }> {
  await delay(600);
  // TODO: POST to /api/enrollment with { target, students }
  console.log('[mock] Saving enrollment:', target, students.length, 'students');
  return { saved: students.length };
}