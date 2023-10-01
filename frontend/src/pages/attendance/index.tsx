import { Alert, Box, Container, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Table from '../../components/table';
import { getAttendanceColumns } from '../../utils/table-columns';
import { Column } from '@tanstack/react-table';

const Attendance = () => {
  const { data } = useQuery({
    queryKey: ['attendances'],
    queryFn: () =>
      axios.get(import.meta.env.VITE_SERVER_URL + 'attendance/formatted'),
  });
  const columns: Column<AttendaceRecord>[] | undefined =
    data && getAttendanceColumns(data?.data.attendances);

  console.log('data', data);

  return (
    <Container>
      <Title mb='lg'>جدول الحضور</Title>
      {data?.data.attendances.length ? (
        <Table data={data?.data.attendances} columns={columns} />
      ) : (
        <Alert color='red'>لا يوجود أي بيانات لعرضها</Alert>
      )}
    </Container>
  );
};

export default Attendance;
