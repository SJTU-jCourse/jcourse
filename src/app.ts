import { Semester } from './models';
import { getSemesters } from './services/semester';
import { getUser } from './services/user';

// src/app.ts
export async function getInitialState() {
  const [semesters, user] = await Promise.all([getSemesters(), getUser()]);
  const semesterMap = new Map(
    semesters.map((item: Semester) => [item.id, item.name]),
  );
  return { semesters, user, semesterMap };
}
