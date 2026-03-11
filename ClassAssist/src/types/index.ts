
//instructor login naten
export interface Instructor {
  id: string;
  name: string;
  email: string;
  department: string;
  avatarUrl?: string;
}

//subject
export interface Subject {
  id: string;
  code: string;
  name: string;
  units: number;
}

//section
export interface Section {
  id: string;
  name: string;
  subjectId: string;
  schedule: string;      
  room: string;
  studentCount: number;
}

//student
export interface Student {
  id: string;
  studentId: string;   
  firstName: string;
  lastName: string;
  email: string;
  sectionId: string;
}

// enroll / import
export interface EnrolledStudent {
  studentId: string;
  lastName: string;
  firstName: string;
  middleName?: string;
  email?: string;
}

export interface EnrollmentImportResult {
  success: EnrolledStudent[];
  errors: { row: number; reason: string }[];
  total: number;
}

export interface EnrollmentTarget {
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  sectionId: string;
  sectionName: string;
}

//attendance
export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';
export type ClassType = 'Lecture' | 'Laboratory';

export interface AttendanceRecord {
  id: string;
  studentId: string;
  sectionId: string;
  subjectId: string;
  classType: ClassType;
  date: string;          // ISO date string
  status: AttendanceStatus;
  week: number;
}

//dashboard
export interface DashboardStats {
  totalSections: number;
  totalStudents: number;
  attendanceRate: number;   // 0–100
  currentWeek: number;
}

//home
export interface TodayClass {
  id: string;
  subjectCode: string;
  subjectName: string;
  section: string;
  classType: ClassType;
  schedule: string;
  room: string;
  studentCount: number;
  attendanceTaken: boolean;
}

export interface RecentActivity {
  id: string;
  subjectCode: string;
  section: string;
  date: string;
  present: number;
  absent: number;
  late: number;
  total: number;
}

//grades
export type Term = 'Prelims' | 'Midterms' | 'Finals';
export type AssessmentType = 'Recitation' | 'Quiz' | 'Performance Task' | 'Exam';

export interface GradeEntry {
  studentId: string;
  assessmentId: string;
  score: number | null;
}

export interface Assessment {
  id: string;
  type: AssessmentType;
  title: string;
  maxScore: number;
  term: Term;
}