import { request } from "@/services/request";

export async function clickPromotion(id: number) {
  const resp = await request(`/api/promotion/${id}/click/`, {
    method: "post",
  });
  return resp.data;
}

export async function showPromotion(id: number) {
  const resp = await request(`/api/promotion/${id}/show/`, {
    method: "post",
  });
  return resp.data;
}
