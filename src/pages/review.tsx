import { CourseInReview, Semester } from '@/models';
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
  Typography,
  message,
} from 'antd';
import axios from 'axios';
import { debounce } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, history } from 'umi';

const { TextArea } = Input;
const { Text, Paragraph } = Typography;
interface SelectValue {
  key?: string;
  label: string;
  value: string | number;
}

const ReviewPage = (props: {
  location: { state: { course: CourseInReview } };
}) => {
  const [course, setCourse] = useState<SelectValue>();
  const [semester, setSemester] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [score, setScore] = useState<string>('');

  const [semesters, setSemesters] = useState<SelectValue[]>([]);

  const handleSubmit = () => {
    if (!course) {
      message.info('请选择课程');
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
    const review = { comment, rating, semester, course: course.value, score };
    axios
      .post('/api/review/', review)
      .then((resp) => {
        if (resp.status == 201) {
          message.success('提交成功');
          history.goBack();
        }
      })
      .catch((error) => {
        if (error.response.status == 400 && error.response.data) {
          message.error(error.response.data.error);
        }
      });
  };

  useEffect(() => {
    if (props.location.state && props.location.state.course) {
      const course = props.location.state.course;
      const option = {
        label: `${course.code} ${course.name} ${course.teacher}`,
        value: course.id,
      };
      setCourses([option]);
      setCourse(option);
    }
  }, []);

  useEffect(() => {
    axios.get('/api/semester/').then((resp) => {
      let items = resp.data;
      setSemesters(
        items.map((item: Semester) => ({ label: item.name, value: item.id })),
      );
    });
  }, []);

  const [fetching, setFetching] = useState(false);
  const [courses, setCourses] = useState<SelectValue[]>([]);
  const fetchRef = useRef(0);

  const debounceTimeout = 800;
  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setCourses([]);
      setFetching(true);

      axios.get(`/api/course-in-review/?q=${value}`).then((resp) => {
        const options = resp.data.map((course: CourseInReview) => ({
          label: `${course.code} ${course.name}（${course.teacher}）`,
          value: course.id,
        }));
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }
        setCourses(options);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout]);

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
              onChange={(value) => {
                setCourse(value);
              }}
              value={course}
              options={courses}
              labelInValue={true}
            />
            <Text type="secondary">
              同一门课授课教师较多的时候（公共课、专业基础课等）推荐搜索教师。
            </Text>
          </div>
          <div>
            您上这门课的学期
            <Select
              placeholder="选择学期"
              style={{ width: '100%' }}
              onSelect={(key) => setSemester(key)}
              options={semesters}
            ></Select>
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
              placeholder="分数或等级"
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
                <Link to="/faq">相关立场</Link>。
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
