import CourseDetailCard from '@/components/course-detail-card';
import RelatedCard from '@/components/related-card';
import ReviewList from '@/components/review-list';
import config from '@/config';
import {
  CourseDetail,
  Pagination,
  PaginationApiResult,
  Review,
} from '@/models';
import { getCourseDetail } from '@/services/course';
import { getReviewsOfCourse } from '@/services/review';
import useUrlState from '@ahooksjs/use-url-state';
import { EditOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Card, Col, Grid, PageHeader, Row, Space, Spin } from 'antd';
import { Helmet, Link, useParams } from 'umi';
const { useBreakpoint } = Grid;

const CoursePage = () => {
  const [urlState, setUrlState] = useUrlState({
    page: 1,
    size: config.PAGE_SIZE,
  });
  const pagination: Pagination = {
    page: parseInt(urlState.page),
    pageSize: parseInt(urlState.size),
  };
  const onPageChange = (page: number, pageSize: number) => {
    setUrlState({ page: page, size: pageSize });
  };
  const screens = useBreakpoint();
  const { id } = useParams<{ id: string }>();
  const { data: course, loading: courseLoading } = useRequest<CourseDetail, []>(
    () => getCourseDetail(id),
    { refreshDeps: [id] },
  );

  const { data: reviews, loading: reviewLoading } = useRequest<
    PaginationApiResult<Review>,
    []
  >(() => getReviewsOfCourse(id, pagination), { refreshDeps: [id, urlState] });

  return (
    <PageHeader
      title={
        <Spin spinning={courseLoading}>
          {course && (
            <span className="card-title">
              {course.name}（{course.main_teacher.name}）
            </span>
          )}
        </Spin>
      }
      backIcon={false}
    >
      <Helmet>
        <title>
          {course
            ? course.name +
              '（' +
              course.main_teacher.name +
              '） - SJTU选课社区'
            : '加载中'}
        </title>
      </Helmet>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={24}>
              <CourseDetailCard loading={courseLoading} course={course} />
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
                  to={
                    course?.is_reviewed
                      ? `/review/${course.is_reviewed}`
                      : `/course/${id}/review`
                  }
                >
                  <Button type="primary" icon={<EditOutlined />}>
                    {course?.is_reviewed ? '修改点评' : '新点评'}
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
    </PageHeader>
  );
};

export default CoursePage;
