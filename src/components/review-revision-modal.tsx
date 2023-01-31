import { Grid, Modal, Pagination, Skeleton, Space } from "antd";
import Link from "next/link";
import { useState } from "react";

import MDPreview from "@/components/md-preview";
import { Review, ReviewRevision } from "@/lib/models";
import { useReviewRevisions } from "@/services/review";

const ReviewRevisionView = ({ revision }: { revision?: ReviewRevision }) => {
  if (!revision) return <></>;
  return (
    <Space direction="vertical" className="review-body">
      {revision.course && (
        <Space wrap>
          <Link href={"/course/" + revision.course.id}>
            {revision.course.code} {revision.course.name}（
            {revision.course.teacher}）
          </Link>
        </Space>
      )}
      <Space wrap>
        <span>
          <strong>推荐指数：</strong>
          {revision.rating}
        </span>
        {revision.semester && (
          <span>
            <>
              <strong>学期：</strong>
              {revision.semester}
            </>
          </span>
        )}
        {revision.score && (
          <span>
            <strong>成绩：</strong>
            {revision.score}
          </span>
        )}
      </Space>
      <MDPreview className="comment" src={revision.comment} />
    </Space>
  );
};

const ReviewRevisionViewModal = ({
  review,
  open,
  onCancel,
}: {
  review: Review;
  open: boolean;
  onCancel?: () => void;
}) => {
  const screens = Grid.useBreakpoint();
  const { revisions, loading } = useReviewRevisions(review.id);

  const count = revisions?.results.length || 1;
  const [index, setIndex] = useState<number>(0);

  const onChange = (page: number) => {
    setIndex(page - 1);
  };
  return (
    <Modal
      title="修订记录"
      open={open}
      footer={null}
      onCancel={onCancel}
      width={screens.md ? "80%" : 520}
    >
      <Space direction="vertical">
        <Space>
          <Pagination
            simple
            onChange={onChange}
            current={index + 1}
            total={count}
            pageSize={1}
          ></Pagination>
          {revisions?.results[index].created_at}
        </Space>
        <Skeleton loading={loading}>
          <ReviewRevisionView
            revision={revisions?.results[index]}
          ></ReviewRevisionView>
        </Skeleton>
      </Space>
    </Modal>
  );
};

export default ReviewRevisionViewModal;
