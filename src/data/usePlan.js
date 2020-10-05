import useSWR from 'swr';
import API from './index';

export const usePlanContent = ( id ) => {
  const { data, error, mutate } = useSWR( () => `/projects/${ id }`, API.fetcher );
  return {
    plan: data && data.data,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
};