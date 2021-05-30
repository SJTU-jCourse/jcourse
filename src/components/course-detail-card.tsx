import { CourseDetail, Teacher } from '@/models/course';
import { Card, Descriptions, Typography } from 'antd';
import { Link } from 'umi';
const { Text, Title } = Typography;

const CourseDetailCard = ({ course }: { course: CourseDetail }) => {
  const { course_info, main_teacher, teacher_group, language, rating } = course;
  return (
    <Card
      title={
        <Title level={4} style={{ whiteSpace: 'normal' }}>
          {course_info.name}（{main_teacher.name}）
        </Title>
      }
      extra={<Link to="/report">信息有误？</Link>}
    >
      <Descriptions column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}>
        <Descriptions.Item label="课号">{course_info.code}</Descriptions.Item>
        <Descriptions.Item label="学分">{course_info.credit}</Descriptions.Item>
        <Descriptions.Item label="开课单位">
          {course_info.department}
        </Descriptions.Item>
        <Descriptions.Item label="授课语言">{language}</Descriptions.Item>
        <Descriptions.Item label="合上教师">
          {teacher_group
            .map((item: Teacher) => {
              return item.name;
            })
            .join('，')}
        </Descriptions.Item>
        <Descriptions.Item label="课程类别">
          {course_info.category}
        </Descriptions.Item>
        <Descriptions.Item label="推荐指数">
          <Text strong>{rating.avg?.toFixed(1)}</Text>（{rating.count}
          人评分）
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default CourseDetailCard;
