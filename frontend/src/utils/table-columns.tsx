import { EditableCell } from '../components';
import { createColumnHelper } from '@tanstack/react-table';
import { parseAttendanceStatus, parseDate } from './helpers';

export const getStudentsTableColumns = () => {
  const columnHelper = createColumnHelper<StudentRecord>();

  const columns = [
    columnHelper.accessor('createdAt', {
      header: 'تاريخ الالتحاق',
      cell: (info) => parseDate(info.getValue()),
    }),
    columnHelper.accessor('first_name', {
      header: 'اسم الطالب',
      cell: EditableCell,
    }),
    columnHelper.accessor('middle_name', {
      header: 'اسم الأب',
      cell: EditableCell,
    }),
    columnHelper.accessor('last_name', {
      header: 'اسم العائلة',
      cell: EditableCell,
    }),
    columnHelper.accessor('phone_number', {
      header: 'رقم الجوال',
      cell: EditableCell,
    }),
    columnHelper.accessor('date_of_birth', {
      header: 'تاريخ الميلاد',
      // cell: (info) => parseDate(info.getValue()),
      cell: EditableCell,
    }),
  ];

  return columns;
};

export const getAttendanceColumns = (data: AttendanceTableData) => {
  const columns = [];
  const columnHelper = createColumnHelper<AttendaceRecord>();

  console.log(data, 'in help');

  data.forEach((day) => {
    Object.keys(day).forEach((key) => {
      if (
        columns.some((c) => c.header === key) ||
        (key === 'attendance_date' && columns.some((c) => c.header === 'اليوم'))
      )
        return;

      if (key === 'attendance_date') {
        return columns.push(
          columnHelper.accessor(key, {
            header: 'اليوم',
            cell: (info) => parseDate(info.getValue()),
          })
        );
      }
      columns.push(
        columnHelper.accessor(key, {
          header: key,
          cell: (info) => parseAttendanceStatus(info.getValue()),
        })
      );
    });
  });

  return columns;
};

export const getBestStudentsColumns = () => {
  const columnHelper = createColumnHelper();

  return [
    columnHelper.accessor('student', {
      header: 'الطالب المميز',
    }),
    columnHelper.accessor('from', {
      header: 'من',
      cell: (info) => parseDate(info.getValue()),
    }),
    columnHelper.accessor('to', {
      header: 'إلى',
      cell: (info) => parseDate(info.getValue()),
    }),
  ];
};
