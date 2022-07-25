import useSWR from "swr";
import Config from "@/config/config";
import { User, UserPoint } from "@/lib/models";
import { fetcher, request } from "@/services/request";
import { useRouter } from "next/router";

export async function auth(code: string, basePath: string) {
  const redirect_uri =
    window.location.origin + basePath + Config.JACCOUNT_LOGIN_RETURI;
  const resp = await request("/oauth/jaccount/auth/", {
    params: {
      code,
      redirect_uri,
    },
  });
  return resp.data;
}

export async function login(basePath: string) {
  const rediretUrl =
    window.location.origin + basePath + Config.JACCOUNT_LOGIN_RETURI;
  window.location.href = `https://jaccount.sjtu.edu.cn/oauth2/authorize?client_id=${Config.JACCOUNT_CLIENT_ID}&redirect_uri=${rediretUrl}&response_type=code&scope=basic`;
}

export async function logout(basePath: string) {
  await request("/oauth/logout");
  const rediretUrl =
    window.location.origin + basePath + Config.JACCOUNT_LOGIN_RETURI;
  window.location.href = `https://jaccount.sjtu.edu.cn/oauth2/logout?client_id=${Config.JACCOUNT_CLIENT_ID}&post_logout_redirect_uri=${rediretUrl}`;
}

export function useUser() {
  const { data, error } = useSWR<User>("/api/me/", fetcher);
  const router = useRouter();
  if (error?.response?.status == 403) {
    router.push({ pathname: "/login" });
  }
  if (data) data.account = localStorage.getItem("account");
  return {
    user: data,
    loading: !error && !data,
    error: error,
  };
}

export function useUserPoint() {
  const { data, error } = useSWR<UserPoint>("/api/points/", fetcher);
  return {
    points: data,
    loading: !error && !data,
    error: error,
  };
}

export function toAdmin() {
  window.location.href = "/admin/";
}
