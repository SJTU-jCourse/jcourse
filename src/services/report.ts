import useSWR from 'swr';
import { Report } from '@/lib/models';
import { fetcher, request } from '@/services/request';

export async function writeReport(comment: string) {
  return await request('/api/report/', { method: 'post', data: { comment } });
}

export function useReports() {
  const { data, error ,mutate} = useSWR<Report[]>('/api/report/', fetcher)
  return {
    reports: data,
    loading: !error && !data,
    isError: error,
    mutate
  }
}