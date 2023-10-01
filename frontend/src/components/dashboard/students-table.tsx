import { Box, Title } from '@mantine/core';
import Table_ from '../table';
import { getStudentsTableColumns } from '../../utils/table-columns';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const StudentsTable = () => {
  const { data } = useQuery({
    queryKey: ['students', 'full-info'],
    queryFn: () => axios.get(import.meta.env.VITE_SERVER_URL + 'students/full'),
  });

  const students: StudentsTableData = data?.data.students;

  const studentsColumns = data && getStudentsTableColumns();

  return (
    <Box>
      <Title order={2}>جدول الطلاب</Title>
      {data && <Table_ data={students} columns={studentsColumns} />}
    </Box>
  );
};

export default StudentsTable;
