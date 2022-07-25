import ReviewList from "@/components/review-list";
import { Pagination } from "@/lib/models";
import { useReviews } from "@/services/review";
import { Card, PageHeader } from "antd";
import { useRouter } from "next/router";
import Config from "@/config/config";
import Head from "next/head";
const LatestPage = () => {
  const router = useRouter();
  const { page, size } = router.query;

  const pagination: Pagination = {
    page: page ? parseInt(page as string) : 1,
    pageSize: size ? parseInt(size as string) : Config.PAGE_SIZE,
  };

  const { reviews, loading } = useReviews(pagination);

  const onPageChange = (page: number, pageSize: number) => {
    router.push({ query: { page: page, size: pageSize } });
  };

  return (
    <PageHeader
      title="最新点评"
      backIcon={false}
      subTitle={`共有${reviews ? reviews.count : 0}个点评`}
    >
      <Head>
        <title>最新点评 - SJTU选课社区</title>
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
    </PageHeader>
  );
};

export default LatestPage;
