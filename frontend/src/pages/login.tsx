import { Icon } from '@iconify/react/dist/iconify.js';
import {
  Alert,
  Box,
  Button,
  Container,
  PasswordInput,
  Stack,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useLogin } from '../hooks';
import { LoginFormData } from '../types';

const Login = () => {
  const form = useForm<LoginFormData>({
    initialValues: {
      email: '',
      password: '',
    },
  });
  const { login, error, loading, setError } = useLogin();

  const handleFormSubmit = async (values: LoginFormData) => {
    await login(values);
  };

  return (
    <Container>
      <h1>تسجيل الدخول</h1>
      <Box
        component='form'
        maw='450px'
        mx='auto'
        mt='4rem'
        onSubmit={form.onSubmit(handleFormSubmit)}
      >
        <Stack>
          <TextInput
            {...form.getInputProps('email')}
            label='البريد الإلكتروني'
            leftSection={
              <Icon
                icon='material-symbols:alternate-email'
                pointerEvents='none'
              />
            }
          />
          <PasswordInput
            label='كلمة المرور'
            {...form.getInputProps('password')}
            leftSection={<Icon icon='material-symbols:lock' />}
          />
          {error && (
            <Alert
              variant='light'
              color='red'
              title='خطأ في عملية تسجيل الدخول'
              withCloseButton
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          )}
          <Button type='submit' loading={loading}>
            تسجيل الدخول
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default Login;
