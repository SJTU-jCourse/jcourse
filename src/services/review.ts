import useSWR from "swr";

import {
  NotificationLevel,
  Pagination,
  PaginationApiResult,
  Review,
  ReviewDraft,
  ReviewFilterProps,
  ReviewFilterValue,
  ReviewRevision,
} from "@/lib/models";
import { fetcher, request } from "@/services/request";

export function useReviews(pagination: Pagination) {
  const { data, error } = useSWR<PaginationApiResult<Review>>(
    `/api/review/?page=${pagination.page}&size=${pagination.pageSize}`,
    fetcher
  );
  return {
    reviews: data,
    loading: !error && !data,
    error: error,
  };
}

export function useFollowedReviews(pagination: Pagination) {
  const { data, error } = useSWR<PaginationApiResult<Review>>(
    `/api/review/?page=${pagination.page}&size=${pagination.pageSize}&notification_level=${NotificationLevel.FOLLOW}`,
    fetcher
  );
  return {
    reviews: data,
    loading: !error && !data,
    error: error,
  };
}

export async function getReview(review_id: string): Promise<Review> {
  const resp = await request(`/api/review/${review_id}/`);
  return resp.data;
}

export function useReview(review_id: string) {
  const { data, error } = useSWR<Review>(
    review_id ? `/api/review/${review_id}/` : null,
    fetcher
  );
  return {
    review: data,
    loading: !error && !data,
    error: error,
  };
}

export function useMyReviews() {
  const { data, error } = useSWR<Review[]>("/api/review/mine/", fetcher);
  return {
    reviews: data,
    loading: !error && !data,
    error: error,
  };
}

export function useReviewsOfCourse(
  id: string,
  pagination: Pagination,
  filters: ReviewFilterValue
) {
  let filterParams: string = "";
  if (filters.order) filterParams += `&order=${filters.order}`;
  if (filters.semester) filterParams += `&semester=${filters.semester}`;
  if (filters.rating) filterParams += `&rating=${filters.rating}`;
  const { data, error } = useSWR<PaginationApiResult<Review>>(
    id
      ? `/api/course/${id}/review/?${filterParams}&page=${pagination.page}&size=${pagination.pageSize}`
      : null,
    fetcher
  );
  return {
    reviews: data,
    loading: !error && !data,
    error: error,
  };
}

export async function writeReview(review: ReviewDraft) {
  const resp = await request("/api/review/", { method: "post", data: review });
  return resp;
}

export async function modifyReview(review_id: string, draft: ReviewDraft) {
  const resp = await request(`/api/review/${review_id}/`, {
    method: "put",
    data: draft,
  });
  return resp;
}

export async function doReviewReaction(id: number, reaction: number) {
  const resp = await request(`/api/review/${id}/reaction/`, {
    method: "post",
    data: { reaction },
  });
  return resp.data;
}

export function useReviewRevisions(id: number) {
  const { data, error } = useSWR<PaginationApiResult<ReviewRevision>>(
    id ? `/api/review/${id}/revision/` : null,
    fetcher
  );
  return {
    revisions: data,
    loading: !error && !data,
    error: error,
  };
}

export function useReviewFilters(course_id: string) {
  const { data, error } = useSWR<ReviewFilterProps>(
    course_id ? `/api/review-filter/?course_id=${course_id}` : null,
    fetcher
  );
  return {
    filters: data,
    loading: !error && !data,
    error: error,
  };
}
