import CourseDetailCard from '@/components/course-detail-card';
import RelatedCard from '@/components/related-card';
import ReviewList from '@/components/review-list';
import { CourseDetail, Review } from '@/models';
import { EditOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Space } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'umi';

const CoursePage = () => {
  /*const Orders = [
    { label: '最新发布', value: 'new' },
    { label: '最多赞同', value: 'hot' },
  ];*/
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<number>(0);
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
    rating: {
      avg: 0,
      count: 0,
    },
    related_teachers: [],
    related_courses: [],
  });
  const [courseLoading, setCourseLoading] = useState<boolean>(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  useEffect(() => {
    setCourseLoading(true);
    const apiUrl: string = `/api/course/${id}/`;
    axios.get(apiUrl).then((resp) => {
      setCourse(resp.data);
      setCourseLoading(false);
    });
  }, [id]);

  useEffect(() => {
    fetchReview();
  }, [id]);

  const fetchReview = () => {
    const apiUrl = `/api/course/${id}/review/`;
    axios.get(apiUrl).then((resp) => {
      setReviews(resp.data);
    });
  };
  return (
    <Row gutter={[16, 16]} style={{ paddingInline: 16, marginTop: 16 }}>
      <Col xs={24} md={16}>
        <CourseDetailCard course={course} loading={courseLoading} />

        <Card
          style={{ marginTop: 16 }}
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
          <ReviewList reviews={reviews}></ReviewList>
        </Card>
      </Col>
      <Col xs={24} md={8}>
        <RelatedCard course={course} />
      </Col>
    </Row>
  );
};

export default CoursePage;
