import CourseList from '@/components/course-list';
import { CourseListItem, PaginationApiResult } from '@/models';
import { Card, Input, PageHeader, message } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { history } from 'umi';

const { Search } = Input;

const SearchPage = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [courses, setCourses] = useState<PaginationApiResult<CourseListItem>>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });

  const onSearch = (value: string) => {
    if (value.trim() == '') {
      message.info('请输入');
      return;
    }
    axios.get(`/api/search/?q=${keyword}`).then((resp) => {
      setCourses(resp.data);
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
        <CourseList courses={courses.results} />
      </Card>
    </PageHeader>
  );
};

export default SearchPage;
