import CourseList from '@/components/course-list';
import { Card, Input, PageHeader, message } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { history } from 'umi';

const { Search } = Input;

const SearchPage = () => {
  const [keyword, setKeyword] = useState('');
  const [courses, setCourses] = useState({ count: 0, courses: [] });

  const onSearch = (value: string) => {
    if (value.trim() == '') {
      message.info('请输入');
      return;
    }
    axios.get(`/api/search?q=${keyword}`).then((resp) => {
      setCourses({
        count: resp.data.count,
        courses: resp.data.courses,
      });
    });
  };

  return (
    <PageHeader title={'搜索'} onBack={() => history.goBack()}>
      <Search
        size="large"
        placeholder="搜索课程名/课号/教师名"
        onSearch={onSearch}
        onChange={(e) => setKeyword(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Card title={'共有' + courses.count + '门课'}>
        <CourseList courses={courses.courses} />
      </Card>
    </PageHeader>
  );
};

export default SearchPage;
