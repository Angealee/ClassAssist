import type {
  DashboardStats,
  TodayClass,
  RecentActivity,
  Instructor,
} from '../types';

// instructor
export const mockInstructor: Instructor = {
  id: 'inst-001',
  name: 'Prof. Koby Macale',
  email: 'ksantos@university.edu',
  department: 'College of Computer Studies',
};

// dashboard
export const mockDashboardStats: DashboardStats = {
  totalSections: 6,
  totalStudents: 204,
  attendanceRate: 87.4,
  currentWeek: 9,
};

// today class
export const mockTodayClasses: TodayClass[] = [
  {
    id: 'tc-001',
    subjectCode: 'IT-25',
    subjectName: 'Multimedia Systems',
    section: 'BSIT-1A',
    classType: 'Lecture',
    schedule: '12:00PM – 3:00 PM',
    room: 'LAB 3',
    studentCount: 38,
    attendanceTaken: true,
  },
  {
    id: 'tc-002',
    subjectCode: 'IT-11',
    subjectName: 'IT Fundamentals',
    section: 'BSIT-1B',
    classType: 'Lecture',
    schedule: '10:00 – 12:00 PM',
    room: 'SCS 303',
    studentCount: 32,
    attendanceTaken: false,
  },
];

// recent attendance activity
export const mockRecentActivity: RecentActivity[] = [
  {
    id: 'ra-001',
    subjectCode: 'IT-25',
    section: 'BSIT-1A',
    date: '2025-03-10',
    present: 31,
    absent: 2,
    late: 2,
    total: 35,
  },
  {
    id: 'ra-002',
    subjectCode: 'IT-11',
    section: 'BSIT-2C',
    date: '2025-03-10',
    present: 28,
    absent: 3,
    late: 1,
    total: 32,
  },
  {
    id: 'ra-003',
    subjectCode: 'IT-25',
    section: 'BSIT-3B',
    date: '2025-03-09',
    present: 35,
    absent: 1,
    late: 2,
    total: 38,
  },
  {
    id: 'ra-005',
    subjectCode: 'IT-11',
    section: 'BSIT-1B',
    date: '2025-03-08',
    present: 33,
    absent: 0,
    late: 1,
    total: 34,
  },
];

// ─── Weekly attendance sparkline data (Mon–Sun) ───────────────────────────────
export const mockWeeklyRates = [82, 89, 91, 85, 88, 0, 0]; // Sun indexes last