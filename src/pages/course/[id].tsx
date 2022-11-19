import { EditOutlined } from "@ant-design/icons";
import { Button, Card, Col, Grid, Row, Space, Spin } from "antd";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import CourseDetailCard from "@/components/course-detail-card";
import PageHeader from "@/components/page-header";
import RelatedCard from "@/components/related-card";
import ReviewList from "@/components/review-list";
import Config from "@/config/config";
import { Pagination } from "@/lib/models";
import { useCourseDetail } from "@/services/course";
import { useReviewsOfCourse } from "@/services/review";
import { useSemesters } from "@/services/semester";

const { useBreakpoint } = Grid;

const CoursePage = () => {
  const router = useRouter();
  const { page, size, id } = router.query;
  const pagination: Pagination = {
    page: page ? parseInt(page as string) : 1,
    pageSize: size ? parseInt(size as string) : Config.PAGE_SIZE,
  };
  const onPageChange = (page: number, pageSize: number) => {
    router.push({ query: { id, page, size: pageSize } });
  };
  const screens = useBreakpoint();

  const { course, loading: courseLoading } = useCourseDetail(id as string);
  const { semesterMap } = useSemesters();
  const { reviews, loading: reviewLoading } = useReviewsOfCourse(
    id as string,
    pagination
  );

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
            <ReviewList
              loading={reviewLoading}
              count={reviews?.count}
              reviews={reviews?.results}
              onPageChange={onPageChange}
              pagination={pagination}
            ></ReviewList>
          </Card>
        </Col>
        {!screens.md && <RelatedCard course={course} loading={courseLoading} />}
      </Row>
    </>
  );
};

export default CoursePage;
