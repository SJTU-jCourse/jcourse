import { Semester } from '@/models';
import { request } from '@/services/request';

export async function getSemesters(): Promise<Semester[]> {
  const resp = await request(`/api/semester/`);
  return resp.data;
}
