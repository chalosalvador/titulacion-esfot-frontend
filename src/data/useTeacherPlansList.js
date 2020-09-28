import useSWR from 'swr';
import API from './index';

export const useTeachersPlansList = () => {
  const { data, error, mutate } = useSWR( '/teacher/ideas', API.fetcher );

  return {
    teacher_ideas: data && data.data,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
};