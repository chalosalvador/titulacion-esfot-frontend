import useSWR from 'swr';
import API from './index';

export const useStudentsList = () => {
  const { data, error, mutate } = useSWR( '/students', API.fetcher );
  console.log("data",data);
  return {
    students: (data && data.data),
    links: data && data.links,
    meta: data && data.meta,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
};
