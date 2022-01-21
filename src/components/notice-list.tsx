import { Notice } from '@/models';
import { Alert, List } from 'antd';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
const NoticeList = ({ notices }: { notices: Notice[] }) => {
  return (
    <List
      className="notice-list"
      dataSource={notices}
      split={false}
      itemLayout="vertical"
      renderItem={(notice: Notice) => {
        return (
          <List.Item key={notice.created} className="notice-item">
            <Alert
              className="notice"
              description={
                <ReactMarkdown
                  children={notice.message}
                  remarkPlugins={[remarkGfm]}
                />
              }
              banner
              showIcon={false}
              type="info"
            />
          </List.Item>
        );
      }}
    />
  );
};
export default NoticeList;
