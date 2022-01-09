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
import { useRequest } from 'ahooks';
import { Card, Col, PageHeader, Radio, Row } from 'antd';

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
  const pagination: Pagination = {
    page: parseInt(urlState.page),
    pageSize: parseInt(urlState.size),
  };
  const { data: courses, loading: courseLoading } = useRequest<
    PaginationApiResult<CourseListItem>,
    []
  >(
    () => {
      let params: string = '';
      if (urlState.categories) params += `&category=${urlState.categories}`;
      if (urlState.departments) params += `&department=${urlState.departments}`;
      if (urlState.onlyhasreviews)
        params += `&onlyhasreviews=${urlState.onlyhasreviews}`;
      return getCourseList(params, pagination);
    },
    { refreshDeps: [urlState] },
  );

  const { data: filters, loading: filterLoading } = useRequest<Filters, []>(
    getFilters,
  );

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
            filters={filters}
            selectedCategories={urlState.categories}
            selectedDepartments={urlState.departments}
            defaultOnlyHasReviews={urlState.onlyhasreviews != undefined}
            onClick={onFilterButtonClick}
            loading={filterLoading}
          />
        </Col>
        <Col xs={24} md={16}>
          <Card
            title={`共有${courses ? courses.count : 0}门课`}
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
              loading={courseLoading}
              pagination={pagination}
              count={courses?.count}
              courses={courses?.results}
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
