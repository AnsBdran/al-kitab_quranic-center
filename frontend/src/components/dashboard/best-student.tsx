import { Box, Button, Indicator, Select, Title } from '@mantine/core';
// import { useStudents } from '../../hooks';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { notifications } from '@mantine/notifications';

const TopStudentForm = () => {
  // const { data } = useStudents();
  const { data } = useQuery({
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

  const students = data?.students;
  console.log('sutt', students);

  const form = useForm<BestStudentFormData>({
    initialValues: {
      student: null,
      dateRange: [null, null],
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationKey: ['best-student'],
    mutationFn: (values: BestStudentFormData) =>
      axios.post(import.meta.env.VITE_SERVER_URL + 'top-student', values),
    onError: () => notifications.show({ message: 'لم تتم العملية بنجاح' }),
  });

  const handleSubmit = (values: BestStudentFormData) => {
    console.log(values);
    mutate(values);
  };

  return (
    <Box>
      <Title order={2}>الطالب المثالي لهذا الأسبوع</Title>
      <Box component='form' onSubmit={form.onSubmit(handleSubmit)}>
        <Select
          searchable
          data={students?.map((student: Student) => ({
            label: student.name,
            value: student.id.toString(),
          }))}
          {...form.getInputProps('student')}
        />
        <DatePicker
          type='range'
          locale='ar'
          monthsListFormat='MMMM - MM'
          firstDayOfWeek={6}
          weekdayFormat='dd'
          withCellSpacing={true}
          mx='auto'
          w='max-content'
          {...form.getInputProps('dateRange')}
          mt='lg'
          size='md'
          renderDay={(date) => {
            const day = date.getDate();
            const isSaturday = date.getDay() === 6;
            const isThursday = date.getDay() === 4;
            return (
              <Indicator
                size={4}
                color={isThursday ? 'red' : 'blue'}
                disabled={!isSaturday && !isThursday}
              >
                <div>{day}</div>
              </Indicator>
            );
          }}
        />
        <Button mt='lg' type='submit' loading={isLoading}>
          تسجيل
        </Button>
      </Box>
    </Box>
  );
};

export default TopStudentForm;
