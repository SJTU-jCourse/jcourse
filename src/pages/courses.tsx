import CourseList from '@/components/course-list';
import FilterCard from '@/components/filter-card';
import config from '@/config';
import { CourseListItem, PaginationApiResult } from '@/models';
import { Card, Col, PageHeader, Row } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
const CoursesPage = () => {
  const [courses, setCourses] = useState<PaginationApiResult<CourseListItem>>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [filters, setFilters] = useState({
    categories: [],
    departments: [],
  });
  const [filterLoading, setFilterLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get('/api/course/').then((resp) => {
      setCourses(resp.data);
    });
  }, []);

  useEffect(() => {
    setFilterLoading(true);
    axios.get('/api/filter/').then((resp) => {
      setFilters({
        categories: resp.data.categories,
        departments: resp.data.departments,
      });
      setFilterLoading(false);
    });
  }, []);

  const [urlParams, setUrlParams] = useState<string>('');
  const [courseLoading, setCourseLoading] = useState<boolean>(false);

  const fetchCourses = (params: string, limit: number, offset: number) => {
    const apiUrl = `/api/course/?${params}&limit=${limit}&offset=${offset}`;
    setCourseLoading(true);
    axios.get(apiUrl).then((resp) => {
      setCourses(resp.data);
      setCourseLoading(false);
    });
  };
  const onFilterButtonClick = (categories: number[], departments: number[]) => {
    const params: string = `category=${categories.join(
      ',',
    )}&department=${departments.join(',')}`;
    setUrlParams(params);
    fetchCourses(params, config.PAGE_SIZE, 0);
  };

  const onPageChange = (page: number, pageSize: number) => {
    console.log(page, pageSize);
    fetchCourses(urlParams, pageSize, (page - 1) * pageSize);
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
