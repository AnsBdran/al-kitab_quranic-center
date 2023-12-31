import { Box, Title } from '@mantine/core';
import Table_ from '../table';
import { getStudentsTableColumns } from '../../utils/table-columns';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';

const StudentsTable = () => {
  const { data } = useQuery({
    queryKey: ['students', 'full-info'],
    queryFn: () => axios.get(import.meta.env.VITE_SERVER_URL + 'students/full'),
  });

  const students: StudentsTableData = data?.data.students;

  const studentsColumns = getStudentsTableColumns();

  const table = useReactTable({
    columns: studentsColumns,
    data: students,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Box>
      <Title order={2}>جدول الطلاب</Title>
      {students && <Table_ table={table} />}
    </Box>
  );
};

export default StudentsTable;
