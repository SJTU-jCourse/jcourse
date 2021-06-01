import CourseList from '@/components/course-list';
import FilterCard from '@/components/filter-card';
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

  const onFilterButtonClick = (categories: number[], departments: number[]) => {
    const apiUrl = `/api/course/?category=${categories.join(
      ',',
    )}&department=${departments.join(',')}`;
    axios.get(apiUrl).then((resp) => {
      setCourses(resp.data);
    });
  };
  return (
    <PageHeader
      title="所有课程"
      backIcon={false}
      subTitle={'共有' + courses.count + '门课'}
    >
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
          <Card>
            <CourseList courses={courses.results} />
          </Card>
        </Col>
      </Row>
    </PageHeader>
  );
};
export default CoursesPage;
