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

type AttendanceRecord = {
  id: number;
  attendance_date: string;
  (key: string): string;
};
// & Record<string, 'LATE' | 'PRESENT' | 'ABSENCE' | 'HOLIDAY'>;

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
type AttendanceTableData = AttendanceRecord[];

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
  page_number: string;
};

type NavLink = {
  to: string;
  label: string;
  icon: string;
};

type VerseFull = {
  id: number;
  page_number: number;
  verse_key: string;
  words: {
    id: number;
    page_number: number;
    audio_url: string;
    code_v1: string;
  }[];
};

type VerseAudio = {
  verse_key: string;
  url: string;
};

type BestStudentFormData = {
  student: string | null;
  dateRange: [string | null, string | null];
};

type SurahFormData = {
  surah: string;
  range: [number, number];
};
// type UseVerseSoundProp = {
//   verses: Verse[];
// };

type TableColumn = {
  header: string;
  cell: React.ReactNode;
  accessorKey: string;
};
