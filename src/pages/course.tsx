import { Card, Row, Col, Button, Space } from 'antd';

import { EditOutlined, SwapOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';

import CourseDetailCard from '@/components/course-detail-card';
import RelatedCard from '@/components/related-card';
import ReviewList from '@/components/review-list';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CourseDetail = () => {
  const Orders = [
    { label: '最新发布', value: 'new' },
    { label: '最多赞同', value: 'hot' },
  ];
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState(0);
  const [course, setCourse] = useState({
    id: 0,
    course_info: {
      code: '',
      category: '',
      department: '',
      name: '',
      credit: 0,
    },
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
  const [reviews, setReviews] = useState({ count: 0, reviews: [] });
  useEffect(() => {
    const apiUrl: string = `/api/course/${id}`;
    axios.get(apiUrl).then((resp) => {
      setCourse(resp.data);
    });
  }, []);

  useEffect(() => {
    fetchReview();
  }, []);

  const fetchReview = () => {
    const apiUrl = `/api/course/${id}/reviews/${Orders[order].value}`;
    axios.get(apiUrl).then((resp) => {
      setReviews(resp.data);
    });
  };
  return (
    <Row gutter={[16, 16]} style={{ paddingInline: 16 }}>
      <Col xs={24} md={16}>
        <CourseDetailCard course={course} />

        <Card
          style={{ marginTop: 16 }}
          title={`点评（${reviews.count}条）`}
          extra={
            <Space>
              <Button
                icon={<SwapOutlined />}
                type="text"
                onClick={() => {
                  setOrder(order == 0 ? 1 : 0);
                  fetchReview();
                }}
              >
                {Orders[order].label}
              </Button>
              <Link
                to={{
                  pathname: '/review',
                  state: {
                    course: {
                      id: course.id,
                      code: course.course_info.code,
                      name: course.course_info.name,
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
          <ReviewList reviews={reviews.reviews}></ReviewList>
        </Card>
      </Col>
      <Col xs={24} md={8}>
        <RelatedCard course={course} />
      </Col>
    </Row>
  );
};

export default CourseDetail;
