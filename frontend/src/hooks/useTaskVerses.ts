import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type UseTaskVersesData = {
  verses: VerseFull[];
};

const useTaskVerses = () => {
  const queryRes = useQuery<[unknown], unknown, UseTaskVersesData>({
    queryKey: ['task-verses'],
    queryFn: () =>
      axios
        .get(import.meta.env.VITE_SERVER_URL + 'daily-task/wbw')
        .then((res) => res.data),
    // ...props,
  });
  console.log('123', queryRes.data);

  const pageNumbers: number[] | null = (
    queryRes.data
      ? [
          ...new Set(
            queryRes?.data.verses.map((verse: VerseFull) => verse.page_number)
          ),
        ]
      : null
  ) as number[] | null;

  return {
    pageNumbers,
    ...queryRes,
  };
};

export default useTaskVerses;
