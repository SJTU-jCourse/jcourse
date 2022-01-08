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
import useUrlState from '@ahooksjs/use-url-state';
import { Card, Col, PageHeader, Radio, Row } from 'antd';
import { useEffect, useState } from 'react';

enum OrderBy {
  Avg = 'avg',
  Count = 'count',
}

const CoursesPage = () => {
  const [urlState, setUrlState] = useUrlState({
    page: 1,
    size: config.PAGE_SIZE,
    categories: null,
    departments: null,
    onlyhasreviews: null,
  });

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
  const [courseLoading, setCourseLoading] = useState<boolean>(false);
  const pagination: Pagination = {
    page: parseInt(urlState.page),
    pageSize: parseInt(urlState.size),
  };

  useEffect(() => {
    setFilterLoading(true);
    getFilters().then((filters) => {
      setFilters(filters);
      setFilterLoading(false);
    });
  }, []);

  const fetchCourses = (params: string) => {
    setCourseLoading(true);
    getCourseList(params, pagination).then((courses) => {
      setCourses(courses);
      setCourseLoading(false);
    });
  };

  useEffect(() => {
    let params: string = '';
    if (urlState.categories) params += `&category=${urlState.categories}`;
    if (urlState.departments) params += `&department=${urlState.departments}`;
    if (urlState.onlyhasreviews)
      params += `&onlyhasreviews=${urlState.onlyhasreviews}`;
    fetchCourses(params);
  }, [urlState]);

  const onFilterButtonClick = (
    onlyHasReviews: boolean,
    categories: number[],
    departments: number[],
  ) => {
    setUrlState({
      categories: categories.length > 0 ? categories.join(',') : undefined,
      departments: departments.length > 0 ? departments.join(',') : undefined,
      page: 1,
      size: config.PAGE_SIZE,
      onlyhasreviews: onlyHasReviews ? OrderBy.Avg : undefined,
    });
  };

  const onPageChange = (page: number, pageSize: number) => {
    setUrlState({ page: page, size: pageSize });
  };

  const onOrderByClick = (e: any) => {
    setUrlState({
      page: 1,
      size: config.PAGE_SIZE,
      onlyhasreviews: e.target.value,
    });
  };
  return (
    <PageHeader title="所有课程" backIcon={false}>
      <Row gutter={[config.LAYOUT_MARGIN, config.LAYOUT_MARGIN]}>
        <Col xs={24} md={8}>
          <FilterCard
            categories={filters.categories}
            departments={filters.departments}
            selectedCategories={urlState.categories}
            selectedDepartments={urlState.departments}
            defaultOnlyHasReviews={urlState.onlyhasreviews != undefined}
            onClick={onFilterButtonClick}
            loading={filterLoading}
          />
        </Col>
        <Col xs={24} md={16}>
          <Card
            title={'共有' + courses.count + '门课'}
            extra={
              urlState.onlyhasreviews && (
                <Radio.Group
                  value={urlState.onlyhasreviews}
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
