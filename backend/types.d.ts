export type AttendanceSubmittedData = {
  status: string;
  attendance_date?: string;
  student_id: number;
};

type Verse = {
  id: number;
  number: number;
  text: string;
  audio: string;
  key: string;
};
