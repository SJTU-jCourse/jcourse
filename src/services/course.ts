import {
  CourseDetail,
  CourseInReview,
  CourseListItem,
  Filters,
  PaginationApiResult,
} from '@/models';
import { request } from '@/services/request';

export async function getFilters(): Promise<Filters> {
  return await request('/api/filter/');
}

export async function getCourseList(
  params: string,
  limit: number,
  offset: number,
): Promise<PaginationApiResult<CourseListItem>> {
  return await request(
    `/api/course/?${params}&limit=${limit}&offset=${offset}`,
  );
}

export async function searchCourse(
  keyword: string,
  limit: number,
  offset: number,
): Promise<PaginationApiResult<CourseListItem>> {
  return await request(
    `/api/search/?keyword=${keyword}&limit=${limit}&offset=${offset}`,
  );
}

export async function getCourseDetail(id: string): Promise<CourseDetail> {
  return await request(`/api/course/${id}/`);
}

export async function getCourseInReview(
  keyword: string,
): Promise<CourseInReview[]> {
  return await request(`/api/course-in-review/?q=${keyword}`);
}
