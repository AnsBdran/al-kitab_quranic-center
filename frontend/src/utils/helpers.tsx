import { Icon } from '@iconify/react/dist/iconify.js';
import { Badge, Center } from '@mantine/core';
import 'dayjs/locale/ar';
import dayjs from 'dayjs';

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
  dayjs(isoDate).locale('ar').format('dddd، DD-MM');

// export const getBestStatsStudents = (daysRecord: AttendanceRecord[]) => {
//   const result = {};
//   let daysCount = 0;
//   daysRecord.forEach((day) => {
//     daysCount++;
//     Object.keys(day).forEach((key) => {
//       if (key === 'id' || key === 'attendance_date') return;
//       // if ()
//     });
//   });
// };
