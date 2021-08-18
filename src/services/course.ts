import {
  CourseDetail,
  CourseInReview,
  CourseListItem,
  Filters,
  PaginationApiResult,
} from '@/models';
import { request } from '@/services/request';

export async function getFilters(): Promise<Filters> {
  const resp = await request('/api/filter/');
  return resp.data;
}

export async function getCourseList(
  params: string,
  limit: number,
  offset: number,
): Promise<PaginationApiResult<CourseListItem>> {
  const resp = await request(
    `/api/course/?${params}&limit=${limit}&offset=${offset}`,
  );
  return resp.data;
}

export async function searchCourse(
  keyword: string,
  limit: number,
  offset: number,
): Promise<PaginationApiResult<CourseListItem>> {
  const resp = await request(
    `/api/search/?keyword=${keyword}&limit=${limit}&offset=${offset}`,
  );
  return resp.data;
}

export async function getCourseDetail(id: string): Promise<CourseDetail> {
  const resp = await request(`/api/course/${id}/`);
  return resp.data;
}

export async function getCourseInReview(
  keyword: string,
): Promise<CourseInReview[]> {
  const resp = await request(`/api/course-in-review/?q=${keyword}`);
  return resp.data;
}
