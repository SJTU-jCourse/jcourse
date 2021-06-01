import { Button, Card, Divider, Input, PageHeader, message } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { history } from 'umi';
const { TextArea } = Input;
const Report = () => {
  const [comment, setComment] = useState<string>('');
  const handleSubmit = () => {
    if (comment == '') {
      message.info('请填写反馈');
      return;
    }

    axios.post('/api/report/', comment).then((resp) => {
      console.log(resp.data);
      if (resp.status == 200) {
        message.success('提交成功');
        history.goBack();
      }
    });
  };
  return (
    <PageHeader title="反馈" onBack={() => history.goBack()}>
      <Card>
        <div>期待收到你的建议！如果希望得到回复请留下联系方式，谢谢！</div>
        <TextArea
          showCount
          rows={10}
          onChange={(e) => setComment(e.target.value)}
        />
        <Divider />
        <Button type="primary" onClick={handleSubmit}>
          提交
        </Button>
      </Card>
    </PageHeader>
  );
};
export default Report;
