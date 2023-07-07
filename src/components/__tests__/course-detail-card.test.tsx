import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CourseDetailCard from "@/components/course-detail-card";
import { CourseDetail } from "@/lib/models";

describe("course detail card", () => {
  let course: CourseDetail;
  beforeEach(() => {
    course = {
      id: 1,
      code: "test001",
      categories: [],
      department: "测试单位",
      name: "测试课程",
      credit: 6,
      main_teacher: {
        tid: "TA001",
        name: "高女士",
      },
      teacher_group: [
        {
          tid: "TA001",
          name: "高女士",
        },
      ],
      rating: { avg: 0, count: 0 },
      moderator_remark: null,
      related_teachers: [],
      related_courses: [],
      semester: null,
      is_reviewed: null,
      notification_level: null,
    };
  });

  it("shows nothing to undefined course", () => {
    render(<CourseDetailCard />);
    expect(screen.getByText("课程信息")).toBeInTheDocument();
  });

  it("shows loading", () => {
    render(<CourseDetailCard loading={true} />);
    expect(screen.queryByText("课号")).not.toBeInTheDocument();
  });

  it("shows course necessary fields", () => {
    render(<CourseDetailCard course={course} loading={false} />);
    expect(screen.getByText("课号")).toBeInTheDocument();
    expect(screen.getByText("课程学分")).toBeInTheDocument();
    expect(screen.getByText("开课单位")).toBeInTheDocument();
    expect(screen.queryByText("课程类别")).not.toBeInTheDocument();
    expect(screen.queryByText("合上教师")).not.toBeInTheDocument();
    expect(screen.getByText("信息有误？")).toBeInTheDocument();
    expect(screen.queryByText("推荐指数")).not.toBeInTheDocument();
    expect(screen.queryByText("通知级别")).toBeInTheDocument();
    expect(screen.queryByText("正常")).toBeInTheDocument();
  });

  it("shows all fields", () => {
    course.teacher_group = [
      {
        tid: "TA001",
        name: "高女士",
      },
      {
        tid: "TA002",
        name: "梁女士",
      },
    ];
    course.semester = 1;
    course.moderator_remark = "remark";
    course.rating = { avg: 1.567, count: 20 };
    course.categories = ["通识", "通选"];
    course.notification_level = 1;
    const semesterMap = new Map<number, string>();
    semesterMap.set(1, "2020-2021-1");
    render(
      <CourseDetailCard
        course={course}
        loading={false}
        semesterMap={semesterMap}
      />
    );

    expect(screen.queryByText("课程类别")).toBeInTheDocument();
    expect(screen.queryByText("通识，通选")).toBeInTheDocument();
    expect(screen.queryByText("曾用课号")).toBeInTheDocument();
    expect(screen.queryByText("TEST002，TEST003")).toBeInTheDocument();
    expect(screen.queryByText("合上教师")).toBeInTheDocument();
    expect(screen.queryByText("高女士，梁女士")).toBeInTheDocument();
    expect(screen.queryByText("推荐指数")).toBeInTheDocument();
    expect(screen.queryByText("1.6")).toBeInTheDocument();
    expect(screen.queryByText("（20人评价）")).toBeInTheDocument();
    expect(screen.queryByText("备注")).toBeInTheDocument();
    expect(screen.queryByText("remark")).toBeInTheDocument();
    expect(screen.queryByText("学过学期")).toBeInTheDocument();
    expect(screen.queryByText("2020-2021-1")).toBeInTheDocument();
    expect(screen.queryByText("关注")).toBeInTheDocument();
  });

  it("shows modal when clicks button", async () => {
    render(<CourseDetailCard course={course} loading={false} />);
    const correctButton = screen.getByText("信息有误？");
    await userEvent.click(correctButton);
    expect(screen.queryByText("课程信息反馈")).toBeInTheDocument();
  });
});
