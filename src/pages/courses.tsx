import { Card, Col, Radio, Row } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";

import CourseList from "@/components/course-list";
import CourseFilterCard from "@/components/course-filter-card";
import Config from "@/config/config";
import { CoursesFilterParams, Pagination } from "@/lib/models";
import { useCourseList, useCourseFilters } from "@/services/course";
import PageHeader from "@/components/page-header";

enum OrderBy {
  Avg = "avg",
  Count = "count",
}

type CoursesParams = {
  page?: string;
  size?: string;
} & CoursesFilterParams;

const CoursesPage = () => {
  const router = useRouter();
  const params: CoursesParams = router.query;
  const { page, size, categories, departments, onlyhasreviews } = params;
  const pagination: Pagination = {
    page: page ? parseInt(page) : 1,
    pageSize: size ? parseInt(size) : Config.PAGE_SIZE,
  };

  const { courses, loading: courseLoading } = useCourseList(params, pagination);
  const { filters, loading: filterLoading } = useCourseFilters();

  const onFilterButtonClick = (
    onlyHasReviews: boolean,
    categories: number[],
    departments: number[]
  ) => {
    const new_params: CoursesParams = {
      page: (1).toString(),
      size: Config.PAGE_SIZE.toString(),
    };
    if (categories.length > 0) new_params.categories = categories.join(",");
    if (departments.length > 0) new_params.departments = departments.join(",");
    if (onlyHasReviews) new_params.onlyhasreviews = OrderBy.Avg;
    router.push({
      query: new_params,
    });
  };

  const onPageChange = (page: number, pageSize: number) => {
    router.push({
      query: { ...params, page: page, size: pageSize },
    });
  };

  const onOrderByClick = (e: any) => {
    router.push({
      query: {
        ...params,
        page: 1,
        size: Config.PAGE_SIZE,
        onlyhasreviews: e.target.value,
      },
    });
  };
  return (
    <>
      <PageHeader title="所有课程"></PageHeader>
      <Head>
        <title>课程库 - SJTU选课社区</title>
      </Head>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <CourseFilterCard
            filters={filters}
            selectedCategories={categories as string}
            selectedDepartments={departments as string}
            defaultOnlyHasReviews={onlyhasreviews != undefined}
            onClick={onFilterButtonClick}
            loading={filterLoading}
          />
        </Col>
        <Col xs={24} md={16}>
          <Card
            title={`共有${courses ? courses.count : 0}门课`}
            extra={
              onlyhasreviews && (
                <Radio.Group
                  value={onlyhasreviews}
                  onChange={onOrderByClick}
                  className="course-radio-group"
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
    </>
  );
};
export default CoursesPage;
