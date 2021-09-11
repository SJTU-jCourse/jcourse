import CourseDetailCard from '@/components/course-detail-card';
import RelatedCard from '@/components/related-card';
import ReviewList from '@/components/review-list';
import config from '@/config';
import { CourseDetail, Review } from '@/models';
import { getCourseDetail } from '@/services/course';
import { getReviewsOfCourse } from '@/services/review';
import { EditOutlined } from '@ant-design/icons';
import { Button, Card, Col, Grid, Row, Space } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'umi';
const { useBreakpoint } = Grid;
const CoursePage = () => {
  const screens = useBreakpoint();
  /*const Orders = [
    { label: '最新发布', value: 'new' },
    { label: '最多赞同', value: 'hot' },
  ];*/
  const { id } = useParams<{ id: string }>();
  //const [order, setOrder] = useState<number>(0);
  const [course, setCourse] = useState<CourseDetail>({
    id: 0,
    code: '',
    category: '',
    department: '',
    name: '',
    credit: 0,
    language: '',
    main_teacher: { tid: '', department: '', name: '', title: '' },
    teacher_group: [],
    moderator_remark: null,
    rating: {
      avg: 0,
      count: 0,
    },
    related_teachers: [],
    related_courses: [],
    former_code: '',
    semester: null,
  });
  const [courseLoading, setCourseLoading] = useState<boolean>(true);
  const [reviewLoading, setReviewLoading] = useState<boolean>(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    setCourseLoading(true);
    getCourseDetail(id).then((course) => {
      setCourse(course);
      setCourseLoading(false);
    });
  }, [id]);

  useEffect(() => {
    setReviewLoading(true);
    getReviewsOfCourse(id).then((reviews) => {
      setReviews(reviews);
      setReviewLoading(false);
    });
  }, [id]);

  return (
    <Row
      gutter={[config.LAYOUT_PADDING, config.LAYOUT_PADDING]}
      style={{
        paddingInline: config.LAYOUT_PADDING,
        marginTop: config.LAYOUT_PADDING,
      }}
    >
      <Col xs={24} md={8}>
        <CourseDetailCard course={course} loading={courseLoading} />
        {screens.md && (
          <RelatedCard
            style={{ marginTop: config.LAYOUT_PADDING }}
            course={course}
            loading={courseLoading}
          />
        )}
      </Col>
      <Col xs={24} md={16}>
        <Card
          title={`点评（${reviews ? reviews.length : 0}条）`}
          extra={
            <Space>
              {/*<Button
                icon={<SwapOutlined />}
                type="text"
                onClick={() => {
                  setOrder(order == 0 ? 1 : 0);
                  fetchReview();
                }}
              >
                {Orders[order].label}
              </Button>*/}
              <Link
                to={{
                  pathname: '/review',
                  state: {
                    course: {
                      id: course.id,
                      code: course.code,
                      name: course.name,
                      teacher: course.main_teacher.name,
                      semester: course.semester,
                    },
                  },
                }}
              >
                <Button type="primary" icon={<EditOutlined />}>
                  写点评
                </Button>
              </Link>
            </Space>
          }
        >
          <ReviewList
            loading={reviewLoading}
            count={reviews.length}
            reviews={reviews}
            pagination={{ page: 1, pageSize: reviews.length }}
          ></ReviewList>
        </Card>
      </Col>
      {!screens.md && (
        <Col xs={24} md={24}>
          <RelatedCard course={course} loading={courseLoading} />
        </Col>
      )}
    </Row>
  );
};

export default CoursePage;
