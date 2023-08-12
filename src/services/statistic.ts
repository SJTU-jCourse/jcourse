import useSWR from "swr";
import dayjs from "dayjs";
import { StatisticInfo } from "@/lib/models";
import { fetcher } from "@/services/request";

export function useStatistic() {
  const { data, error } = useSWR<StatisticInfo>("/api/statistic/", fetcher);

  if (data) {
    const currentDay = dayjs().subtract(1, "day").format("YYYY-MM-DD");

    const new_user_map = new Map<string, number>();
    const new_review_map = new Map<string, number>();

    data.user_join_time.forEach((item) => {
      new_user_map.set(item.date, item.count);
    });

    data.review_create_time.forEach((item) => {
      new_review_map.set(item.date, item.count);
    });

    data.daily_new_users = new_user_map.get(currentDay) || 0;
    data.daily_new_reviews = new_review_map.get(currentDay) || 0;
  }

  return {
    indexState: data,
    loading: !error && !data,
    error: error,
  };
}
