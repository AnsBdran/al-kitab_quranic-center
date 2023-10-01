type Theme = 'light' | 'dark';

type LoginFormData = {
  email: string;
  password: string;
};

type User = {
  name: string;
  email: string;
};

type StudentFormData = {
  first_name: string;
  middle_name: string;
  last_name: string;
  student_id: string;
  phone_number: string;
  date_of_birth: unknown;
};

type AttendanceDate = {
  value: string;
  title: string;
  missing?: boolean;
};

type Student = {
  id: number;
  name: string;
};

type AttendanceFormFields = {
  attendances: {
    student_id: number;
    status: string;
  }[];
};

type AttendaceRecord = {
  id: number;
  attendance_date: string;
  [student_name: string]: 'LATE' | 'PRESENT' | 'ABSENCE' | 'HOLIDAY';
};

// type TableColumn = {
//   header: string;
//   accessorKey: string;
//   cell?: unknown;
// };

// type TableColumn = unknown[];

type StudentRecord = {
  id: number;
  createdAt: string;
  updatedAt: string;
  student_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone_number: string;
  date_of_birth: string;
};

type StudentsTableData = StudentRecord[];
type AttendanceTableData = AttendaceRecord[];

type TableData = AttendanceTableData | StudentsTableData;

type Surah = {
  value: number;
  label: string;
  verses: number;
};

type Font = 'uthmanic_hafs' | 'nastaleeq' | 'me_quran';

type Verse = {
  id: number;
  number: number;
  key: string;
  text: string;
  audio: string;
};

type NavLink = {
  to: string;
  label: string;
  icon: string;
};
