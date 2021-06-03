export interface PaginationApiResult<Type> {
  count: number;
  next: string | null;
  previous: string | null;
  results: Type[];
}

export interface Teacher {
  tid: string | null;
  department: string | null;
  name: string;
  title: string;
}

export interface CourseListItem {
  id: number;
  code: string;
  category: string | null;
  department: string;
  name: string;
  credit: number;
  teacher: string;
  rating: { avg: number; count: number };
}

export interface CourseDetail {
  id: number;
  code: string;
  category: string | null;
  department: string | null;
  name: string;
  credit: number;
  main_teacher: Teacher;
  teacher_group: Teacher[];
  language: string | null;
  rating: { avg: number | null; count: number };
  related_teachers: { id: number; tname: string }[];
  related_courses: { id: number; name: string }[];
}

export interface Filter {
  id: number;
  name: string;
  count: number;
}

export interface Notice {
  title: string;
  message: string;
  created: string;
}

export interface Semester {
  id: number;
  name: string;
}

export interface CourseInReview {
  id: number;
  code: string;
  name: string;
  teacher: string;
}

export interface Review {
  id: number;
  course?: CourseInReview;
  semester: string | null;
  rating: number;
  comment: string;
  created: string;
  approves: number;
  disapproves: number;
  score: number | string;
  moderator_remark: string | null;
}

export interface User {
  id: number;
  username: string;
}

export interface Action {
  review: number;
  action: number;
  approves: number;
  disapproves: number;
}
