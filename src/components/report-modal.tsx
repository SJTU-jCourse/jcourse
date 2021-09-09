import { writeReport } from '@/services/report';
import { Input, Modal, message } from 'antd';
import { useState } from 'react';
const { TextArea } = Input;
const ReportModal = ({
  visible,
  defaultComment,
  title,
  onOk,
  onCancel,
}: {
  visible: boolean;
  defaultComment?: string;
  title?: string;
  onOk?: () => void;
  onCancel?: () => void;
}) => {
  const [comment, setComment] = useState<string>(defaultComment || '');

  const handleSubmit = () => {
    if (comment == '') {
      message.info('请填写反馈');
      return;
    }

    writeReport(comment).then((resp) => {
      if (resp.status == 201) {
        setComment('');
        message.success('提交成功');
        if (onOk) onOk();
      }
    });
  };

  return (
    <Modal
      title={title || '期待收到你的建议！'}
      visible={visible}
      onOk={handleSubmit}
      onCancel={onCancel}
    >
      <TextArea
        showCount
        rows={10}
        maxLength={817}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
    </Modal>
  );
};

export default ReportModal;
