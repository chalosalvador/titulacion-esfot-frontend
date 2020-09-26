import useSWR from 'swr';
import API from './index';

export const useTeachers = () => {
  const { data, error, mutate } = useSWR( '/teachers', API.fetcher );

  return {
    teachers: data && data.data,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
};