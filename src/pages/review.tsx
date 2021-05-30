import { CourseInReview } from '@/models/review';
import {
  Button,
  Card,
  Divider,
  Input,
  PageHeader,
  Rate,
  Select,
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
  const [semester, setSemester] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [score, setScore] = useState<string>('');

  const [semesters, setSemesters] = useState<SelectValue[]>([]);

  async function fetchCourses(value: string): Promise<SelectValue[]> {
    console.log('fetching courses', value);

    return fetch(`/api/course-lite?q=${value}`)
      .then((response) => response.json())
      .then((body) => {
        console.log(body);
        return body.map((course: CourseInReview) => ({
          label: `${course.code} ${course.name} ${course.teacher}`,
          value: course.id,
        }));
      });
  }

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
    const review = { comment, rating, semester, id: course.value, score };
    console.log(review);
    axios.post('/api/review', review).then((resp) => {
      console.log(resp.data);
      if (resp.status == 200) {
        message.success('提交成功');
        history.goBack();
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
    axios.get('/api/semesters').then((resp) => {
      let items = resp.data;
      setSemesters(items.map((item: string) => ({ label: item, value: item })));
      setSemester(items[0]);
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

      fetchCourses(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setCourses(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchCourses, debounceTimeout]);

  return (
    <PageHeader title="写点评" onBack={() => history.goBack()}>
      <Card>
        <div>
          课程
          <Select
            showSearch
            placeholder="搜索课程"
            style={{ width: '100%' }}
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            onChange={(value) => {
              console.log(value);
              setCourse(value);
            }}
            value={course}
            options={courses}
            labelInValue={true}
          />
        </div>
        <div>
          学期
          <Select
            value={semester}
            placeholder="选择学期"
            style={{ width: '100%' }}
            onSelect={(key) => setSemester(key)}
            options={semesters}
          ></Select>
        </div>

        <Divider></Divider>
        <div>
          详细点评内容
          <TextArea
            showCount
            rows={10}
            defaultValue={
              '课程内容：\n\n上课自由度：\n\n考核标准：\n\n讲课质量：\n\n'
            }
            onChange={(e) => setComment(e.target.value)}
          />
          <Paragraph>
            <Text type="secondary">
              可以在这里畅所欲言！推荐介绍/吐槽的内容在文本框里填充了，
              可以视情况删除/修改，提供给大家为了方便。
              <br /> 一个理想的点评应当 (1) 富有事实；(2)
              对课程有全面的描述。比如课讲得好，但是考试十分虐，
              二者都说出来更有利于同学们做出全面的选择和判断。
              学弟学妹（和挣扎的学长学姐）感谢你们。
            </Text>
          </Paragraph>
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
            placeholder="可选"
            onChange={(e) => setScore(e.target.value)}
          />
        </div>
        <Divider></Divider>
        <Paragraph>
          <Text type="secondary">
            提交点评表示您同意授权本网站使用点评的内容，并且了解本站其他的
            <Link to="/faq">相关立场</Link>。
          </Text>
        </Paragraph>
        <Button type="primary" onClick={handleSubmit}>
          提交
        </Button>
      </Card>
    </PageHeader>
  );
};
export default ReviewPage;
