import config from '@/config';
import { CourseInReview, ReviewDraft, Semester } from '@/models';
import { getCourseInReview } from '@/services/course';
import { writeReview } from '@/services/review';
import { getSemesters } from '@/services/semester';
import {
  Button,
  Card,
  Form,
  Input,
  PageHeader,
  Rate,
  Select,
  Spin,
  Tag,
  Typography,
  message,
} from 'antd';
import { debounce } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, history } from 'umi';

const { TextArea } = Input;
const { Text } = Typography;

const ReviewPage = (props: {
  location: { state: { course: CourseInReview } };
}) => {
  const [form] = Form.useForm();
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [enrollSemester, setEnrollSemester] = useState<number>(0);
  const state_course = props.location.state?.course;
  const [fetching, setFetching] = useState(false);
  const [courses, setCourses] = useState<CourseInReview[]>([]);

  const handleSubmit = (review: ReviewDraft) => {
    writeReview(review)
      .then((resp) => {
        if (resp.status == 201) {
          message.success('提交成功，即将回到上一页', 1, () =>
            history.goBack(),
          );
        }
      })
      .catch((error) => {
        if (error.response.status == 400 && error.response.data) {
          message.error(error.response.data.error);
        }
      });
  };

  useEffect(() => {
    if (state_course) {
      setCourses([state_course]);
      form.setFieldsValue({ course: state_course.id });
    }
  }, []);

  useEffect(() => {
    getSemesters().then((semesters) => {
      setSemesters(semesters);
      if (state_course?.semester) {
        form.setFieldsValue({ semester: state_course.semester.id });
        setEnrollSemester(state_course.semester.id);
      }
    });
  }, []);

  const fetchRef = useRef(0);

  const debounceTimeout = 800;
  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setFetching(true);

      getCourseInReview(value).then((courses) => {
        setCourses(courses);
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout]);

  const onCourseSelectChange = (selected_course: number) => {
    for (const course of courses) {
      if (course.id == selected_course && course.semester) {
        setEnrollSemester(course.semester.id);
        form.setFieldsValue({ semester: course.semester.id });
        return;
      }
    }
    setEnrollSemester(0);
  };

  return (
    <PageHeader title="写点评" onBack={() => history.goBack()}>
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
            rules={[{ required: true, message: '请选择需要点评的课程' }]}
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
            >
              {courses.map((course) => (
                <Select.Option key={course.id} value={course.id}>
                  {course.semester && (
                    <Tag color={config.TAG_COLOR_ENROLL}>学过</Tag>
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
            dependencies={['course']}
            rules={[{ required: true, message: '请选择上这门课的学期' }]}
            help={
              <Text type="secondary">
                2021-2022 代表 2021-2022 学年度（2021.9-2022.8）。
                1代表秋季学期，2代表春季学期，3代表夏季学期/小学期。
              </Text>
            }
          >
            <Select placeholder="选择学期">
              {semesters.map((semester) => (
                <Select.Option
                  key={semester.id}
                  value={semester.id}
                  label={semester.name}
                >
                  <div>
                    {enrollSemester == semester.id && (
                      <Tag color={config.TAG_COLOR_ENROLL}>学过</Tag>
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
                  return trimed != '' &&
                    trimed != '课程内容：\n上课自由度：\n考核标准：\n讲课质量：'
                    ? Promise.resolve()
                    : Promise.reject();
                },
              },
            ]}
            initialValue={'课程内容：\n上课自由度：\n考核标准：\n讲课质量：\n'}
            help={
              <Text type="secondary">
                欢迎畅所欲言。点评模板可以按需修改或删除。
                <br />
                理想的点评应当富有事实且对课程有全面的描述。比如课讲得好但是考核很严格，或者作业奇葩但给分很高。
                二者都说出来更有利于同学们做出全面的选择和判断。
              </Text>
            }
          >
            <TextArea autoSize={{ minRows: 8 }} maxLength={817} />
          </Form.Item>
          <Form.Item
            name="rating"
            label="推荐指数"
            rules={[
              {
                required: true,
                message: '请选择推荐指数',
                validator: (_, value) => {
                  return value >= 1 && value <= 5
                    ? Promise.resolve()
                    : Promise.reject();
                },
              },
            ]}
          >
            <Rate />
          </Form.Item>
          <Form.Item name="score" label="成绩" rules={[{ required: false }]}>
            <Input placeholder="分数或等级，中期退课填W" maxLength={10} />
          </Form.Item>
          <Form.Item
            help={
              <Text type="secondary">
                提交点评表示您同意授权本网站使用点评的内容，并且了解本站的
                <Link target="_blank" to="/faq">
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
    </PageHeader>
  );
};
export default ReviewPage;
