import { PaginationApiResult, Review, ReviewDraft } from '@/models';
import { request } from '@/services/request';

export async function getReviews(
  limit: number,
  offset: number,
): Promise<PaginationApiResult<Review>> {
  const resp = await request(`/api/review/?limit=${limit}&offset=${offset}`);
  return resp.data;
}

export async function getMyReivews(): Promise<Review[]> {
  const resp = await request('/api/review/mine/');
  return resp.data;
}

export async function getReviewsOfCourse(id: string): Promise<Review[]> {
  const resp = await request(`/api/course/${id}/review/`);
  return resp.data;
}

export async function writeReview(review: ReviewDraft) {
  const resp = await request('/api/review/', { method: 'post', data: review });
  return resp;
}

export async function doReviewAction(id: number, action: number) {
  const resp = await request(`/api/review/${id}/reaction/`, {
    method: 'post',
    data: { action },
  });
  return resp.data;
}
