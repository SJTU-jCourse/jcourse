import { useDebounceFn } from "ahooks";
import {
  Button,
  Card,
  Form,
  Input,
  Rate,
  Select,
  Spin,
  Tag,
  Typography,
  message,
} from "antd";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import MDEditor from "@/components/md-editor";
import PageHeader from "@/components/page-header";
import Config from "@/config/config";
import { CourseInReview, Review, ReviewDraft, Semester } from "@/lib/models";
import { getCourseInReview, searchCourseInReview } from "@/services/course";
import { getReview, modifyReview, writeReview } from "@/services/review";
import { useSemesters } from "@/services/semester";
import { useUser } from "@/services/user";

const { Text } = Typography;
const ReviewTemplate: string =
  "课程内容：\n\n上课自由度：\n\n考核标准：\n\n授课质量：";

const WriteReviewPage = () => {
  const { user } = useUser();
  const { availableSemesters } = useSemesters();
  const router = useRouter();
  const { course_id, review_id } = router.query;
  const [form] = Form.useForm();

  const [enrollSemester, setEnrollSemester] = useState<number>(0);
  const [fetching, setFetching] = useState(false);
  const [courses, setCourses] = useState<CourseInReview[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const handleSubmit = (review: ReviewDraft) => {
    if (review_id) {
      modifyReview(review_id as string, review)
        .then((resp) => {
          if (resp.status == 200) {
            message.success("修改成功，即将回到上一页", 1, () =>
              history.back()
            );
          }
        })
        .catch((error) => {
          if (error.response.status == 400 && error.response.data) {
            message.error(error.response.data.error);
          }
          if (error.response.status == 403 && error.response.data.detail) {
            message.error(error.response.data.detail);
          }
        });
    } else {
      writeReview(review)
        .then((resp) => {
          if (resp.status == 201) {
            message.success("提交成功，即将回到上一页", 1, () =>
              history.back()
            );
          }
        })
        .catch((error) => {
          if (error.response.status == 400 && error.response.data) {
            message.error(error.response.data.error);
          }
          if (error.response.status == 403 && error.response.data.detail) {
            message.error(error.response.data.detail);
          }
        });
    }
  };

  useEffect(() => {
    if (course_id) {
      getCourseInReview(course_id as string).then((course: CourseInReview) => {
        setCourses([course]);
        form.setFieldsValue({
          course: parseInt(course_id as string),
          semester: course.semester,
        });
        setEnrollSemester(course.semester ? course.semester : 0);
      });
    } else if (review_id) {
      getReview(review_id as string).then((review: Review) => {
        if (review.is_mine == false && user?.is_staff == false) {
          message.error("只能修改自己的点评！", 1, () => history.back());
          return;
        }
        const course: CourseInReview = review.course!;
        const semester = review.semester as Semester;
        setCourses([course]);
        setEnrollSemester(course.semester ? course.semester : 0);
        form.setFieldsValue({
          course: course.id,
          semester: semester.id,
          comment: review.comment,
          rating: review.rating,
          score: review.score,
        });
      });
    }
  }, [router.query]);

  const { run: debounceFetcher } = useDebounceFn(
    (value: string) => {
      setFetching(true);
      searchCourseInReview(value, null).then((courses) => {
        setNextPage(courses.next);
        setCourses(courses.results);
        setFetching(false);
      });
    },
    {
      wait: 800,
    }
  );

  const loadMore = () => {
    if (nextPage == null) return;
    setLoadingMore(true);
    searchCourseInReview(null, nextPage).then((new_courses) => {
      setNextPage(new_courses.next);
      setCourses(courses.concat(new_courses.results));
      setLoadingMore(false);
    });
  };

  const onCourseSelectChange = (selected_course: number) => {
    for (const course of courses) {
      if (course.id == selected_course && course.semester) {
        setEnrollSemester(course.semester);
        form.setFieldsValue({ semester: course.semester });
        return;
      }
    }
    setEnrollSemester(0);
  };

  const onPopupScroll = (e: { target?: any }) => {
    const { target } = e;
    if (target.scrollTop + target.offsetHeight >= target.scrollHeight) {
      loadMore();
    }
  };

  return (
    <>
      <PageHeader title="写点评" onBack={() => history.back()}></PageHeader>
      <Head>
        <title>写点评 - SJTU选课社区</title>
      </Head>
      <Card>
        <Form
          form={form}
          layout="vertical"
          requiredMark="optional"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="course"
            label="课程"
            rules={[{ required: true, message: "请选择需要点评的课程" }]}
            help={
              <Text type="secondary">
                同一门课授课教师较多的时候（公共课、专业基础课等）推荐搜索教师。
              </Text>
            }
          >
            <Select
              showSearch
              placeholder="搜索课程/课号/教师姓名/教师姓名拼音"
              filterOption={false}
              onSearch={debounceFetcher}
              notFoundContent={fetching ? <Spin size="small" /> : null}
              onChange={onCourseSelectChange}
              onPopupScroll={onPopupScroll}
              dropdownRender={(menu) => (
                <>
                  {menu}
                  {loadingMore ? (
                    <div className="review-course-spinning">
                      <Spin size="small" />
                    </div>
                  ) : null}
                </>
              )}
            >
              {courses.map((course) => (
                <Select.Option key={course.id} value={course.id}>
                  {course.semester && (
                    <Tag color={Config.TAG_COLOR_ENROLL}>学过</Tag>
                  )}
                  <span>
                    {course.code} {course.name} {course.teacher}
                  </span>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="semester"
            label="上这门课的学期"
            dependencies={["course"]}
            rules={[{ required: true, message: "请选择上这门课的学期" }]}
            help={
              <Text type="secondary">
                2021-2022 代表 2021-2022 学年度（2021.9-2022.8）。
                1代表秋季学期，2代表春季学期，3代表夏季学期/小学期。
              </Text>
            }
          >
            <Select placeholder="选择学期">
              {availableSemesters?.map((semester) => (
                <Select.Option
                  key={semester.id}
                  value={semester.id}
                  label={semester.name}
                >
                  <div>
                    {enrollSemester == semester.id && (
                      <Tag color={Config.TAG_COLOR_ENROLL}>学过</Tag>
                    )}
                    <span>{semester.name}</span>
                  </div>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="comment"
            label="详细点评"
            rules={[
              {
                required: true,
                validator: (_, value: string) => {
                  const trimed = value.trim();
                  return trimed != "" && trimed != ReviewTemplate
                    ? Promise.resolve()
                    : Promise.reject();
                },
              },
            ]}
            initialValue={ReviewTemplate}
            help={
              <Text type="secondary">
                欢迎畅所欲言。点评模板可以按需修改或删除。编辑框支持 Markdown
                语法。
                <br />
                理想的点评应当富有事实且对课程有全面的描述。比如课讲得好但是考核很严格，或者作业奇葩但给分很高。
                二者都说出来更有利于同学们做出全面的选择和判断。
                <br />
                避免滥用缩写、梗等让其他读者难以理解的表达方式和内容。
              </Text>
            }
          >
            <MDEditor />
          </Form.Item>
          <Form.Item
            name="rating"
            label="推荐指数"
            rules={[
              {
                required: true,
                message: "请选择推荐指数",
                validator: (_, value) => {
                  return value >= 1 && value <= 5
                    ? Promise.resolve()
                    : Promise.reject();
                },
              },
            ]}
          >
            <Rate
              tooltips={["非常不推荐", "不推荐", "中立", "推荐", "非常推荐"]}
            />
          </Form.Item>
          <Form.Item name="score" label="成绩" rules={[{ required: false }]}>
            <Input placeholder="分数或等级，中期退课填W" maxLength={10} />
          </Form.Item>
          <Form.Item
            help={
              <Text type="secondary">
                提交点评表示您同意授权本网站使用点评的内容，并且了解本站的
                <Link target="_blank" href="/faq">
                  相关立场
                </Link>
                。
              </Text>
            }
          >
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};
export default WriteReviewPage;
