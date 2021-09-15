import CourseList from '@/components/course-list';
import FilterCard from '@/components/filter-card';
import config from '@/config';
import {
  CourseListItem,
  Filters,
  Pagination,
  PaginationApiResult,
} from '@/models';
import { getCourseList, getFilters } from '@/services/course';
import { Card, Col, PageHeader, Radio, Row } from 'antd';
import { useEffect, useState } from 'react';
import { history } from 'umi';

const CoursesPage = () => {
  const queryString = require('query-string');
  const parsed = queryString.parse(location.search);
  const [courses, setCourses] = useState<PaginationApiResult<CourseListItem>>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    departments: [],
  });
  const [categories, setCategories] = useState<string>(
    parsed.categories ? parsed.categories : '',
  );
  const [departments, setDepartments] = useState<string>(
    parsed.departments ? parsed.departments : '',
  );
  const [onlyHasReviews, setOnlyHasReviews] = useState<boolean>(
    'onlyhasreviews' in parsed,
  );
  const [filterLoading, setFilterLoading] = useState<boolean>(true);
  const [courseLoading, setCourseLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<Pagination>({
    page: parsed.page ? parseInt(parsed.page) : 1,
    pageSize: parsed.size ? parseInt(parsed.size) : config.PAGE_SIZE,
  });

  useEffect(() => {
    setFilterLoading(true);
    getFilters().then((filters) => {
      setFilters(filters);
      setFilterLoading(false);
    });
  }, []);

  const fetchCourses = (params: string) => {
    const limit = pagination.pageSize;
    const offset = (pagination.page - 1) * pagination.pageSize;
    setCourseLoading(true);
    getCourseList(params, limit, offset).then((courses) => {
      setCourses(courses);
      setCourseLoading(false);
    });
  };

  useEffect(() => {
    let params: string = `category=${categories}&department=${departments}`;
    if (onlyHasReviews) params += '&onlyhasreviews';
    fetchCourses(params);
  }, [history.location.query]);

  const onFilterButtonClick = (
    onlyHasReviews: boolean,
    categories: number[],
    departments: number[],
  ) => {
    setOnlyHasReviews(onlyHasReviews);
    setCategories(categories.join(','));
    setDepartments(departments.join(','));
    setPagination({ page: 1, pageSize: config.PAGE_SIZE });
    let query: any = {
      categories: categories.join(','),
      departments: departments.join(','),
      page: '1',
      size: config.PAGE_SIZE.toString(),
    };
    if (onlyHasReviews) query.onlyhasreviews = null;
    history.push({
      pathname: history.location.pathname,
      query: query,
    });
  };

  const onPageChange = (page: number, pageSize: number) => {
    setPagination({ page, pageSize });
    let query: any = {
      categories: categories,
      departments: departments,
      page: page.toString(),
      size: pageSize.toString(),
    };
    if (onlyHasReviews) query.onlyhasreviews = null;
    history.push({
      pathname: history.location.pathname,
      query,
    });
  };
  return (
    <PageHeader title="所有课程" backIcon={false}>
      <Row gutter={[config.LAYOUT_MARGIN, config.LAYOUT_MARGIN]}>
        <Col xs={24} md={8}>
          <FilterCard
            categories={filters.categories}
            departments={filters.departments}
            selectedCategories={categories}
            selectedDepartments={departments}
            defaultOnlyHasReviews={onlyHasReviews}
            onClick={onFilterButtonClick}
            loading={filterLoading}
          />
        </Col>
        <Col xs={24} md={16}>
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
        </Col>
      </Row>
    </PageHeader>
  );
};
export default CoursesPage;
