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
import { Card, Col, PageHeader, Row } from 'antd';
import { useEffect, useState } from 'react';
const CoursesPage = () => {
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
  const [filterLoading, setFilterLoading] = useState<boolean>(true);

  useEffect(() => {
    setFilterLoading(true);
    getFilters().then((filters) => {
      setFilters(filters);
      setFilterLoading(false);
    });
  }, []);

  const [apiParams, setApiParams] = useState<string>('');
  const [courseLoading, setCourseLoading] = useState<boolean>(false);
  const fetchCourses = (params: string) => {
    const limit = pagination.pageSize;
    const offset = (pagination.page - 1) * pagination.pageSize;
    setCourseLoading(true);
    getCourseList(params, limit, offset).then((courses) => {
      setCourses(courses);
      setCourseLoading(false);
    });
  };

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    pageSize: config.PAGE_SIZE,
  });
  useEffect(() => {
    fetchCourses(apiParams);
  }, [pagination]);

  const onFilterButtonClick = (categories: number[], departments: number[]) => {
    const params: string = `category=${categories.join(
      ',',
    )}&department=${departments.join(',')}`;
    setApiParams(params);
    setPagination({ page: 0, pageSize: config.PAGE_SIZE });
  };

  const onPageChange = (page: number, pageSize: number) => {
    setPagination({ page, pageSize });
  };
  return (
    <PageHeader title="所有课程" backIcon={false}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <FilterCard
            categories={filters.categories}
            departments={filters.departments}
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
            />
          </Card>
        </Col>
      </Row>
    </PageHeader>
  );
};
export default CoursesPage;
