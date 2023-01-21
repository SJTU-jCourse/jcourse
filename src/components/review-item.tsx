import { Alert, List, Space, Tooltip, Typography } from "antd";
import Link from "next/link";
import { useState } from "react";

import MDPreview from "@/components/md-preview";
import ReviewReactionButton from "@/components/review-reaction-button";
import ReviewRevisionViewModal from "@/components/review-revision-modal";
import { UserContext } from "@/lib/context";
import { Review } from "@/lib/models";
import { doReviewReaction } from "@/services/review";

const ReviewItem = ({
  review,
}: React.PropsWithChildren<{ review: Review }>) => {
  const [revisionModalOpen, setRevisionModalOpen] = useState<boolean>(false);
  const edited = review.modified != review.created;
  return (
    <UserContext.Consumer>
      {(user) => {
        return (
          <List.Item
            key={review.id}
            className={"review-item"}
            actions={[
              <div key="id">{"#" + review.id}</div>,
              <ReviewReactionButton
                key="reaction"
                onReaction={doReviewReaction}
                reactionProps={{
                  id: review.id,
                  ...review.reactions,
                }}
              />,
            ]}
          >
            {user?.is_staff && revisionModalOpen && (
              <ReviewRevisionViewModal
                review={review}
                open={revisionModalOpen}
                onCancel={() => {
                  setRevisionModalOpen(false);
                }}
              ></ReviewRevisionViewModal>
            )}
            <Space direction="vertical" className="review-body">
              {review.moderator_remark && (
                <Alert
                  message={review.moderator_remark}
                  type="warning"
                  showIcon
                />
              )}
              {review.course && (
                <Space wrap>
                  <Link href={"/course/" + review.course.id}>
                    {review.course.code} {review.course.name}（
                    {review.course.teacher}）
                  </Link>
                </Space>
              )}
              <Space wrap>
                <span>
                  <strong>推荐指数：</strong>
                  {review.rating}
                </span>
                {review.semester && (
                  <span>
                    <>
                      <strong>学期：</strong>
                      {typeof review.semester == "string"
                        ? review.semester
                        : review.semester.name}
                    </>
                  </span>
                )}
                {review.score && (
                  <span>
                    <strong>成绩：</strong>
                    {review.score}
                  </span>
                )}
              </Space>
              <MDPreview className="comment" src={review.comment} />
              <Space>
                {edited ? (
                  <Tooltip
                    key="time"
                    title={"首发于" + review.created}
                    zIndex={1}
                  >
                    <Typography.Text
                      type="secondary"
                      onClick={() => {
                        if (user?.is_staff) {
                          setRevisionModalOpen(true);
                        }
                      }}
                    >
                      编辑于 {review.modified}
                    </Typography.Text>
                  </Tooltip>
                ) : (
                  <Typography.Text type="secondary">
                    发表于 {review.modified}
                  </Typography.Text>
                )}
                {(review.is_mine || user?.is_staff) && (
                  <Link href={`/write-review?review_id=${review.id}`}>
                    修改点评
                  </Link>
                )}
              </Space>
            </Space>
          </List.Item>
        );
      }}
    </UserContext.Consumer>
  );
};

export default ReviewItem;
