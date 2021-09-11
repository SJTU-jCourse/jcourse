import { CourseDetail, Teacher } from '@/models';
import { Card, Descriptions, Spin, Typography } from 'antd';
import { PropsWithChildren, useState } from 'react';

import ReportModal from './report-modal';

const { Text, Title, Link } = Typography;

const CourseDetailCard = ({
  course,
  loading,
  ...props
}: PropsWithChildren<{ course: CourseDetail; loading: boolean }>) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  return (
    <Card
      {...props}
      title={
        loading ? (
          <Spin />
        ) : (
          <Title level={4} style={{ whiteSpace: 'normal' }}>
            {course.name}（{course.main_teacher.name}）
          </Title>
        )
      }
      loading={loading}
    >
      <Descriptions column={1}>
        <Descriptions.Item label="课号">{course.code}</Descriptions.Item>
        {course.former_code && (
          <Descriptions.Item label="曾用课号">
            {course.former_code}
          </Descriptions.Item>
        )}
        <Descriptions.Item label="课程学分">{course.credit}</Descriptions.Item>
        <Descriptions.Item label="开课单位">
          {course.department}
        </Descriptions.Item>
        <Descriptions.Item label="授课语言">
          {course.language}
        </Descriptions.Item>
        <Descriptions.Item label="合上教师">
          {course.teacher_group
            .map((item: Teacher) => {
              return item.name;
            })
            .join('，')}
        </Descriptions.Item>
        {course.category && (
          <Descriptions.Item label="课程类别">
            {course.category}
          </Descriptions.Item>
        )}
        {course.moderator_remark && (
          <Descriptions.Item label="备注">
            {course.moderator_remark}
          </Descriptions.Item>
        )}
        {course.semester && (
          <Descriptions.Item label="学过学期">
            {course.semester.name}
          </Descriptions.Item>
        )}
        <Descriptions.Item label="推荐指数">
          <Text strong>{course.rating.avg?.toFixed(1)}</Text>（
          {course.rating.count}
          人评价）
        </Descriptions.Item>
      </Descriptions>
      <Link onClick={() => setIsModalVisible(true)}>信息有误？</Link>
      <ReportModal
        visible={isModalVisible}
        title={'课程信息反馈'}
        defaultComment={`课程：${course.code} ${course.name} ${course.main_teacher.name}\n内部编号：${course.id}\n更改意见：`}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
      />
    </Card>
  );
};

export default CourseDetailCard;
