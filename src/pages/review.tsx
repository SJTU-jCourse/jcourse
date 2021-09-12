import config from '@/config';
import { CourseInReview, ReviewDraft, SelectValue, Semester } from '@/models';
import { getCourseInReview } from '@/services/course';
import { writeReview } from '@/services/review';
import { getSemesters } from '@/services/semester';
import {
  Button,
  Card,
  Divider,
  Input,
  PageHeader,
  Rate,
  Select,
  Space,
  Spin,
  Tag,
  Typography,
  message,
} from 'antd';
import { debounce } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, history } from 'umi';

const { TextArea } = Input;
const { Text, Paragraph } = Typography;

const ReviewPage = (props: {
  location: { state: { course: CourseInReview } };
}) => {
  const [courseSelected, setCourseSelected] = useState<number>();
  const [semesterSelected, setSemesterSelected] = useState<number>();
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [score, setScore] = useState<string>('');
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [enrollSemester, setEnrollSemester] = useState<number>(0);
  const state_course = props.location.state?.course;
  const [fetching, setFetching] = useState(false);
  const [courses, setCourses] = useState<CourseInReview[]>([]);

  const handleSubmit = () => {
    if (!courseSelected) {
      message.info('请选择课程');
      return;
    }
    if (!semesterSelected) {
      message.info('请选择学期');
      return;
    }
    if (comment == '') {
      message.info('请填写评论');
      return;
    }
    if (rating == 0) {
      message.info('请打分');
      return;
    }
    const review: ReviewDraft = {
      comment,
      rating,
      semester: semesterSelected,
      course: courseSelected,
      score,
    };
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
      setCourseSelected(state_course.id);
    }
  }, []);

  useEffect(() => {
    getSemesters().then((semesters) => {
      setSemesters(semesters);
      if (state_course?.semester) {
        setSemesterSelected(state_course.semester.id);
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
    setCourseSelected(selected_course);
    for (const course of courses) {
      if (course.id == selected_course && course.semester) {
        setEnrollSemester(course.semester.id);
        setSemesterSelected(course.semester.id);
        return;
      }
    }
    setEnrollSemester(0);
  };

  return (
    <PageHeader title="写点评" onBack={() => history.goBack()}>
      <Card>
        <Space direction="vertical" size={8}>
          <div>
            课程
            <Select
              showSearch
              placeholder="搜索课程/课号/教师姓名/教师姓名拼音"
              style={{ width: '100%' }}
              filterOption={false}
              onSearch={debounceFetcher}
              notFoundContent={fetching ? <Spin size="small" /> : null}
              onChange={onCourseSelectChange}
              value={courseSelected}
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
            <Text type="secondary">
              同一门课授课教师较多的时候（公共课、专业基础课等）推荐搜索教师。
            </Text>
          </div>
          <div>
            您上这门课的学期
            <Select
              placeholder="选择学期"
              style={{ width: '100%' }}
              value={semesterSelected}
              onSelect={(key) => setSemesterSelected(key as number)}
            >
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
            <Text type="secondary">
              2020-2021 代表 2020-2021 学年度（2020.9-2021.8）。
              1代表秋季学期，2代表春季学期，3代表夏季学期/小学期。
            </Text>
          </div>

          <Divider></Divider>
          <div>
            详细点评内容
            <TextArea
              showCount
              rows={10}
              maxLength={817}
              defaultValue={
                '课程内容：\n上课自由度：\n考核标准：\n讲课质量：\n'
              }
              onChange={(e) => setComment(e.target.value)}
            />
            <Text type="secondary">
              可以在这里畅所欲言！推荐点评的内容在文本框里填充了，可以视情况删除/修改，提供给大家为了方便。
              <br />{' '}
              一个理想的点评应当：（1）富有事实；（2）对课程有全面的描述。比如课讲得好但是考核很严格，或者作业奇葩但给分很高。
              二者都说出来更有利于同学们做出全面的选择和判断。
              学弟学妹（和学长学姐）感谢你们。
            </Text>
          </div>
          <div>
            <div>推荐指数</div>
            <Rate value={rating} onChange={(e) => setRating(e)} />
          </div>
          <Divider></Divider>
          <div>
            成绩
            <Input
              style={{ width: '100%' }}
              placeholder="分数或等级，中期退课填W"
              maxLength={10}
              onChange={(e) => setScore(e.target.value)}
            />
            <Text type="secondary">可选</Text>
          </div>
          <Divider></Divider>
          <div>
            <Paragraph>
              <Text type="secondary">
                提交点评表示您同意授权本网站使用点评的内容，并且了解本站的
                <Link target="_blank" to="/faq">
                  相关立场
                </Link>
                。
              </Text>
            </Paragraph>
            <Button type="primary" onClick={handleSubmit}>
              提交
            </Button>
          </div>
        </Space>
      </Card>
    </PageHeader>
  );
};
export default ReviewPage;
