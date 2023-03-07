import { Button, Card } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";

import PageHeader from "@/components/page-header";
import ReviewList from "@/components/review-list";
import Config from "@/config/config";
import { Pagination } from "@/lib/models";
import { useFollowedReviews } from "@/services/review";

const FollowReviewPage = () => {
  const router = useRouter();
  const { page, size } = router.query;

  const pagination: Pagination = {
    page: page ? parseInt(page as string) : 1,
    pageSize: size ? parseInt(size as string) : Config.PAGE_SIZE,
  };

  const { reviews, loading } = useFollowedReviews(pagination);

  const onPageChange = (page: number, pageSize: number) => {
    router.push({ query: { page: page, size: pageSize } });
  };

  return (
    <>
      <PageHeader
        title="关注课程的点评"
        subTitle={`共有${reviews ? reviews.count : 0}个点评`}
        extra={
          <Button
            type="link"
            onClick={() => {
              router.push("/follow-course");
            }}
          >
            关注的课程
          </Button>
        }
      ></PageHeader>
      <Head>
        <title>关注 - SJTU选课社区</title>
      </Head>
      <Card>
        <ReviewList
          loading={loading}
          count={reviews?.count}
          reviews={reviews?.results}
          onPageChange={onPageChange}
          pagination={pagination}
        />
      </Card>
    </>
  );
};

export default FollowReviewPage;
