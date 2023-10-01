import { DefaultedQueryObserverOptions, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useTaskVerses = (props) => {
  const queryRes = useQuery({
    queryKey: ['task-verses'],
    queryFn: () =>
      axios.get(import.meta.env.VITE_SERVER_URL + 'daily-task/wbw'),
    ...props,
  });
  // const verses = queryRes.data?.data.verses;
  // console.log({ verses });

  const pageNumbers: number[] | undefined =
    queryRes.data &&
    ([
      ...new Set(queryRes?.data.data.verses.map((verse) => verse.page_number)),
    ] as number[] | undefined);

  return {
    // verses,
    pageNumbers,
    ...queryRes,
  };
};

export default useTaskVerses;
