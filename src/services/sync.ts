import useSWR from "swr";

import Config from "@/config/config";
import { CourseListItem, SyncCourseItem } from "@/lib/models";
import { fetcher, request } from "@/services/request";

export function loginSync(basePath: string) {
  const rediretUrl =
    window.location.origin + basePath + Config.JACCOUNT_SYNC_RETURI;
  window.location.href = `/oauth/sync-lessons/login?redirect_uri=${rediretUrl}`;
}

export async function authSync(code: string, state: string, basePath: string) {
  const rediretUrl =
    window.location.origin + basePath + Config.JACCOUNT_SYNC_RETURI;
  const resp = await request("/oauth/sync-lessons/auth/", {
    params: {
      code,
      state,
      redirect_uri: rediretUrl,
    },
  });
  return resp.data;
}

export async function syncLessons(courses: SyncCourseItem[]) {
  const resp = await request(`/api/sync-lessons-v2/`, {
    method: "POST",
    data: courses,
  });
  return resp.data;
}

export function useLessons() {
  const { data, error, mutate } = useSWR<CourseListItem[]>(
    "/api/lesson/",
    fetcher
  );
  return {
    courses: data,
    loading: !error && !data,
    isError: error,
    mutate,
  };
}
