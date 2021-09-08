import { CourseListItem, Pagination } from '@/models';
import { List, Space, Tag } from 'antd';
import { Link } from 'umi';
const CourseList = ({
  count,
  courses,
  onPageChange,
  loading,
  pagination,
  showEnroll,
}: {
  count: number;
  courses: CourseListItem[];
  onPageChange?: Function;
  loading: boolean;
  pagination?: Pagination;
  showEnroll?: boolean;
}) => {
  return (
    <List
      loading={loading}
      itemLayout="horizontal"
      pagination={
        pagination
          ? {
              hideOnSinglePage: true,
              onChange: (page, pageSize) => {
                onPageChange && onPageChange(page, pageSize);
              },
              total: count,
              current: pagination.page,
              defaultCurrent: pagination.page,
              pageSize: pagination.pageSize,
            }
          : false
      }
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
                <Space wrap size={0}>
                  {showEnroll && course.semester && (
                    <Tag color="default">学过</Tag>
                  )}
                  {course.category && (
                    <Tag color="success">{course.category}</Tag>
                  )}
                  {course.is_reviewed && <Tag color="processing">已点评</Tag>}
                  <div>
                    {course.credit}学分 {course.department}
                  </div>
                </Space>
              }
            />
          </List.Item>
        );
      }}
    />
  );
};
export default CourseList;
