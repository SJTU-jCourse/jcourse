import { PaginationApiResult, Review, ReviewDraft } from '@/models';
import { request } from '@/services/request';

export async function getReviews(
  limit: number,
  offset: number,
): Promise<PaginationApiResult<Review>> {
  return await request(`/api/review/?limit=${limit}&offset=${offset}`);
}

export async function getReviewsOfCourse(id: string): Promise<Review[]> {
  return await request(`/api/course/${id}/review/`);
}

export async function writeReview(review: ReviewDraft) {
  return await request('/api/review/', { method: 'post', data: review });
}

export async function doReviewAction(id: number, action: number) {
  return await request(`/api/review/${id}/reaction/`, {
    method: 'post',
    data: action,
  });
}
