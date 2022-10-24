export type PaginationApiResult<Type> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Type[];
};

export type Teacher = {
  tid: string | null;
  name: string;
};

export type CourseListItem = {
  id: number;
  code: string;
  categories: string[];
  department: string;
  name: string;
  credit: number;
  teacher: string;
  rating: { avg: number; count: number };
  is_reviewed: number | null;
  semester: number | null;
};

export type CourseDetail = {
  id: number;
  code: string;
  categories: string[];
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
};

export type Filter = {
  id: number;
  name: string;
  count: number;
};

export type Filters = {
  categories: Filter[];
  departments: Filter[];
};
export type Announcement = {
  title: string;
  message: string;
  created: string;
  url: string | null;
};

export type Semester = {
  id: number;
  name: string;
  available: boolean;
};

export type CourseInReview = {
  id: number;
  code: string;
  name: string;
  teacher: string;
  semester: number | null;
};

export type ReviewAction = {
  id: number;
  action?: number;
  approves: number;
  disapproves: number;
};
export type Review = {
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
};

export type ReviewDraft = {
  comment: string;
  rating: number;
  semester: number;
  course: number;
  score: string;
};
export type User = {
  id: number;
  username: string;
  is_staff: boolean;
  account: string | null;
};

export type UserPointDetailItem = {
  value: number;
  description: string | null;
  time: string;
};
export type UserPoint = {
  points: number;
  reviews: number;
  first_reviews: number;
  approves: number;
  first_reviews_approves: number;
  addition: number;
  details: UserPointDetailItem[];
};
export type Action = {
  review: number;
  action: number;
  approves: number;
  disapproves: number;
};

export type Pagination = {
  page: number;
  pageSize: number;
};

export type StatisticDateCount = {
  date: string;
  count: number;
};

export type StatisticInfo = {
  courses: number;
  reviews: number;
  users: number;
  courses_with_review: number;
  user_join: StatisticDateCount[];
  review_create: StatisticDateCount[];
};

export type SelectValue = {
  key?: string;
  label: string;
  value: number;
};

export type Report = {
  id: number;
  created: string;
  comment: string;
  reply: string | null;
};

export type CoursesFilterParams = {
  categories?: string;
  departments?: string;
  onlyhasreviews?: string;
};

export type EmailLoginRequest = {
  email: string;
  code: string;
};

export type LoginResponse = {
  account: string;
};
