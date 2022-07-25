import { CourseDetail } from "@/lib/models";
import { Card, Col, List, Space, Typography } from "antd";
import { PropsWithChildren } from "react";
import Link from "next/link";
const { Text } = Typography;

export const RelatedTeacher = ({
  course,
  loading,
}: PropsWithChildren<{
  course: CourseDetail;
  loading: boolean;
}>) => {
  const { related_teachers } = course;
  return (
    <Card
      title={<div className="card-title">其他老师的{course.name}</div>}
      loading={loading}
    >
      <List
        split={false}
        dataSource={related_teachers}
        renderItem={(item) => (
          <List.Item>
            <Space align="center" wrap>
              <Link href={"/course/" + item.id}>
                <a>{item.tname}</a>
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
    </Card>
  );
};
export const RelatedCourse = ({
  course,
  loading,
}: PropsWithChildren<{
  course: CourseDetail;
  loading: boolean;
}>) => {
  const { main_teacher, related_courses } = course;

  return (
    <Card
      title={<div className="card-title">{main_teacher.name}的其他课</div>}
      loading={loading}
    >
      <List
        split={false}
        dataSource={related_courses}
        renderItem={(item) => (
          <List.Item>
            <Space align="center" wrap>
              <Link href={"/course/" + item.id}>
                <a>
                  {item.code} {item.name}
                </a>
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
    </Card>
  );
};

const RelatedCard = ({
  course,
  loading,
}: PropsWithChildren<{
  course: CourseDetail | undefined;
  loading: boolean;
}>) => {
  if (!course) return <></>;
  return (
    <>
      {course.related_teachers.length > 0 && (
        <Col xs={24} md={24}>
          <RelatedTeacher course={course} loading={loading} />
        </Col>
      )}
      {course.related_courses.length > 0 && (
        <Col xs={24} md={24}>
          <RelatedCourse course={course} loading={loading} />
        </Col>
      )}
    </>
  );
};
export default RelatedCard;
