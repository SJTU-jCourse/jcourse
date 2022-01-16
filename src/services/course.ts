import {
  CourseDetail,
  CourseInReview,
  CourseListItem,
  Filters,
  Pagination,
  PaginationApiResult,
} from '@/models';
import { request } from '@/services/request';

export async function getFilters(): Promise<Filters> {
  const resp = await request('/api/filter/');
  return resp.data;
}

export async function getCourseList(
  params: string,
  pagination: Pagination,
): Promise<PaginationApiResult<CourseListItem>> {
  const resp = await request(
    `/api/course/?${params}&page=${pagination.page}&size=${pagination.pageSize}`,
  );
  return resp.data;
}

export async function searchCourse(
  keyword: string,
  pagination: Pagination,
): Promise<PaginationApiResult<CourseListItem>> {
  const resp = await request(
    `/api/search/?q=${keyword}&page=${pagination.page}&size=${pagination.pageSize}`,
  );
  return resp.data;
}

export async function getCourseDetail(id: string): Promise<CourseDetail> {
  const resp = await request(`/api/course/${id}/`);
  return resp.data;
}

export async function searchCourseInReview(
  keyword: string | null,
  next: string | null,
): Promise<PaginationApiResult<CourseInReview>> {
  if (next) {
    const params = next.split('?').pop();
    const resp = await request(`/api/course-in-review/?${params}`);
    return resp.data;
  }
  const resp = await request(`/api/course-in-review/?q=${keyword}`);
  return resp.data;
}

export async function getCourseInReview(
  course_id: string,
): Promise<CourseInReview> {
  const resp = await request(`/api/course-in-review/${course_id}/`);
  return resp.data;
}
