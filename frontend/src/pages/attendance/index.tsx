import { Alert, Container, ScrollArea, Skeleton, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Table from '../../components/table';
import { getAttendanceColumns } from '../../utils/table-columns';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';

const Attendance = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['attendances'],
    queryFn: () =>
      axios.get(import.meta.env.VITE_SERVER_URL + 'attendance/formatted'),
  });
  const attendances = data?.data.attendances;

  // const bestStatsStudents =
  const columns = attendances && getAttendanceColumns(attendances);
  const table = useReactTable({
    columns,
    data: data?.data.attendances,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Container>
      <Title mb='lg'>جدول الحضور</Title>
      {isLoading ? (
        <>
          <Skeleton h={120} />
        </>
      ) : attendances.length ? (
        <ScrollArea>
          <Table table={table} />
        </ScrollArea>
      ) : (
        <Alert color='red'>لا يوجود أي بيانات لعرضها</Alert>
      )}
    </Container>
  );
};

export default Attendance;
