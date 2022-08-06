import useSWR from "swr";
import {
  CourseDetail,
  CourseInReview,
  CourseListItem,
  CoursesFilterParams,
  Filters,
  Pagination,
  PaginationApiResult,
} from "@/lib/models";
import { fetcher, request } from "@/services/request";

export function useFilters() {
  const { data, error } = useSWR<Filters>("/api/filter/", fetcher);
  return {
    filters: data,
    loading: !error && !data,
    error: error,
  };
}

export async function getCourseList(
  params: string,
  pagination: Pagination
): Promise<PaginationApiResult<CourseListItem>> {
  const resp = await request(
    `/api/course/?${params}&page=${pagination.page}&size=${pagination.pageSize}`
  );
  return resp.data;
}

export function useCourseList(
  params: CoursesFilterParams,
  pagination: Pagination
) {
  let query_params: string = "";
  if (params.categories) query_params += `&categories=${params.categories}`;
  if (params.departments) query_params += `&department=${params.departments}`;
  if (params.onlyhasreviews)
    query_params += `&onlyhasreviews=${params.onlyhasreviews}`;

  const { data, error } = useSWR<PaginationApiResult<CourseListItem>>(
    `/api/course/?${query_params}&page=${pagination.page}&size=${pagination.pageSize}`,
    fetcher
  );
  return {
    courses: data,
    loading: !error && !data,
    error: error,
  };
}

export async function searchCourse(
  keyword: string,
  pagination: Pagination
): Promise<PaginationApiResult<CourseListItem>> {
  const resp = await request(
    `/api/search/?q=${keyword}&page=${pagination.page}&size=${pagination.pageSize}`
  );
  return resp.data;
}

export function useSearchCourse(keyword: string, pagination: Pagination) {
  const { data, error, mutate } = useSWR<PaginationApiResult<CourseListItem>>(
    keyword
      ? `/api/search/?q=${keyword}&page=${pagination.page}&size=${pagination.pageSize}`
      : null,
    fetcher
  );
  return {
    courses: data,
    loading: keyword ? !error && !data : false,
    error: error,
    mutate,
  };
}

export function useCourseDetail(id: string) {
  const { data, error } = useSWR<CourseDetail>(
    id ? `/api/course/${id}/` : null,
    fetcher
  );
  return {
    course: data,
    loading: !error && !data,
    error: error,
  };
}

export async function searchCourseInReview(
  keyword: string | null,
  next: string | null
): Promise<PaginationApiResult<CourseInReview>> {
  if (next) {
    const params = next.split("?").pop();
    const resp = await request(`/api/course-in-review/?${params}`);
    return resp.data;
  }
  const resp = await request(`/api/course-in-review/?q=${keyword}`);
  return resp.data;
}

export async function getCourseInReview(
  course_id: string
): Promise<CourseInReview> {
  const resp = await request(`/api/course-in-review/${course_id}/`);
  return resp.data;
}

export function useCourseInReview(course_id: string) {
  const { data, error } = useSWR<CourseInReview>(
    course_id ? `/api/course-in-review/${course_id}/` : null,
    fetcher
  );
  return {
    course: data,
    loading: !error && !data,
    error: error,
  };
}
