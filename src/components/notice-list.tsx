import { Notice } from "@/lib/models";
import { Alert, List } from "antd";
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
                <>
                  <div>{notice.message}</div>
                  {notice.url && <a href={notice.url}>相关链接</a>}
                </>
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
