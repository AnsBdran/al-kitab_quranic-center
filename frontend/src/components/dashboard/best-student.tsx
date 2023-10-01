import { Box, Button, Indicator, Select, Title, darken } from '@mantine/core';
import { useStudents } from '../../hooks';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import { notifications } from '@mantine/notifications';

const TopStudentForm = () => {
  const { data: students } = useStudents({
    onSuccess: () => console.log('hi'),
  });

  const form = useForm({
    initialValues: {
      student: null,
      dateRange: [null, null],
    },
  });

  const { mutate, data, error, isLoading } = useMutation({
    mutationKey: ['best-student'],
    mutationFn: (values) =>
      axios.post(import.meta.env.VITE_SERVER_URL + 'top-student', values),
    onError: (err) => notifications.show({ message: 'لم تتم العملية بنجاح' }),
  });

  const handleSubmit = (values) => {
    console.log(values);
    mutate(values);
  };

  return (
    <Box>
      <Title order={2}>الطالب المثالي لهذا الأسبوع</Title>
      <Box component='form' onSubmit={form.onSubmit(handleSubmit)}>
        <Select
          searchable
          data={students?.data?.students.map((student) => ({
            label: student.name,
            value: student.id.toString(),
          }))}
          {...form.getInputProps('student')}
        />
        <DatePicker
          type='range'
          locale='ar'
          monthsListFormat='mm'
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
