export interface CourseInReview {
  id: number;
  code: string;
  name: string;
  teacher: string;
}

export interface LatestReview {
  id: number;
  course: CourseInReview;
  semester: string;
  rating: number;
  comment: string;
  created: string;
  approves: number;
  disapproves: number;
}


export interface ReviewInCourse {
  id: number;
  semester: string;
  rating: number;
  comment: string;
  created: string;
  approves: number;
  disapproves: number;
}
