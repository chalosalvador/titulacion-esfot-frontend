import useSWR from 'swr';
import API from './index';

export const useProject = () => {
  const { data, error, mutate } = useSWR( '/students/project', API.fetcher );

  return {
    projects: data && data.data,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
};