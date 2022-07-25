import useSWR from "swr";
import { StatisticInfo } from "@/lib/models";
import { fetcher } from "@/services/request";


export function useStatistic() {
  const { data, error } = useSWR<StatisticInfo>("/api/statistic/", fetcher);
  return {
    indexState: data,
    loading: !error && !data,
    error: error,
  };
}
