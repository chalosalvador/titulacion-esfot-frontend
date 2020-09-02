/**
 * Created by chalosalvador on 8/18/20
 */
import useSWR from 'swr';
import API from './index';

export const useProjectsList = () => {
  const { data, error, mutate } = useSWR( '/projects', API.fetcher );

  return {
    projects: data && data.data,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
};
