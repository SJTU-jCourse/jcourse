import useSWR from "swr";
import { Announcement } from "@/lib/models";
import { fetcher } from "@/services/request";

export function useAnnouncements() {
  const { data, error } = useSWR<Announcement[]>("/api/announcement/", fetcher);
  return {
    announcements: data,
    loading: !error && !data,
    isError: error,
  };
}
