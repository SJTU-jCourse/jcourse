import { Card, PageHeader } from "antd";
import Head from "next/head";

import ReviewList from "@/components/review-list";
import { useMyReviews } from "@/services/review";

const ActivityPage = () => {
  const { reviews, loading } = useMyReviews();

  return (
    <PageHeader
      title="我的点评"
      backIcon={false}
      subTitle={`共有${reviews ? reviews.length : 0}条点评`}
    >
      <Head>
        <title>我的点评 - SJTU选课社区</title>
      </Head>
      <Card>
        <ReviewList
          loading={loading}
          count={reviews?.length}
          reviews={reviews}
        />
      </Card>
    </PageHeader>
  );
};

export default ActivityPage;
