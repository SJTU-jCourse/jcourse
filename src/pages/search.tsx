import CourseList from '@/components/course-list';
import config from '@/config';
import { CourseListItem, Pagination, PaginationApiResult } from '@/models';
import { searchCourse } from '@/services/course';
import { Card, Input, PageHeader, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { Helmet, history } from 'umi';

const { Search } = Input;

const SearchPage = () => {
  const queryString = require('query-string');
  const parsed = queryString.parse(location.search);
  const [keyword, setKeyword] = useState<string>(parsed.q ? parsed.q : '');
  const [courses, setCourses] = useState<PaginationApiResult<CourseListItem>>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [courseLoading, setCourseLoading] = useState<boolean>(false);
  const pagination: Pagination = {
    page: parsed.page ? parseInt(parsed.page) : 1,
    pageSize: parsed.size ? parseInt(parsed.size) : config.PAGE_SIZE,
  };
  const inputRef = useRef<any>(null);

  const fetchCourses = () => {
    if (keyword == '') return;
    setCourseLoading(true);
    searchCourse(keyword, pagination).then((resp) => {
      setCourses(resp);
      setCourseLoading(false);
    });
  };

  useEffect(() => {
    inputRef.current?.focus({ cursor: 'end' });
    fetchCourses();
  }, [history.location.query]);

  const onSearch = (value: string) => {
    if (value.trim() == '') {
      message.info('请输入搜索内容');
      return;
    }
    history.push({
      pathname: history.location.pathname,
      query: { q: keyword },
    });
  };

  const onPageChange = (page: number, pageSize: number) => {
    history.push({
      pathname: history.location.pathname,
      query: { q: keyword, page: page.toString(), size: pageSize.toString() },
    });
  };

  return (
    <PageHeader title={'搜索'} onBack={() => history.goBack()}>
      <Helmet>
        <title>
          {'搜索 ' + (parsed.q ? parsed.q : ' ') + ' - SJTU选课社区'}
        </title>
      </Helmet>
      <Search
        size="large"
        defaultValue={keyword}
        placeholder="搜索课程名/课号/教师姓名/教师姓名拼音"
        onSearch={onSearch}
        ref={inputRef}
        onChange={(e) => setKeyword(e.target.value)}
        style={{ marginBottom: config.LAYOUT_MARGIN }}
      />
      <Card title={'共有' + courses.count + '门课'}>
        <CourseList
          pagination={pagination}
          loading={courseLoading}
          count={courses.count}
          courses={courses.results}
          onPageChange={onPageChange}
          showEnroll={true}
        />
      </Card>
    </PageHeader>
  );
};

export default SearchPage;
