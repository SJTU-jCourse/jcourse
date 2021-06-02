import CourseList from '@/components/course-list';
import config from '@/config';
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
  const [courseLoading, setCourseLoading] = useState<boolean>(false);

  const fetchCourses = (limit: number, offset: number) => {
    setCourseLoading(true);
    axios
      .get(`/api/search/?q=${keyword}&limit=${limit}&offset=${offset}`)
      .then((resp) => {
        setCourses(resp.data);
        setCourseLoading(false);
      });
  };
  const onSearch = (value: string) => {
    if (value.trim() == '') {
      message.info('请输入');
      return;
    }
    fetchCourses(config.PAGE_SIZE, 0);
  };
  const onPageChange = (page: number, pageSize: number) => {
    fetchCourses(pageSize, (page - 1) * pageSize);
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
        <CourseList
          loading={courseLoading}
          count={courses.count}
          courses={courses.results}
          onPageChange={onPageChange}
        />
      </Card>
    </PageHeader>
  );
};

export default SearchPage;
