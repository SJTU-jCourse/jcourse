import { writeReport } from '@/services/report';
import { Button, Form, Input, Modal, Typography, message } from 'antd';
import { Link } from 'umi';
const { TextArea } = Input;
const { Text } = Typography;
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
  const [form] = Form.useForm();

  const handleSubmit = (value: { comment: string }) => {
    writeReport(value.comment).then((resp) => {
      if (resp.status == 201) {
        message.success('提交成功，请等候管理员回复！');
        if (onOk) onOk();
      }
    });
  };

  return (
    <Modal
      title={title || '期待收到你的建议！'}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark="optional"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="comment"
          label="反馈内容"
          rules={[
            {
              required: true,
              message: '请填写反馈内容',
              validator: (_, value: string) => {
                const trimed = value.trim();
                return trimed != '' && trimed != defaultComment
                  ? Promise.resolve()
                  : Promise.reject();
              },
            },
          ]}
          initialValue={defaultComment}
          help={
            <Text type="secondary">
              您可以在页面底部
              <Link target="_blank" to="/report">
                反馈
              </Link>
              查看反馈记录和管理员回复。
            </Text>
          }
        >
          <TextArea rows={10} maxLength={817} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ReportModal;
