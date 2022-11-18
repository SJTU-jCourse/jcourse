import { Alert, List } from "antd";

import { Announcement } from "@/lib/models";

const AnnouncementList = ({
  announcements,
}: {
  announcements: Announcement[];
}) => {
  return (
    <List
      className="notice-list"
      dataSource={announcements}
      split={false}
      itemLayout="vertical"
      renderItem={(notice: Announcement) => {
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
export default AnnouncementList;
