import { ReviewReaction } from "@/lib/models";
import {
  DislikeOutlined,
  DislikeTwoTone,
  LikeOutlined,
  LikeTwoTone,
} from "@ant-design/icons";
import { Button, Space } from "antd";
import { useState } from "react";
const ReviewReactionButton = ({
  onReaction,
  reactionProps,
}: {
  onReaction: (reaction_id: number, reaction: number) => void;
  reactionProps: ReviewReaction;
}) => {
  const [approves, setApproves] = useState<number>(reactionProps.approves);
  const [disapproves, setDisapproves] = useState<number>(
    reactionProps.disapproves
  );
  const [myReaction, setMyReaction] = useState<number>(
    reactionProps.reaction || 0
  );
  return (
    <Space>
      <Button
        type="text"
        size="small"
        onClick={() => {
          let newReaction: number = 0;
          if (myReaction == 0) {
            //没点赞过
            setApproves(approves + 1);
            newReaction = 1;
          } else if (myReaction == 1) {
            //点赞过，撤销点赞
            setApproves(approves - 1);
            newReaction = 0;
          } else if (myReaction == -1) {
            //反对过，改为点赞
            setApproves(approves + 1);
            setDisapproves(disapproves - 1);
            newReaction = 1;
          }
          setMyReaction(newReaction);
          onReaction(reactionProps.id, newReaction);
        }}
      >
        {myReaction == 1 ? <LikeTwoTone /> : <LikeOutlined />} {approves}
      </Button>
      <Button
        type="text"
        size="small"
        onClick={() => {
          let newReaction: number = 0;
          if (myReaction == 0) {
            //没反对过
            setDisapproves(disapproves + 1);
            newReaction = -1;
          } else if (myReaction == -1) {
            //反对过，撤销反对
            setDisapproves(disapproves - 1);
            newReaction = 0;
          } else if (myReaction == 1) {
            //支持过，改为反对
            setApproves(approves - 1);
            setDisapproves(disapproves + 1);
            newReaction = -1;
          }
          setMyReaction(newReaction);
          onReaction(reactionProps.id, newReaction);
        }}
      >
        {myReaction == -1 ? <DislikeTwoTone /> : <DislikeOutlined />}{" "}
        {disapproves}
      </Button>
    </Space>
  );
};
export default ReviewReactionButton;
