export interface PaginationApiResult<Type> {
  count: number;
  next: string | null;
  previous: string | null;
  results: Type[];
}

export interface Teacher {
  tid: string | null;
  name: string;
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
  is_reviewed: number | null;
  semester: number | null;
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
  former_codes: string[];
  moderator_remark: string | null;
  rating: { avg: number | null; count: number };
  related_teachers: {
    id: number;
    tname: string;
    avg: number | null;
    count: number;
  }[];
  related_courses: {
    id: number;
    code: string;
    name: string;
    avg: number | null;
    count: number;
  }[];
  semester: number | null;
  is_reviewed: number | null;
}

export interface Filter {
  id: number;
  name: string;
  count: number;
}

export interface Filters {
  categories: Filter[];
  departments: Filter[];
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
  semester: number | null;
}

export interface ReviewAction {
  id: number;
  action?: number;
  approves: number;
  disapproves: number;
}
export interface Review {
  id: number;
  course?: CourseInReview;
  semester: string | Semester;
  rating: number;
  comment: string;
  created: string;
  modified: string | null;
  actions: { approves: number; disapproves: number; action: number };
  score: number | string;
  moderator_remark: string | null;
  is_mine: boolean;
}

export interface ReviewDraft {
  comment: string;
  rating: number;
  semester: number;
  course: number;
  score: string;
}
export interface User {
  id: number;
  username: string;
  is_staff: boolean;
  account: string | null;
}

export interface UserPointDetailItem {
  value: number;
  description: string | null;
  time: string;
}
export interface UserPoint {
  points: number;
  reviews: number;
  first_reviews: number;
  approves: number;
  first_reviews_approves: number;
  addition: number;
  details: UserPointDetailItem[];
}
export interface Action {
  review: number;
  action: number;
  approves: number;
  disapproves: number;
}

export interface Pagination {
  page: number;
  pageSize: number;
}

export interface StatisticInfo {
  courses: number;
  reviews: number;
  users: number;
}

export interface SelectValue {
  key?: string;
  label: string;
  value: number;
}

export interface Report {
  id: number;
  created: string;
  comment: string;
  reply: string | null;
}
