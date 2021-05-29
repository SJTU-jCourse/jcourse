import {
  Select,
  PageHeader,
  Card,
  Rate,
  Space,
  Divider,
  Input,
  Button,
  message,
} from 'antd';
import axios from 'axios';

import { useEffect, useState } from 'react';
import DebounceSelect from '@/components/debounce-select';
import { history } from 'umi';
const { TextArea } = Input;

// Usage of DebounceSelect
interface SelectValue {
  label: string;
  value: string;
}

const EditReview = (props) => {
  const [showCourse, setShowCourse] = useState({
    code: '',
    name: '',
  });
  const [courseId, setCourseId] = useState(0);
  const [semester, setSemester] = useState('');
  const [rating, setRating] = useState(-1);
  const [comment, setComment] = useState('');

  const [courses, setCourses] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [teachers, setTeachers] = useState([]);

  async function fetchCourses(value: string): Promise<SelectValue[]> {
    console.log('fetching courses', value);

    return fetch(`/api/course-lite?q=${value}`)
      .then((response) => response.json())
      .then((body) => {
        console.log(body);
        setCourses(body);
        setShowCourse(body[0]);
        return body.map((course: { code: string; name: string }) => ({
          label: `${course.code} ${course.name}`,
          value: course.code,
        }));
      });
  }

  const handleSubmit = () => {
    if (comment == '') {
      message.info('请填写评论');
      return;
    }
    if (rating == -1) {
      message.info('请打分');
      return;
    }
    let review = { comment, rating, semester, courseId };
    console.log(review);
    axios.post('/api/review', review).then((resp) => {
      console.log(resp.data);
      if (resp.status == 200) {
        message.success('提交成功');
        history.goBack();
      }
    });
  };

  const handleCourseChange = (value) => {
    console.log(value);
  };

  useEffect(() => {
    console.log(props);

    if (props.location.state && props.location.state.course) {
      const params = props.location.state.course;
      setCourses([
        { label: params.code + ' ' + params.name, value: params.code },
      ]);
      setShowCourse(params);
      setTeachers([{ label: params.teacher, value: params.id }]);
      setCourseId(params.id);
    }
  }, []);

  useEffect(() => {
    axios.get('/api/semesters').then((resp) => {
      let items = resp.data;
      setSemesters(items.map((item: string) => ({ label: item, value: item })));
      setSemester(items[0]);
    });
  }, []);

  return (
    <PageHeader title="写点评" onBack={() => history.goBack()}>
      <Card>
        <Space direction="vertical">
          <div>
            课程：
            <DebounceSelect
              showSearch
              placeholder="搜索课程"
              style={{ width: 400 }}
              onChange={handleCourseChange}
              fetchOptions={fetchCourses}
            ></DebounceSelect>
          </div>
          <div>
            教师：
            <Select
              onSelect={(key) => setCourseId(key)}
              placeholder="选择教师"
              value={courseId}
              style={{ width: 400 }}
              options={teachers}
            ></Select>
          </div>
          <div>
            学期：
            <Select
              value={semester}
              placeholder="选择学期"
              style={{ width: 400 }}
              onSelect={(key) => setSemester(key)}
              options={semesters}
            ></Select>
          </div>
        </Space>
        <Divider></Divider>
        详细点评内容：
        <TextArea
          showCount
          rows={10}
          defaultValue={
            '课程内容：\n\n上课自由度：\n\n考核标准：\n\n讲课质量：\n\n'
          }
          onChange={(e) => setComment(e.target.value)}
        />
        <div>
          推荐指数：
          <Rate value={rating} onChange={(e) => setRating(e)} />
        </div>
        <Divider></Divider>
        <Button type="primary" onClick={handleSubmit}>
          提交
        </Button>
      </Card>
    </PageHeader>
  );
};
export default EditReview;
