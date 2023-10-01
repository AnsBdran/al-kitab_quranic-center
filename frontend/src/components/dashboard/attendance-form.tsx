import { Box, Text, Button, LoadingOverlay, Alert, Title } from '@mantine/core';
import axios from 'axios';
import { useState } from 'react';
import 'dayjs/locale/ar';
import { useForm } from '@mantine/form';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { AttendanceFormFields } from '../../types';
import { AttendanceGrid, DateSelect } from '..';
import { useStudents } from '../../hooks';

type AttendanceFormFormattedValues = {
  attendance_date: string;
  student_id: number;
  status: string;
}[];

const AttendanceForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<{
    title: string;
    value: string;
  } | null>(null);
  const [isErrorAlertVisible, setIsErrorAlertVisible] = useState(false);
  const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false);

  const queryClient = useQueryClient();

  const form = useForm<AttendanceFormFields>({
    initialValues: {
      attendances: [],
    },
  });

  // const { data: students, isError } = useQuery({
  //   queryKey: ['students'],
  //   queryFn: () =>
  //     axios.get(import.meta.env.VITE_SERVER_URL + 'students/basic'),
  //   onSuccess: (data) =>
  //     form.setFieldValue(
  //       'attendances',
  //       data.data.students.map((student: Student) => ({
  //         student_id: student.id,
  //         status: 'PRESENT',
  //       }))
  //     ),
  // });

  const { data: students, isError } = useStudents({
    onSuccess: (data) =>
      form.setFieldValue(
        'attendances',
        data.data.students.map((student: Student) => ({
          student_id: student.id,
          status: 'PRESENT',
        }))
      ),
  });

  // console.log('in theeeee', isError, students);
  const handleSubmit = async (values: AttendanceFormFields) => {
    if (!selectedDate) return;
    const formattedValues = values.attendances.map((value) => ({
      ...value,
      attendance_date: selectedDate?.value,
    }));
    mutate(formattedValues);
  };

  const {
    mutate,
    isLoading: isUploading,
    error,
  } = useMutation({
    mutationFn: (attendances: AttendanceFormFormattedValues) =>
      axios.post(import.meta.env.VITE_SERVER_URL + 'attendance', attendances),
    onSuccess: () => {
      queryClient.invalidateQueries(['old-days']);
      setIsSuccessAlertVisible(true);
      setIsErrorAlertVisible(false);
    },
    onError: () => {
      setIsErrorAlertVisible(true);
      setIsSuccessAlertVisible(false);
    },
  });

  return (
    <Box>
      <LoadingOverlay />
      <Title order={2}>متابعة حضور الطلاب</Title>
      {students?.data.students.length ? (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Box mb='xs'>
            <Text span c='dimmed'>
              تاريخ اليوم:{' '}
            </Text>
            <Text span c='dimmed'>
              {selectedDate?.title || 'قم باختيار التاريخ'}
            </Text>
          </Box>
          <DateSelect
            searchTerm={searchTerm}
            selectedDate={selectedDate}
            setIsErrorAlertVisible={setIsErrorAlertVisible}
            setIsSuccessAlertVisible={setIsSuccessAlertVisible}
            setSearchTerm={setSearchTerm}
            setSelectedDate={setSelectedDate}
          />

          <AttendanceGrid form={form} students={students} />
          {isErrorAlertVisible && (
            <Alert variant='light' color='red' title='لم تتم العملية بنجاح'>
              {error?.response?.data?.error ||
                'حدث خطأ ما، الرجاء المحاولة مرة أخرى.'}
            </Alert>
          )}
          {isSuccessAlertVisible && (
            <Alert title='تم إرسال البيانات بنجاح'>
              لقد تم تعبئة بيانات الحضور لهذا اليوم بنجاح.
            </Alert>
          )}

          <Button
            type='submit'
            loading={isUploading}
            mt='md'
            onClick={() => {
              if (!selectedDate)
                notifications.show({
                  title: 'الرجاء اختيار التاريخ',
                  message: 'لا يمكنك إرسال البيانات بدون اختيار التاريخ.',
                  color: 'red',
                });
            }}
          >
            تأكيد
          </Button>
        </form>
      ) : (
        <Alert color='red'>قم بإضافة بعض الطلاب أولاً.</Alert>
      )}
    </Box>
  );
};

export default AttendanceForm;
