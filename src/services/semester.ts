import { Semester } from '@/models';
import { request } from '@/services/request';

export async function getSemesters(): Promise<Semester[]> {
  return await request(`/api/semester/`);
}
