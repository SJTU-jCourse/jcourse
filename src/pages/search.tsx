import CourseList from '@/components/course-list';
import config from '@/config';
import { CourseListItem, Pagination, PaginationApiResult } from '@/models';
import { searchCourse } from '@/services/course';
import useUrlState from '@ahooksjs/use-url-state';
import { useRequest } from 'ahooks';
import { Card, Input, PageHeader, Skeleton, Spin, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { Helmet, history } from 'umi';

const { Search } = Input;

const SearchPage = () => {
  const [urlState, setUrlState] = useUrlState({
    page: 1,
    size: config.PAGE_SIZE,
    q: '',
  });
  const [keyword, setKeyword] = useState<string>(urlState.q);

  const pagination: Pagination = {
    page: parseInt(urlState.page),
    pageSize: parseInt(urlState.size),
  };
  const inputRef = useRef<any>(null);

  const fetchCourses = () => {
    if (keyword == '') return;
    run();
  };

  useEffect(() => {
    inputRef.current?.focus({ cursor: 'end' });
    fetchCourses();
  }, [urlState]);

  const {
    data: courses,
    loading: courseLoading,
    run,
  } = useRequest<PaginationApiResult<CourseListItem>, []>(
    () => searchCourse(keyword, pagination),
    { manual: true },
  );

  const onSearch = (value: string) => {
    if (value.trim() == '') {
      message.info('请输入搜索内容');
      return;
    }
    setUrlState({ q: keyword });
  };

  const onPageChange = (page: number, pageSize: number) => {
    setUrlState({ q: keyword, page: page, size: pageSize });
  };

  return (
    <PageHeader title={'搜索'} onBack={() => history.goBack()}>
      <Helmet>
        <title>{'搜索 ' + urlState.q + ' - SJTU选课社区'}</title>
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
      <Card title={`共有${courses ? courses.count : 0}门课`}>
        <Skeleton loading={courseLoading}>
          {courses && (
            <CourseList
              pagination={pagination}
              count={courses.count}
              courses={courses.results}
              onPageChange={onPageChange}
              showEnroll={true}
            />
          )}
        </Skeleton>
      </Card>
    </PageHeader>
  );
};

export default SearchPage;
