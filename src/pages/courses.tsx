import CourseList from '@/components/course-list';
import FilterCard from '@/components/filter-card';
import { Card, Col, PageHeader, Row } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
const CoursesPage = () => {
  const [courses, setCourses] = useState({ count: 0, courses: [] });
  const [filters, setFilters] = useState({
    categories: [],
    departments: [],
  });

  useEffect(() => {
    setCourses({ count: 0, courses: [] });
    axios.get('/api/courses').then((resp) => {
      setCourses({
        count: resp.data.count,
        courses: resp.data.courses,
      });
    });
  }, []);

  useEffect(() => {
    setFilters({ categories: [], departments: [] });
    axios.get('/api/filters').then((resp) => {
      setFilters({
        categories: resp.data.categories,
        departments: resp.data.departments,
      });
    });
  }, []);

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
          />
        </Col>
        <Col xs={24} md={16}>
          <Card>
            <CourseList courses={courses.courses} />
          </Card>
        </Col>
      </Row>
    </PageHeader>
  );
};
export default CoursesPage;
