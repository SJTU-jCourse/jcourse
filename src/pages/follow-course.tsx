import { Card } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";

import CourseList from "@/components/course-list";
import PageHeader from "@/components/page-header";
import Config from "@/config/config";
import { NotificationLevel, Pagination } from "@/lib/models";
import { useFollowingCourseList } from "@/services/course";

const FollowCoursePage = () => {
  const router = useRouter();
  const { page, size } = router.query;

  const pagination: Pagination = {
    page: page ? parseInt(page as string) : 1,
    pageSize: size ? parseInt(size as string) : Config.PAGE_SIZE,
  };

  const { courses, loading } = useFollowingCourseList(
    NotificationLevel.FOLLOW,
    pagination
  );

  const onPageChange = (page: number, pageSize: number) => {
    router.push({ query: { page: page, size: pageSize } });
  };

  return (
    <>
      <PageHeader title="关注的课程"></PageHeader>
      <Head>
        <title>关注的课程 - SJTU选课社区</title>
      </Head>
      <Card title={`共有${courses ? courses.count : 0}门课`}>
        <CourseList
          loading={loading}
          count={courses?.count}
          courses={courses?.results}
          onPageChange={onPageChange}
          pagination={pagination}
        />
      </Card>
    </>
  );
};

export default FollowCoursePage;
