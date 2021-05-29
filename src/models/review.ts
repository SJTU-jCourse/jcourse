export interface CourseInReview {
  id: number;
  code: string;
  name: string;
  teacher: string;
}

export interface Review {
  id: number;
  course: CourseInReview;
  semester: string;
  rating: number;
  comment: string;
  created: string;
  approves: number;
  disapproves: number;
  score: number | string;
}
