import { CourseListItem } from '@/models';
import { List, Space, Tag } from 'antd';
import { Link } from 'umi';
const CourseList = ({
  count,
  courses,
  onPageChange,
  loading,
}: {
  count: number;
  courses: CourseListItem[];
  onPageChange: Function;
  loading: boolean;
}) => {
  return (
    <List
      loading={loading}
      itemLayout="horizontal"
      pagination={{
        hideOnSinglePage: true,
        onChange: (page, pageSize) => {
          onPageChange(page, pageSize);
        },
        total: count,
      }}
      dataSource={courses}
      renderItem={(course) => {
        return (
          <List.Item key={course.id} extra={course.rating.count + '条点评'}>
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
                  {course.category && (
                    <Tag color="success">{course.category}</Tag>
                  )}
                  {course.credit}学分 {course.department}
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
