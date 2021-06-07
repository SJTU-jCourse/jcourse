import CourseList from '@/components/course-list';
import config from '@/config';
import { CourseListItem, Pagination, PaginationApiResult } from '@/models';
import { Card, Input, PageHeader, message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
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
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    pageSize: config.PAGE_SIZE,
  });
  const fetchCourses = () => {
    const limit = pagination.pageSize;
    const offset = (pagination.page - 1) * pagination.pageSize;
    setCourseLoading(true);
    axios
      .get(`/api/search/?q=${keyword}&limit=${limit}&offset=${offset}`)
      .then((resp) => {
        setCourses(resp.data);
        setCourseLoading(false);
      });
  };

  useEffect(() => {
    fetchCourses();
  }, [pagination]);

  const onSearch = (value: string) => {
    if (value.trim() == '') {
      message.info('请输入搜索内容');
      return;
    }
    setPagination({ page: 1, pageSize: config.PAGE_SIZE });
  };

  const onPageChange = (page: number, pageSize: number) => {
    setPagination({ page, pageSize });
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
          pagination={pagination}
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
