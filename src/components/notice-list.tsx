import config from '@/config';
import { Notice } from '@/models';
import { Alert, List } from 'antd';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
const NoticeList = ({ notices }: { notices: Notice[] }) => {
  return (
    <List
      dataSource={notices}
      split={false}
      itemLayout="vertical"
      renderItem={(notice: Notice) => {
        return (
          <List.Item
            key={notice.created}
            style={{ padding: 0, marginTop: config.LAYOUT_MARGIN }}
          >
            <Alert
              description={
                <ReactMarkdown
                  children={notice.message}
                  remarkPlugins={[remarkGfm]}
                />
              }
              banner
              showIcon={false}
              type="info"
              style={{
                alignContent: 'center',
                marginLeft: config.LAYOUT_MARGIN,
                marginRight: config.LAYOUT_MARGIN,
                maxWidth: config.LAYOUT_WIDTH - 2 * config.LAYOUT_MARGIN,
              }}
            />
          </List.Item>
        );
      }}
    />
  );
};
export default NoticeList;
