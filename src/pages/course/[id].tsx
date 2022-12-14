import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Divider,
  Empty,
  Grid,
  Row,
  Space,
  Spin,
} from "antd";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import CourseDetailCard from "@/components/course-detail-card";
import PageHeader from "@/components/page-header";
import RelatedCard from "@/components/related-card";
import ReviewFilter from "@/components/review-filter";
import ReviewList from "@/components/review-list";
import Config from "@/config/config";
import { Pagination, ReviewFilterValue } from "@/lib/models";
import { useCourseDetail } from "@/services/course";
import { useReviewFilters, useReviewsOfCourse } from "@/services/review";
import { useSemesters } from "@/services/semester";

const { useBreakpoint } = Grid;

type CourseDetailParams = {
  id?: string;
  page?: string;
  size?: string;
  order?: string;
  semester?: string;
  rating?: string;
};

const CoursePage = () => {
  const router = useRouter();
  const params: CourseDetailParams = router.query;
  const { page, size, id, order, semester, rating } = params;

  const pagination: Pagination = {
    page: page ? parseInt(page as string) : 1,
    pageSize: size ? parseInt(size as string) : Config.PAGE_SIZE,
  };

  const filterValue: ReviewFilterValue = {
    order: order ? parseInt(order as string) : 0,
    semester: semester ? parseInt(semester as string) : 0,
    rating: rating ? parseInt(rating as string) : 0,
  };

  const onPageChange = (page: number, pageSize: number) => {
    router.push({ query: { ...params, id, page, size: pageSize } });
  };
  const screens = useBreakpoint();

  const { course, loading: courseLoading } = useCourseDetail(id as string);
  const { semesterMap } = useSemesters();
  const { reviews, loading: reviewLoading } = useReviewsOfCourse(
    id as string,
    pagination,
    filterValue
  );
  const { filters } = useReviewFilters(id as string);

  const onFilterClick = (value: ReviewFilterValue) => {
    const newParams: CourseDetailParams = {
      id,
      page: (1).toString(),
      size: Config.PAGE_SIZE.toString(),
    };
    if (value.order) newParams.order = value.order.toString();
    if (value.semester) newParams.semester = value.semester.toString();
    if (value.rating) newParams.rating = value.rating.toString();
    console.log(newParams);
    router.push({ query: newParams });
  };

  return (
    <>
      <PageHeader
        title={
          course ? (
            course.name + "（" + course.main_teacher.name + "）"
          ) : (
            <Spin spinning={courseLoading}></Spin>
          )
        }
      />
      <Head>
        <title>
          {course
            ? course.name +
              "（" +
              course.main_teacher.name +
              "） - SJTU选课社区"
            : "加载中"}
        </title>
      </Head>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={24}>
              <CourseDetailCard
                loading={courseLoading}
                course={course}
                semesterMap={semesterMap}
              />
            </Col>
            {screens.md && (
              <RelatedCard course={course} loading={courseLoading} />
            )}
          </Row>
        </Col>
        <Col xs={24} md={16}>
          <Card
            title={`点评（${reviews ? reviews.count : 0}条）`}
            extra={
              <Space>
                <Link
                  href={
                    course?.is_reviewed
                      ? `/review?review_id=${course.is_reviewed}`
                      : `/review?course_id=${id}`
                  }
                >
                  <Button type="primary" icon={<EditOutlined />}>
                    {course?.is_reviewed ? "修改点评" : "新点评"}
                  </Button>
                </Link>
              </Space>
            }
          >
            <ReviewFilter
              filters={filters}
              defaultValue={filterValue}
              onClick={onFilterClick}
            ></ReviewFilter>
            <Divider></Divider>
            <ConfigProvider
              renderEmpty={() => (
                <Empty
                  description={
                    "暂无点评。如存在新旧课号或任课教师不同的同名课程，您可适当参考相关点评。"
                  }
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )}
            >
              <ReviewList
                loading={reviewLoading}
                count={reviews?.count}
                reviews={reviews?.results}
                onPageChange={onPageChange}
                pagination={pagination}
              ></ReviewList>
            </ConfigProvider>
          </Card>
        </Col>
        {!screens.md && <RelatedCard course={course} loading={courseLoading} />}
      </Row>
    </>
  );
};

export default CoursePage;
