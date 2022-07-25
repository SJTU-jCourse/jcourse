import useSWR from "swr";
import Config from "@/config/config";
import { CourseListItem } from "@/lib/models";

import { fetcher, request } from "@/services/request";

export function loginSync(basePath: string) {
  const rediretUrl =
    window.location.origin + basePath + Config.JACCOUNT_SYNC_RETURI;
  window.location.href = `https://jaccount.sjtu.edu.cn/oauth2/authorize?client_id=${Config.JACCOUNT_CLIENT_ID}&redirect_uri=${rediretUrl}&response_type=code&scope=openid lessons`;
}

export async function authSync(code: string, basePath: string) {
  const rediretUrl =
    window.location.origin + basePath + Config.JACCOUNT_SYNC_RETURI;
  const resp = await request("/oauth/sync-lessons/auth/", {
    params: {
      code: code,
      redirect_uri: rediretUrl,
    },
  });
  return resp.data;
}

export async function syncLessons(semester: string): Promise<CourseListItem[]> {
  const resp = await request(`/api/sync-lessons/${semester}/`, {
    method: "POST",
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
