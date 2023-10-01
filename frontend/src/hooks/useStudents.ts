import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type useStudentsProps = {
  onSuccess: (data: unknown) => void;
};

const useStudents = ({ onSuccess }: useStudentsProps) => {
  return useQuery({
    queryKey: ['students'],
    queryFn: () =>
      axios.get(import.meta.env.VITE_SERVER_URL + 'students/basic'),
    onSuccess,
  });
};

export default useStudents;
