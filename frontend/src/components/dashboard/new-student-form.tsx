import {
  Alert,
  Box,
  Button,
  LoadingOverlay,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { hasLength, useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const NewStudentForm = () => {
  const form = useForm<StudentFormData>({
    initialValues: {
      first_name: '',
      middle_name: '',
      last_name: '',
      student_id: '',
      phone_number: '',
      date_of_birth: new Date(),
    },
    validate: {
      first_name: hasLength(
        { min: 2, max: 10 },
        'يجب أن يكون الاسم أكثر من حرفين وأقل من عشرة حروف.'
      ),
      middle_name: hasLength(
        { min: 2, max: 10 },
        'يجب أن يكون الاسم أكثر من حرفين وأقل من عشرة حروف.'
      ),
      last_name: hasLength(
        { min: 2, max: 10 },
        'يجب أن يكون الاسم أكثر من حرفين وأقل من عشرة حروف.'
      ),
    },
  });

  const { mutate, isLoading, isError, data, isSuccess } = useMutation({
    mutationKey: ['post-student'],
    mutationFn: (values: StudentFormData) =>
      axios.post(import.meta.env.VITE_SERVER_URL + 'students', values),
  });

  const handleSubmit = async (values: StudentFormData) => {
    mutate(values);
    form.reset();
  };

  return (
    <Box pos='relative'>
      <Title mb={8} order={2}>
        تسجيل طالب جديد
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <LoadingOverlay
          visible={isLoading}
          overlayProps={{ radius: 'sm', blur: 3 }}
        />
        <Stack>
          <TextInput {...form.getInputProps('first_name')} label='اسم الطالب' />
          <TextInput {...form.getInputProps('middle_name')} label='اسم الأب' />
          <TextInput {...form.getInputProps('last_name')} label='اسم العائلة' />
          <TextInput
            {...form.getInputProps('student_id')}
            label='رقم هوية الطالب'
          />
          <TextInput
            {...form.getInputProps('phone_number')}
            label='هاتف ولي الأمر'
          />
          <DateInput
            {...form.getInputProps('date_of_birth')}
            label='تاريخ الميلاد'
            clearable
          />
          {isError && (
            <Alert title='لم تتم العملية بنجاح' color='red'>
              حدث خطأ ما، الرجاء المحاولة مرة أخرى.
            </Alert>
          )}
          {isSuccess && (
            <Alert title='تمت إضافة الطالب بنجاح' color='green'>
              تمت عملية إضافة الطالب {data.data.student.name} بنجاح
            </Alert>
          )}
          <Button type='submit' loading={isLoading}>
            إضافة طالب جديد
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default NewStudentForm;
