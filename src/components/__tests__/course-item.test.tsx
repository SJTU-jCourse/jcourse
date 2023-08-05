import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import CourseItem from "@/components/course-item";
import { CommonInfo, CourseListItem } from "@/lib/models";
import { CommonInfoContext } from "@/lib/context";

const getTestCommonInfo = () => {
  const commonInfo = {
    announcements: [],
    semesters: [],
    available_semesters: [],
    user: {
      id: 0,
      username: "",
      is_staff: false,
      account: null,
    },
    semesterMap: new Map(),
    my_reviews: new Map(),
    enrolled_courses: new Map(),
    reviewed_courses: new Map(),
  };
  return commonInfo;
};

describe("course detail card", () => {
  let course: CourseListItem;
  let commonInfo: CommonInfo;
  beforeEach(() => {
    course = {
      id: 12345,
      code: "test001",
      categories: [],
      department: "测试单位",
      name: "测试课程",
      credit: 2,
      teacher: "高女士",
      rating: { count: 0, avg: 0 },
    };
    commonInfo = getTestCommonInfo();
  });
  it("shows minimal info", () => {
    render(
      <CommonInfoContext.Provider value={commonInfo}>
        <CourseItem course={course} showEnroll={false}></CourseItem>
      </CommonInfoContext.Provider>
    );
    expect(
      screen.queryByText("test001 测试课程（高女士）")
    ).toBeInTheDocument();
    expect(
      screen.queryByText("test001 测试课程（高女士）")?.getAttribute("href")
    ).toBe("/course/12345");
    expect(screen.queryByText("2学分 测试单位")).toBeInTheDocument();
    expect(screen.queryByText("暂无点评")).toBeInTheDocument();
    expect(screen.queryByText("学过")).not.toBeInTheDocument();
    expect(screen.queryByText("已点评")).not.toBeInTheDocument();
  });
  it("shows rating", () => {
    course.rating = { count: 10, avg: 1.666 };
    render(
      <CommonInfoContext.Provider value={commonInfo}>
        <CourseItem course={course} showEnroll={false}></CourseItem>
      </CommonInfoContext.Provider>
    );
    expect(screen.queryByText("1.7")).toBeInTheDocument();
    expect(screen.queryByText("10人评价")).toBeInTheDocument();
    expect(screen.queryByText("暂无点评")).not.toBeInTheDocument();
  });
  it("shows enroll tag", () => {
    commonInfo.enrolled_courses.set(course.id, {
      course_id: course.id,
      semester_id: 1,
    });
    render(
      <CommonInfoContext.Provider value={commonInfo}>
        <CourseItem course={course} showEnroll={false}></CourseItem>
      </CommonInfoContext.Provider>
    );
    expect(screen.queryByText("学过")).not.toBeInTheDocument();
    render(
      <CommonInfoContext.Provider value={commonInfo}>
        <CourseItem course={course} showEnroll={true}></CourseItem>
      </CommonInfoContext.Provider>
    );
    expect(screen.queryByText("学过")).toBeInTheDocument();
  });
  it("shows category tags", () => {
    course.categories = ["通识", "通选"];
    render(
      <CommonInfoContext.Provider value={commonInfo}>
        <CourseItem course={course} showEnroll={false}></CourseItem>
      </CommonInfoContext.Provider>
    );
    expect(screen.queryByText("通识")).toBeInTheDocument();
    expect(screen.queryByText("通选")).toBeInTheDocument();
  });
  it("shows category tags", () => {
    course.categories = ["通识", "通选"];
    render(<CourseItem course={course} showEnroll={false}></CourseItem>);
    expect(screen.queryByText("通识")).toBeInTheDocument();
    expect(screen.queryByText("通选")).toBeInTheDocument();
  });
  it("shows review tags", () => {
    commonInfo.reviewed_courses.set(course.id, {
      course_id: course.id,
      semester_id: 1,
      id: 12345,
    });
    render(
      <CommonInfoContext.Provider value={commonInfo}>
        <CourseItem course={course} showEnroll={false}></CourseItem>
      </CommonInfoContext.Provider>
    );
    expect(screen.queryByText("已点评")).toBeInTheDocument();
  });
});
