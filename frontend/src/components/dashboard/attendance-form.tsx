import { Box, Text, Button, LoadingOverlay, Alert, Title } from '@mantine/core';
import axios from 'axios';
import { useState } from 'react';
import 'dayjs/locale/ar';
import { useForm } from '@mantine/form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { AttendanceGrid, DateSelect } from '..';

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

  const queryClient = useQueryClient();

  const form = useForm<AttendanceFormFields>({
    initialValues: {
      attendances: [],
    },
  });

  const { data: _students } = useQuery({
    queryKey: ['students'],
    queryFn: () =>
      axios
        .get(import.meta.env.VITE_SERVER_URL + 'students/basic')
        .then((res) => res.data),
    onSuccess: (data) => {
      form.setFieldValue(
        'attendances',
        data?.students.map((student: Student) => ({
          student_id: student.id,
          status: 'PRESENT',
        }))
      );
    },
    refetchOnWindowFocus: false,
  });

  const students = _students?.students;

  // handle form submit
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
    isSuccess,
  } = useMutation({
    mutationFn: (attendances: AttendanceFormFormattedValues) =>
      axios
        .post(import.meta.env.VITE_SERVER_URL + 'attendance', attendances)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries(['old-days']);
    },
  });

  console.log('hi error', error);

  return (
    <Box>
      <LoadingOverlay />
      <Title order={2}>متابعة حضور الطلاب</Title>
      {students?.length ? (
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
            setSearchTerm={setSearchTerm}
            setSelectedDate={setSelectedDate}
          />

          <AttendanceGrid form={form} students={students} />
          {/* {isError && (
            <Alert variant='light' color='red' title='لم تتم العملية بنجاح'>
              {isError
                ? error?.response.data.error
                : 'حدث خطأ ما، الرجاء المحاولة مرة أخرى.'}
            </Alert>
          )} */}
          {isSuccess && (
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
