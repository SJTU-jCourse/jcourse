import { Card, Col, List, Space, Typography } from "antd";
import Link from "next/link";
import { PropsWithChildren } from "react";

import { CourseDetail } from "@/lib/models";
import { CommonInfoContext } from "@/lib/context";
import PromotionCard from "./promotion-card";
import Touchpoint from "@/config/touchpoint";

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
              <Link href={"/course/" + item.id}>{item.tname}</Link>
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
      <CommonInfoContext.Consumer>
        {(commonInfo) => {
          return (
            <Col xs={24} md={24}>
              <PromotionCard
                promotion={commonInfo?.promotions.get(
                  Touchpoint.BELOW_RELATED_COURSE
                )}
              ></PromotionCard>
            </Col>
          );
        }}
      </CommonInfoContext.Consumer>
    </>
  );
};
export default RelatedCard;
