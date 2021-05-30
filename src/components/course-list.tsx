import { CourseListItem } from '@/models/course';
import { List, Space, Typography, Tag } from 'antd';
import { Link } from 'react-router-dom';
import config from '@/config';
const CourseList = ({ courses }: { courses: CourseListItem[] }) => {
  return (
    <List
      itemLayout="horizontal"
      pagination={
        courses.length > config.PAGE_SIZE
          ? {
              onChange: (page) => {
                console.log(page);
              },
              pageSize: config.PAGE_SIZE,
            }
          : false
      }
      dataSource={courses}
      renderItem={(item) => {
        const { course_info, main_teacher, rating } = item;
        return (
          <List.Item
            key={item.id}
            extra={
              <Typography.Text type="secondary">
                {rating.count}条点评
              </Typography.Text>
            }
          >
            <List.Item.Meta
              title={
                <Space align="center">
                  <Link to={'/course/' + item.id}>
                    {course_info.code + ' '}
                    {course_info.name}（{main_teacher.name}）
                  </Link>
                </Space>
              }
              description={
                <span>
                  <Tag color="success">{item.course_info.category}</Tag>
                  {course_info.department} {course_info.credit}学分
                </span>
              }
            />
          </List.Item>
        );
      }}
    />
  );
};
export default CourseList;
