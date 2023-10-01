import { Container, Tabs, Title } from '@mantine/core';
import {
  AttendanceForm,
  NewStudentForm,
  StudentsTable,
  SurahsForm,
  BestStudentForm,
} from '../../components';

const Dashboard = () => {
  return (
    <Container>
      <Title>لوحة التحكم</Title>
      <Tabs defaultValue='top-student'>
        <Tabs.List mb='lg'>
          <Tabs.Tab value='attendance'>جدول الحضور</Tabs.Tab>
          <Tabs.Tab value='surahs'>جدول السور</Tabs.Tab>
          <Tabs.Tab value='students'>جدول الطلاب</Tabs.Tab>
          <Tabs.Tab value='new-student'>إضافة طالب جديد</Tabs.Tab>
          <Tabs.Tab value='top-student'>الطالب المثالي</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value='attendance'>
          <AttendanceForm />
        </Tabs.Panel>

        <Tabs.Panel value='surahs'>
          <SurahsForm />
        </Tabs.Panel>

        <Tabs.Panel value='students'>
          <StudentsTable />
        </Tabs.Panel>

        <Tabs.Panel value='new-student'>
          <NewStudentForm />
        </Tabs.Panel>

        <Tabs.Panel value='top-student'>
          <BestStudentForm />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default Dashboard;
