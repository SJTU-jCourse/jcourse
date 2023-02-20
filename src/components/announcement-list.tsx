import { Alert, List } from "antd";

import { Announcement } from "@/lib/models";

const AnnouncementList = ({
  announcements,
}: {
  announcements: Announcement[];
}) => {
  return (
    <List
      className="announcement-list"
      dataSource={announcements}
      split={false}
      itemLayout="vertical"
      renderItem={(announcement: Announcement) => {
        return (
          <List.Item
            key={announcement.created_at}
            className="announcement-item"
          >
            <Alert
              className="announcement"
              description={
                <>
                  <div>{announcement.message}</div>
                  {announcement.url && <a href={announcement.url}>相关链接</a>}
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
