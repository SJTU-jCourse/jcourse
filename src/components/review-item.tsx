import { Review } from "@/lib/models";
import { doReviewAction } from "@/services/review";
import { Alert, List, Space, Tooltip } from "antd";
import Link from "next/link";
import ReviewActionButton from "./review-action-button";

const ReviewItem = ({
  review,
}: React.PropsWithChildren<{ review: Review }>) => {
  return (
    <List.Item
      key={review.id}
      className={"review-item"}
      actions={[
        <Tooltip
          key="time"
          title={
            review.modified != review.created
              ? "首发于" + review.created
              : undefined
          }
        >
          <div>{review.modified}</div>
        </Tooltip>,
        <ReviewActionButton
          key="action"
          onAction={doReviewAction}
          actionProps={{
            id: review.id,
            ...review.actions,
          }}
        />,
        <div key="id">{"#" + review.id}</div>,
      ]}
    >
      <Space direction="vertical" className="review-body">
        {review.moderator_remark && (
          <Alert message={review.moderator_remark} type="warning" showIcon />
        )}

        {review.course && (
          <Space wrap>
            <Link href={"/course/" + review.course.id}>
              <a>
                {review.course.code} {review.course.name}（
                {review.course.teacher}）
              </a>
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
                {review.semester}
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
        <div className="comment">{review.comment}</div>
        {review.is_mine && (
          <Link href={`/review?review_id=${review.id}`}>
            <a>修改点评</a>
          </Link>
        )}
      </Space>
    </List.Item>
  );
};

export default ReviewItem;
