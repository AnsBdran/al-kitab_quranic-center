import { Icon } from '@iconify/react/dist/iconify.js';
import {
  Box,
  Center,
  Grid,
  Text,
  SegmentedControl,
  Flex,
  Title,
  Combobox,
  Button,
  useCombobox,
  LoadingOverlay,
  ScrollAreaAutosize,
  GridCol,
} from '@mantine/core';
import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState, Fragment } from 'react';
import 'dayjs/locale/ar';
import { AttendanceDate } from '../../types';
import { useForm } from '@mantine/form';

type Student = {
  id: number;
  name: string;
};

const AttendanceForm = () => {
  // useState hooks
  const [students, setStudents] = useState<Student[] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<AttendanceDate | null>(null);
  const [dateOptions, setDateOptions] = useState<AttendanceDate[] | null>(null);

  // useForm hook
  const form = useForm<{
    attendances: {
      student_id: number;
      student_name: string;
      attendance_date: string;
      status: string;
    }[];
  }>({});

  // useEffect hooks
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          import.meta.env.VITE_SERVER_URL + 'students'
        );
        form.setValues({
          attendances: data.students.map((student) => ({
            student_id: student.id,
            student_name: student.name,
            status: 'LATE',
            attendance_date: selectedDate?.value,
          })),
        });
        setStudents(data.students);
      } catch {
        console.log("coundn't get the students");
      }
    })();
  }, [selectedDate]);

  useEffect(() => {
    const today = new Date();
    const lastThirtyDay = [];
    // const lastThirtyDay = new Set();

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const isoDate = date.toISOString();
      lastThirtyDay.push({
        value: isoDate,
        title: dayjs(date).locale('ar').format('dddd، DD | MMMM'),
      });
    }
    setDateOptions(lastThirtyDay);
  }, []);

  // handlers
  const combobox = useCombobox({
    // defaultOpened: true,
    onDropdownClose: () => {
      combobox.focusSearchInput();
      combobox.focusTarget();
      setSearchTerm('');
    },
    onDropdownOpen: () => {
      combobox.focusSearchInput();
    },
  });

  const options =
    dateOptions &&
    dateOptions
      .filter((date) =>
        date.title
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLocaleLowerCase().trim())
      )
      .map((date) => (
        <Combobox.Option value={JSON.stringify(date)} key={date.value}>
          {date.title.toString()}
        </Combobox.Option>
      ));

  // handle submit of the form
  const handleSubmit = async (values) => {
    console.log(values);
    const res = await axios.post(
      import.meta.env.VITE_SERVER_URL + 'attendance',
      values
    );
    console.log(res);
  };

  const StatusOptions = form.values.attendances?.map((att, index) => (
    <Fragment key={att.student_id}>
      <GridCol span={4}>{att.student_name}</GridCol>
      <GridCol span={6}>
        <SegmentedControl
          {...form.getInputProps(`attendances.${index}.status`)}
          data={[
            {
              value: 'PRESENT',
              label: (
                <Center component={Flex} gap={8} c='green'>
                  حاضر
                  <Icon icon='ph:mask-happy-bold' />
                </Center>
              ),
            },
            {
              value: 'LATE',
              label: (
                <Center component={Flex} gap={8} c='gray.8'>
                  متأخر
                  <Icon icon='ph:mask-sad-bold' />
                </Center>
              ),
            },
            {
              value: 'ABSENCE',
              label: (
                <Center component={Flex} gap={8} c='red'>
                  غائب
                  <Icon icon='ph:mask-sad-fill' />
                </Center>
              ),
            },
          ]}
        />
      </GridCol>
    </Fragment>
  ));

  return (
    <Box>
      <LoadingOverlay />
      <h1>متابعة حضور الطلاب</h1>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box mb='xs'>
          <Text span c='dimmed'>
            تاريخ اليوم:{' '}
          </Text>
          <Text span c='dimmed'>
            {' '}
            {selectedDate ? selectedDate.title : 'قم باختيار التاريخ'}
          </Text>
        </Box>

        <Combobox
          store={combobox}
          position='top-start'
          onOptionSubmit={(val) => {
            setSelectedDate(JSON.parse(val));
            combobox.closeDropdown();
          }}
          width={200}
          // {...form.getInputProps('attendance_date')}
        >
          <Combobox.Target>
            <Button onClick={() => combobox.toggleDropdown()}>
              قم باختيار التاريخ
            </Button>
          </Combobox.Target>

          <Combobox.Dropdown>
            <Combobox.Search
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Combobox.Options>
              <ScrollAreaAutosize mah={200}>{options}</ScrollAreaAutosize>
            </Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>

        <Grid align='center' mt='lg'>
          <Grid.Col span={4}>
            <Title size={20}>اسم الطالب</Title>
          </Grid.Col>
          <Grid.Col span={6} />
          {StatusOptions}
        </Grid>
        <Button type='submit'>تأكيد</Button>
      </form>
    </Box>
  );
};

export default AttendanceForm;
// {/* {students?.map((student, index) => (
//   <Fragment key={student.id}>
//     <Grid.Col span={4}>
//       <Text>{student.name}</Text>
//     </Grid.Col>
//     <Grid.Col span={6}>
//       <SegmentedControl
//         fullWidth
//         defaultValue='PRESENT'
//         {...form.getInputProps(`attendances.${index}.status`)}
//         data={[
//           {
//             value: 'PRESENT',
//             label: (
//               <Center component={Flex} gap={8} c='green'>
//                 حاضر
//                 <Icon icon='ph:mask-happy-bold' />
//               </Center>
//             ),
//           },
//           {
//             value: 'LATE',
//             label: (
//               <Center component={Flex} gap={8} c='gray.8'>
//                 متأخر
//                 <Icon icon='ph:mask-sad-bold' />
//               </Center>
//             ),
//           },
//           {
//             value: 'ABSENCE',
//             label: (
//               <Center component={Flex} gap={8} c='red'>
//                 غائب
//                 <Icon icon='ph:mask-sad-fill' />
//               </Center>
//             ),
//           },
//         ]}
//       />{' '}
//     </Grid.Col>
//   </Fragment>
// ))} */}

// import { Icon } from '@iconify/react/dist/iconify.js';
// import {
//   Box,
//   Center,
//   Grid,
//   Text,
//   SegmentedControl,
//   Flex,
//   Title,
//   Combobox,
//   Button,
//   useCombobox,
//   LoadingOverlay,
//   ScrollAreaAutosize,
//   GridCol,
//   Alert,
// } from '@mantine/core';
// import axios from 'axios';
// import { useState, Fragment, useMemo } from 'react';
// import 'dayjs/locale/ar';
// import { AttendanceDate } from '../../types';
// import { useForm } from '@mantine/form';
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { notifications } from '@mantine/notifications';

// type Student = {
//   id: number;
//   name: string;
// };

// type AttendanceFormFields = {
//   attendances: {
//     student_id: number;
//     status: string;
//   }[];
// };

// type AttendanceFormFormattedValues = {
//   attendance_date: string;
//   student_id: number;
//   status: string;
// }[];

// const AttendanceForm = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedDate, setSelectedDate] = useState<{
//     title: string;
//     value: string;
//   } | null>(null);
//   const [isErrorAlertVisible, setIsErrorAlertVisible] = useState(false);
//   const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false);

//   const queryClient = useQueryClient();

//   const form = useForm<AttendanceFormFields>({
//     initialValues: {
//       attendances: [],
//     },
//   });

//   const handleSubmit = async (values: AttendanceFormFields) => {
//     if (!selectedDate) return;
//     const formattedValues = values.attendances.map((value) => ({
//       ...value,
//       attendance_date: selectedDate?.value,
//     }));
//     mutate(formattedValues);
//   };

//   const combobox = useCombobox({
//     onDropdownClose: () => {
//       combobox.focusSearchInput();
//       combobox.focusTarget();
//       setSearchTerm('');
//     },
//     onDropdownOpen: () => {
//       combobox.focusSearchInput();
//     },
//   });

//   const {
//     mutate,
//     isLoading: isUploading,
//     data: response,
//     error,
//   } = useMutation({
//     mutationFn: (attendances: AttendanceFormFormattedValues) =>
//       axios.post(import.meta.env.VITE_SERVER_URL + 'attendance', attendances),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['old-days']);
//       setIsSuccessAlertVisible(true);
//     },
//     onError: () => {
//       setIsErrorAlertVisible(true);
//     },
//   });

//   const { data: oldDays } = useQuery({
//     queryKey: ['old-days'],
//     queryFn: () =>
//       axios.get(import.meta.env.VITE_SERVER_URL + 'attendance/old-days'),
//   });

//   const { data: students } = useQuery({
//     queryKey: ['students'],
//     queryFn: () => axios.get(import.meta.env.VITE_SERVER_URL + 'students'),
//     onSuccess: (data) =>
//       form.setFieldValue(
//         'attendances',
//         data.data.students.map((student: Student) => ({
//           student_id: student.id,
//           status: 'PRESENT',
//         }))
//       ),
//   });

//   const dateOptions = useMemo(() => {
//     return oldDays?.data.oldDays
//       .filter((day: AttendanceDate) =>
//         day.title?.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//       .map((day: AttendanceDate) => {
//         return (
//           <Combobox.Option
//             value={JSON.stringify(day)}
//             key={day.value}
//             c={day.missing ? 'red' : 'green'}
//           >
//             {day.title}
//           </Combobox.Option>
//         );
//       });
//   }, [oldDays, searchTerm]);

//   const studentsStatusOptions = students?.data.students.map(
//     (student: Student, index: number) => (
//       <Fragment key={student.id}>
//         <GridCol span={4}>{student.name}</GridCol>
//         <GridCol span={6}>
//           <SegmentedControl
//             {...form.getInputProps(`attendances.${index}.status`)}
//             data={[
//               {
//                 value: 'PRESENT',
//                 label: (
//                   <Center component={Flex} gap={8} c='green'>
//                     حاضر
//                     <Icon icon='ph:mask-happy-bold' />
//                   </Center>
//                 ),
//               },
//               {
//                 value: 'LATE',
//                 label: (
//                   <Center component={Flex} gap={8} c='gray.8'>
//                     متأخر
//                     <Icon icon='ph:mask-sad-bold' />
//                   </Center>
//                 ),
//               },
//               {
//                 value: 'ABSENCE',
//                 label: (
//                   <Center component={Flex} gap={8} c='red'>
//                     غائب
//                     <Icon icon='ph:mask-sad-fill' />
//                   </Center>
//                 ),
//               },
//             ]}
//           />
//         </GridCol>
//       </Fragment>
//     )
//   );

//   return (
//     <Box>
//       <LoadingOverlay />
//       <h1>متابعة حضور الطلاب</h1>
//       <form onSubmit={form.onSubmit(handleSubmit)}>
//         <Box mb='xs'>
//           <Text span c='dimmed'>
//             تاريخ اليوم:{' '}
//           </Text>
//           <Text span c='dimmed'>
//             {' '}
//             {selectedDate ? selectedDate.title : 'قم باختيار التاريخ'}
//           </Text>
//         </Box>

//         <Combobox
//           store={combobox}
//           position='bottom-start'
//           width={200}
//           onOptionSubmit={(date) => {
//             console.log('combbooooo', date);
//             setSelectedDate(JSON.parse(date));
//             combobox.closeDropdown();
//             setIsErrorAlertVisible(false);
//             setIsSuccessAlertVisible(false);
//           }}
//         >
//           <Combobox.Target>
//             <Button onClick={() => combobox.toggleDropdown()}>
//               قم باختيار التاريخ
//             </Button>
//           </Combobox.Target>

//           <Combobox.Dropdown>
//             <Combobox.Search
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <Combobox.Options>
//               <ScrollAreaAutosize mah={200}>{dateOptions}</ScrollAreaAutosize>
//             </Combobox.Options>
//           </Combobox.Dropdown>
//         </Combobox>

//         <Grid align='center' my='lg'>
//           <Grid.Col span={4}>
//             <Title size={20}>اسم الطالب</Title>
//           </Grid.Col>
//           <Grid.Col span={6} />
//           {studentsStatusOptions}
//         </Grid>
//         {isErrorAlertVisible && (
//           <Alert variant='light' color='red' title='لم تتم العملية بنجاح'>
//             {error?.response?.data.error
//               ? error?.response?.data.error
//               : 'حدث خطأ ما، الرجاء المحاولة مرة أخرى.'}
//           </Alert>
//         )}
//         {!!response && (
//           <Alert title='تم إرسال البيانات بنجاح'>
//             لقد تم تعبئة بيانات الحضور لهذا اليوم بنجاح.
//           </Alert>
//         )}

//         <Button
//           type='submit'
//           loading={isUploading}
//           mt='md'
//           onClick={() => {
//             if (!selectedDate)
//               notifications.show({
//                 title: 'الرجاء اختيار التاريخ',
//                 message: 'لا يمكنك إرسال البيانات بدون اختيار التاريخ.',
//                 color: 'red',
//               });
//           }}
//         >
//           تأكيد
//         </Button>
//       </form>
//     </Box>
//   );
// };

// export default AttendanceForm;
