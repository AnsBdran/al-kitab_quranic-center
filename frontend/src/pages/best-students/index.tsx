import { Box, Container } from '@mantine/core';
import { ComingSoon } from '../../components';
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
        <ComingSoon />
      </Container>
    </Box>
  );
};

export default Top;
