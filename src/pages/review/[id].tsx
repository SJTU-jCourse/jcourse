import { Skeleton } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import Config from "@/config/config";
import { useReviewLocationInCourse } from "@/services/review";

const ReviewLocationPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useReviewLocationInCourse(id as string);

  useEffect(() => {
    if (data)
      router.replace(
        `/course/${data.course}?page=${
          Math.floor(data.location / Config.PAGE_SIZE) + 1
        }#review-${id}`
      );
  }, [data]);
  return (
    <>
      <Head>
        <title>跳转中……</title>
      </Head>
      <Skeleton />
    </>
  );
};

export default ReviewLocationPage;
