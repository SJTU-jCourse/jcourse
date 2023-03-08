import { NextRouter } from "next/router";
import useSWR from "swr";

import Config from "@/config/config";
import { LoginResponse, User, UserPoint } from "@/lib/models";
import { fetcher, request } from "@/services/request";

export async function jAccountAuth(
  code: string,
  state: string,
  basePath: string,
  next: string
): Promise<LoginResponse> {
  let redirect_uri =
    window.location.origin + basePath + Config.JACCOUNT_LOGIN_RETURI;
  if (next) {
    redirect_uri += "?next=" + next;
  }
  const resp = await request("/oauth/jaccount/auth/", {
    params: {
      code,
      state,
      redirect_uri,
    },
  });
  return resp.data;
}

export async function jAccountLogin(basePath: string, next: string) {
  let redirect_uri =
    window.location.origin + basePath + Config.JACCOUNT_LOGIN_RETURI;
  if (next) {
    redirect_uri += "?next=" + next;
  }
  window.location.href = `/oauth/jaccount/login/?redirect_uri=${redirect_uri}`;
}

export async function login(username: string, password: string) {
  const resp = await request("/oauth/login/", {
    method: "post",
    data: { username, password },
  });
  return resp.data;
}

export async function emailPasswordLogin(account: string, password: string) {
  const resp = await request("/oauth/email/login/", {
    method: "post",
    data: { account, password },
  });
  return resp.data;
}

export async function logout(basePath: string, router: NextRouter) {
  await request("/oauth/logout/");
  localStorage.removeItem("account");
  const rediretUrl =
    window.location.origin + basePath + Config.JACCOUNT_LOGIN_RETURI;
  router.push(rediretUrl);
  //window.location.href = `https://jaccount.sjtu.edu.cn/oauth2/logout?client_id=${Config.JACCOUNT_CLIENT_ID}&post_logout_redirect_uri=${rediretUrl}`;
}

export async function sendCode(account: string) {
  const resp = await request("/oauth/email/send-code/", {
    method: "post",
    data: { account },
  });
  return resp.data;
}

export async function verifyCode(
  account: string,
  code: string
): Promise<LoginResponse> {
  const resp = await request("/oauth/email/verify/", {
    method: "post",
    data: { account, code },
  });
  return resp.data;
}

export function useUser() {
  const { data, error } = useSWR<User>("/api/me/", fetcher);
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

export function postLogin(data: LoginResponse, router: NextRouter) {
  localStorage.setItem("account", data.account);
  if (router.query.next) {
    router.replace(router.query.next as string);
  } else {
    router.replace("/");
  }
}
