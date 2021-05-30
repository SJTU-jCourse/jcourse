export interface CourseInfo {
  code: string;
  category: string;
  department: string;
  name: string;
  credit: number;
}

export interface Teacher {
  tid: string;
  department: string;
  name: string;
  title: string;
}

export interface CourseListItem {
  id: number;
  course_info: CourseInfo;
  main_teacher: Teacher;
  language: string;
  rating: { avg: number; count: number };
}

export interface CourseDetail {
  id: number;
  course_info: CourseInfo;
  main_teacher: Teacher;
  teacher_group: Teacher[];
  language: string;
  rating: { avg: number | null; count: number };
  related_teachers: { id: number; name: string }[];
  related_courses: { id: number; name: string }[];
}
