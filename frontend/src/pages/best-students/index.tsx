import { Box, Container, Title } from '@mantine/core';
import { Table } from '../../components';
import { getBestStudentsColumns } from '../../utils/table-columns';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Top = () => {
  const { data } = useQuery({
    queryKey: ['best_students'],
    queryFn: () => axios.get(import.meta.env.VITE_SERVER_URL + 'best-student'),
  });
  console.log('the', data);

  return (
    <Box>
      <Container>
        <Title>أفضل الطلاب</Title>
        {data && <Table columns={getBestStudentsColumns()} data={data.data} />}
      </Container>
    </Box>
  );
};

export default Top;
