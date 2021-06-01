import config from '@/config';
import { CourseListItem } from '@/models';
import { List, Space, Tag, Typography } from 'antd';
import { Link } from 'umi';
const CourseList = ({ courses }: { courses: CourseListItem[] }) => {
  return (
    <List
      itemLayout="horizontal"
      pagination={
        courses && courses.length > config.PAGE_SIZE
          ? {
              onChange: (page) => {
                console.log(page);
              },
              pageSize: config.PAGE_SIZE,
            }
          : false
      }
      dataSource={courses}
      renderItem={(course) => {
        return (
          <List.Item
            key={course.id}
            extra={
              <Typography.Text type="secondary">
                {course.rating.count}条点评
              </Typography.Text>
            }
          >
            <List.Item.Meta
              title={
                <Space align="center">
                  <Link to={'/course/' + course.id}>
                    {course.code + ' '}
                    {course.name}（{course.teacher}）
                  </Link>
                </Space>
              }
              description={
                <span>
                  <Tag color="success">{course.category}</Tag>
                  {course.department} {course.credit}学分
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
