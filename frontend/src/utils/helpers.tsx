import { Icon } from '@iconify/react/dist/iconify.js';
import { Badge, Center, Flex, Text } from '@mantine/core';
import 'dayjs/locale/ar';
import dayjs from 'dayjs';

// export const getAttendaceColumns = (data: AttendanceTableData) => {
//   const columns: TableColumn[] = [];

//   console.log(data, 'in help');

//   data.forEach((day) => {
//     Object.keys(day).forEach((key) => {
//       if (
//         columns.some((c) => c.header === key) ||
//         (key === 'attendance_date' && columns.some((c) => c.header === 'اليوم'))
//       )
//         return;

//       if (key === 'attendance_date') {
//         return columns.push({
//           header: 'اليوم',
//           accessorKey: key,
//           cell: (info) =>
//             dayjs(info.getValue()).locale('ar').format('dddd - DD_MM'),
//         });
//       }
//       columns.push({
//         header: key,
//         accessorKey: key,
//         cell: (info) => parseAttendanceStatus(info.getValue()),
//       });
//     });
//   });

//   return columns;
// };

export const parseAttendanceStatus = (status: string) => {
  switch (status) {
    case 'LATE':
      return (
        <Center py={2} fw='lighter'>
          <Badge
            c='orange'
            color='orange.1'
            py='sm'
            px='md'
            fz='sm'
            leftSection={<Icon icon='bxs:error' fontSize='1rem' />}
          >
            متأخر
          </Badge>
        </Center>
      );
    case 'PRESENT':
      return (
        <Center>
          <Badge
            py='sm'
            px='md'
            color='blue.6'
            fz='sm'
            leftSection={<Icon icon='ion:checkmark-done' fontSize='1rem' />}
          >
            حاضر
          </Badge>
        </Center>
      );
    case 'ABSENCE':
      return (
        <Center py={2} fw='bold'>
          <Badge
            c='red'
            color='red.1'
            py='sm'
            px='md'
            fz='sm'
            leftSection={<Icon icon='icon-park-solid:error' fontSize='1rem' />}
          >
            غائب
          </Badge>
        </Center>
      );
    case 'HOLIDAY':
      return 'عطلة';
  }
};

export const parseDate = (isoDate: string) =>
  dayjs(isoDate).locale('ar').format('DD MM');
