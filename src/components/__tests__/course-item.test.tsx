import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CourseListItem } from "@/lib/models";
import CourseItem from "../course-item";

describe("course detail card", () => {
  let course: CourseListItem;
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
      is_reviewed: null,
      semester: null,
    };
  });
  it("shows minimal info", () => {
    render(<CourseItem course={course} showEnroll={false}></CourseItem>);
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
    render(<CourseItem course={course} showEnroll={false}></CourseItem>);
    expect(screen.queryByText("1.7")).toBeInTheDocument();
    expect(screen.queryByText("10人评价")).toBeInTheDocument();
    expect(screen.queryByText("暂无点评")).not.toBeInTheDocument();
  });
  it("shows enroll tag", () => {
    course.semester = 1;
    render(<CourseItem course={course} showEnroll={false}></CourseItem>);
    expect(screen.queryByText("学过")).not.toBeInTheDocument();
    render(<CourseItem course={course} showEnroll={true}></CourseItem>);
    expect(screen.queryByText("学过")).toBeInTheDocument();
  });
  it("shows category tags", () => {
    course.categories = ["通识", "通选"];
    render(<CourseItem course={course} showEnroll={false}></CourseItem>);
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
    course.is_reviewed = 1234;
    render(<CourseItem course={course} showEnroll={false}></CourseItem>);
    expect(screen.queryByText("已点评")).toBeInTheDocument();
  });
});
