import { CourseDetail } from '@/models';
import { Card, List, Space, Spin, Typography } from 'antd';
import { PropsWithChildren } from 'react';
import { Link } from 'umi';
const { Text } = Typography;
const RelatedCard = ({
  course,
  loading,
  ...props
}: PropsWithChildren<{ course: CourseDetail; loading: boolean }>) => {
  const { main_teacher, related_teachers, related_courses } = course;

  return (
    <div {...props}>
      <Card
        title={
          <Spin spinning={loading}>
            <div style={{ whiteSpace: 'normal' }}>其他老师的{course.name}</div>
          </Spin>
        }
        loading={loading}
      >
        {related_teachers.length > 0 && (
          <List
            split={false}
            dataSource={related_teachers}
            renderItem={(item) => (
              <List.Item>
                <Space align="center" wrap>
                  <Link to={'/course/' + item.id}>{item.tname}</Link>
                  {item.count > 0 && (
                    <span>
                      <Text strong>{item.avg?.toFixed(1)}</Text>
                      <Text>（{item.count}人）</Text>
                    </span>
                  )}
                </Space>
              </List.Item>
            )}
          />
        )}
      </Card>

      <Card
        title={
          <Spin spinning={loading}>
            <div style={{ whiteSpace: 'normal' }}>
              {main_teacher.name}的其他课
            </div>
          </Spin>
        }
        style={{ marginTop: 16 }}
        loading={loading}
      >
        {related_courses.length > 0 && (
          <List
            split={false}
            dataSource={related_courses}
            renderItem={(item) => (
              <List.Item>
                <Space align="center" wrap>
                  <Link to={'/course/' + item.id}>
                    {item.code} {item.name}
                  </Link>
                  {item.count > 0 && (
                    <span>
                      <Text strong>{item.avg?.toFixed(1)}</Text>
                      <Text>（{item.count}人）</Text>
                    </span>
                  )}
                </Space>
              </List.Item>
            )}
          />
        )}
      </Card>
    </div>
  );
};
export default RelatedCard;
