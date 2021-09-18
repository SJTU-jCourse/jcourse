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

enum OrderBy {
  Avg = 'avg',
  Count = 'count',
}

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
  const categories: string = parsed.categories ? parsed.categories : '';
  const departments: string = parsed.departments ? parsed.departments : '';
  const onlyHasReviews: OrderBy | undefined = parsed.onlyhasreviews;
  const [filterLoading, setFilterLoading] = useState<boolean>(true);
  const [courseLoading, setCourseLoading] = useState<boolean>(false);
  const pagination: Pagination = {
    page: parsed.page ? parseInt(parsed.page) : 1,
    pageSize: parsed.size ? parseInt(parsed.size) : config.PAGE_SIZE,
  };

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
    if (onlyHasReviews) params += `&onlyhasreviews=${onlyHasReviews}`;
    fetchCourses(params);
  }, [history.location.query]);

  const onFilterButtonClick = (
    onlyHasReviews: boolean,
    categories: number[],
    departments: number[],
  ) => {
    let query: any = {
      categories: categories.join(','),
      departments: departments.join(','),
      page: '1',
      size: config.PAGE_SIZE.toString(),
    };
    if (onlyHasReviews) query.onlyhasreviews = OrderBy.Avg;
    history.push({
      pathname: history.location.pathname,
      query: query,
    });
  };

  const onPageChange = (page: number, pageSize: number) => {
    let query: any = {
      categories: categories,
      departments: departments,
      page: page.toString(),
      size: pageSize.toString(),
    };
    if (onlyHasReviews) query.onlyhasreviews = onlyHasReviews;
    history.push({
      pathname: history.location.pathname,
      query,
    });
  };

  const onOrderByClick = (e: any) => {
    let query: any = {
      categories: categories,
      departments: departments,
      page: '1',
      size: config.PAGE_SIZE.toString(),
      onlyhasreviews: e.target.value,
    };
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
            defaultOnlyHasReviews={onlyHasReviews != undefined}
            onClick={onFilterButtonClick}
            loading={filterLoading}
          />
        </Col>
        <Col xs={24} md={16}>
          <Card
            title={'共有' + courses.count + '门课'}
            extra={
              onlyHasReviews && (
                <Radio.Group
                  value={onlyHasReviews}
                  onChange={onOrderByClick}
                  style={{ padding: 0 }}
                >
                  <Radio.Button value={OrderBy.Avg}>最高均分</Radio.Button>
                  <Radio.Button value={OrderBy.Count}>最多点评</Radio.Button>
                </Radio.Group>
              )
            }
          >
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
