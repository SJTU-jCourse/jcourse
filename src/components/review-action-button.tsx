import { ReviewAction } from '@/models';
import {
  DislikeOutlined,
  DislikeTwoTone,
  LikeOutlined,
  LikeTwoTone,
} from '@ant-design/icons';
import { Button, Space } from 'antd';
import { useState } from 'react';
const ReviewActionButton = ({
  onAction,
  actionProps,
}: {
  onAction: Function;
  actionProps: ReviewAction;
}) => {
  const [approves, setApproves] = useState<number>(actionProps.approves);
  const [disapproves, setDisapproves] = useState<number>(
    actionProps.disapproves,
  );
  const [myAction, setMyAction] = useState<number>(actionProps.action || 0);
  return (
    <Space>
      <Button
        type="text"
        size="small"
        onClick={() => {
          let newAction: number = 0;
          if (myAction == 0) {
            //没点赞过
            setApproves(approves + 1);
            newAction = 1;
          } else if (myAction == 1) {
            //点赞过，撤销点赞
            setApproves(approves - 1);
            newAction = 0;
          } else if (myAction == -1) {
            //反对过，改为点赞
            setApproves(approves + 1);
            setDisapproves(disapproves - 1);
            newAction = 1;
          }
          setMyAction(newAction);
          onAction(actionProps.id, newAction);
        }}
      >
        {myAction == 1 ? <LikeTwoTone /> : <LikeOutlined />} {approves}
      </Button>
      <Button
        type="text"
        size="small"
        onClick={() => {
          let newAction: number = 0;
          if (myAction == 0) {
            //没反对过
            setDisapproves(disapproves + 1);
            newAction = -1;
          } else if (myAction == -1) {
            //反对过，撤销反对
            setDisapproves(disapproves - 1);
            newAction = 0;
          } else if (myAction == 1) {
            //支持过，改为反对
            setApproves(approves - 1);
            setDisapproves(disapproves + 1);
            newAction = -1;
          }
          setMyAction(newAction);
          onAction(actionProps.id, newAction);
        }}
      >
        {myAction == -1 ? <DislikeTwoTone /> : <DislikeOutlined />}{' '}
        {disapproves}
      </Button>
    </Space>
  );
};
export default ReviewActionButton;
