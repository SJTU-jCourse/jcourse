import { Semester } from './models';
import { getSemesters } from './services/semester';

// src/app.ts
export async function getInitialState() {
  const semesters = await getSemesters();
  const semesterMap = new Map(
    semesters.map((item: Semester) => [item.id, item.name]),
  );
  return { semesters, semesterMap };
}
