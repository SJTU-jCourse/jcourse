import useSWR from 'swr';
import { Notice } from '@/lib/models';
import { fetcher } from '@/services/request';



export function useNotices() {
  const { data, error } = useSWR<Notice[]>('/api/notice/', fetcher)
  return {
    notices: data,
    loading: !error && !data,
    isError: error,
  }
}