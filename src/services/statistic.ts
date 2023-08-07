import useSWR from "swr";
import dayjs from "dayjs";
import { StatisticInfo } from "@/lib/models";
import { fetcher } from "@/services/request";

export function useStatistic() {
  const { data, error } = useSWR<StatisticInfo>("/api/statistic/", fetcher);

  if (data) {
    const currentDay = dayjs().subtract(1, "day").format("YYYY-MM-DD");
    const lastUserCount = data.user_join_time[data.user_join_time.length - 1];
    const lastReviewCount =
      data.review_create_time[data.review_create_time.length - 1];
    data.daily_new_users =
      lastUserCount.date == currentDay ? lastUserCount.count : 0;
    data.daily_new_reviews =
      lastReviewCount.date == currentDay ? lastReviewCount.count : 0;
  }

  return {
    indexState: data,
    loading: !error && !data,
    error: error,
  };
}
