import { CourseDetail } from '@/models/course';
import { Card, List, Space } from 'antd';
import { Link } from 'react-router-dom';
const RelatedCard = ({ course }: { course: CourseDetail }) => {
  const { course_info, main_teacher, related_teachers, related_courses } =
    course;

  return (
    <div>
      {related_teachers.length > 0 ? (
        <Card title={'其他老师的' + course_info.name}>
          <List
            split={false}
            dataSource={related_teachers}
            renderItem={(item) => (
              <List.Item>
                <Space align="center">
                  <Link to={'/course/' + item.id}>{item.name}</Link>
                  {/*<span>
                    <Text strong>{item.rate}</Text>（{item.count}条点评）
                  </span>*/}
                </Space>
              </List.Item>
            )}
          />
        </Card>
      ) : (
        <></>
      )}

      {related_courses.length > 0 ? (
        <Card
          title={main_teacher.name + '的其他课'}
          style={{ marginTop: related_teachers.length > 0 ? 16 : 0 }}
        >
          <List
            split={false}
            dataSource={related_courses}
            renderItem={(item) => (
              <List.Item>
                <Space align="center">
                  <Link to={'/course/' + item.id}>{item.name}</Link>
                  {/*<span>
                    <Text strong>{item.rate}</Text>（{item.count}条点评）
                  </span>*/}
                </Space>
              </List.Item>
            )}
          />
        </Card>
      ) : (
        <></>
      )}
    </div>
  );
};
export default RelatedCard;