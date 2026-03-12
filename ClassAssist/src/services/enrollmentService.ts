import type { EnrolledStudent, EnrollmentTarget } from '../types';

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms));

// Mock subjects + sections for the dropdown selectors
export const mockSubjects = [
  { id: 'subj-001', code: 'IT-13', name: 'Introduction to Computing' },
  { id: 'subj-002', code: 'IT-TABALU', name: 'Data Structures' },
  { id: 'subj-003', code: 'IT-25', name: 'Multimedia Systems' },
  { id: 'subj-004', code: 'ELECTIVE 1', name: 'Event-Driven Programming' },
];

//MOCKSECTIONS hahahah wag niyo ko i judge -koby
export const mockSections = [
  //1st year
  { id: 'sec-001', name: 'BSIT-1A', subjectId: 'subj-001' },
  { id: 'sec-001', name: 'BSIT-1A', subjectId: 'subj-002' },
  { id: 'sec-001', name: 'BSIT-1A', subjectId: 'subj-003' },
  { id: 'sec-001', name: 'BSIT-1A', subjectId: 'subj-004' },
  { id: 'sec-002', name: 'BSIT-1B', subjectId: 'subj-001' },
  { id: 'sec-002', name: 'BSIT-1B', subjectId: 'subj-002' },
  { id: 'sec-002', name: 'BSIT-1B', subjectId: 'subj-003' },
  { id: 'sec-002', name: 'BSIT-1B', subjectId: 'subj-004' },
  { id: 'sec-003', name: 'BSIT-1C', subjectId: 'subj-001' },
  { id: 'sec-003', name: 'BSIT-1C', subjectId: 'subj-002' },
  { id: 'sec-003', name: 'BSIT-1C', subjectId: 'subj-003' },
  { id: 'sec-003', name: 'BSIT-1C', subjectId: 'subj-004' },
  { id: 'sec-004', name: 'BSIT-1D', subjectId: 'subj-001' },
  { id: 'sec-004', name: 'BSIT-1D', subjectId: 'subj-002' },
  { id: 'sec-004', name: 'BSIT-1D', subjectId: 'subj-003' },
  { id: 'sec-004', name: 'BSIT-1D', subjectId: 'subj-004' },
  { id: 'sec-005', name: 'BSIT-1E', subjectId: 'subj-001' },
  { id: 'sec-005', name: 'BSIT-1E', subjectId: 'subj-002' },
  { id: 'sec-005', name: 'BSIT-1E', subjectId: 'subj-003' },
  { id: 'sec-005', name: 'BSIT-1E', subjectId: 'subj-004' },
  { id: 'sec-006', name: 'BSIT-1F', subjectId: 'subj-001' },
  { id: 'sec-006', name: 'BSIT-1F', subjectId: 'subj-002' },
  { id: 'sec-006', name: 'BSIT-1F', subjectId: 'subj-003' },
  { id: 'sec-006', name: 'BSIT-1F', subjectId: 'subj-004' },

  //2nd year
  { id: 'sec-007', name: 'BSIT-2A', subjectId: 'subj-001' },
  { id: 'sec-007', name: 'BSIT-2A', subjectId: 'subj-002' },
  { id: 'sec-007', name: 'BSIT-2A', subjectId: 'subj-003' },
  { id: 'sec-007', name: 'BSIT-2A', subjectId: 'subj-004' },
  { id: 'sec-008', name: 'BSIT-2B', subjectId: 'subj-001' },
  { id: 'sec-008', name: 'BSIT-2B', subjectId: 'subj-002' },
  { id: 'sec-008', name: 'BSIT-2B', subjectId: 'subj-003' },
  { id: 'sec-008', name: 'BSIT-2B', subjectId: 'subj-004' },
  { id: 'sec-009', name: 'BSIT-2C', subjectId: 'subj-001' },
  { id: 'sec-009', name: 'BSIT-2C', subjectId: 'subj-002' },
  { id: 'sec-009', name: 'BSIT-2C', subjectId: 'subj-003' },
  { id: 'sec-009', name: 'BSIT-2C', subjectId: 'subj-004' },
  { id: 'sec-010', name: 'BSIT-2C', subjectId: 'subj-001' },
  { id: 'sec-010', name: 'BSIT-2C', subjectId: 'subj-002' },
  { id: 'sec-010', name: 'BSIT-2C', subjectId: 'subj-003' },
  { id: 'sec-010', name: 'BSIT-2C', subjectId: 'subj-004' },
  { id: 'sec-011', name: 'BSIT-2D', subjectId: 'subj-001' },
  { id: 'sec-011', name: 'BSIT-2D', subjectId: 'subj-002' },
  { id: 'sec-011', name: 'BSIT-2D', subjectId: 'subj-003' },
  { id: 'sec-011', name: 'BSIT-2D', subjectId: 'subj-004' },

  //3rd year
  { id: 'sec-012', name: 'BSIT-3A', subjectId: 'subj-001' },
  { id: 'sec-012', name: 'BSIT-3A', subjectId: 'subj-002' },
  { id: 'sec-012', name: 'BSIT-3A', subjectId: 'subj-003' },
  { id: 'sec-012', name: 'BSIT-3A', subjectId: 'subj-004' },
  { id: 'sec-013', name: 'BSIT-3B', subjectId: 'subj-001' },
  { id: 'sec-013', name: 'BSIT-3B', subjectId: 'subj-002' },
  { id: 'sec-013', name: 'BSIT-3B', subjectId: 'subj-003' },
  { id: 'sec-013', name: 'BSIT-3B', subjectId: 'subj-004' },
  { id: 'sec-014', name: 'BSIT-3C', subjectId: 'subj-001' },
  { id: 'sec-014', name: 'BSIT-3C', subjectId: 'subj-002' },
  { id: 'sec-014', name: 'BSIT-3C', subjectId: 'subj-003' },
  { id: 'sec-014', name: 'BSIT-3C', subjectId: 'subj-004' },
  { id: 'sec-015', name: 'BSIT-3D', subjectId: 'subj-001' },
  { id: 'sec-015', name: 'BSIT-3D', subjectId: 'subj-002' },
  { id: 'sec-015', name: 'BSIT-3D', subjectId: 'subj-003' },
  { id: 'sec-015', name: 'BSIT-3D', subjectId: 'subj-004' },
];

// get api for students
export async function fetchSubjects() {
  await delay();
  return mockSubjects;
}

// get api for sections
export async function fetchSectionsBySubject(subjectId: string) {
  await delay(200);
  return mockSections.filter(s => s.subjectId === subjectId);
}

// post api for enrollment
export async function saveEnrollment(
  target: EnrollmentTarget,
  students: EnrolledStudent[]
): Promise<{ saved: number }> {
  await delay(600);
  // TODO: POST to /api/enrollment with { target, students }
  console.log('[mock] Saving enrollment:', target, students.length, 'students');
  return { saved: students.length };
}