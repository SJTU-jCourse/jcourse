import { Announcement } from "@/lib/models";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AnnouncementList from "../announcement-list";

describe("announcement list", () => {
  it("shows nothing to a empty list", () => {
    const announcements: Announcement[] = [];
    render(<AnnouncementList announcements={announcements} />);
    expect(screen.getByText("No data")).toBeInTheDocument();
  });

  it("shows an item format without url", () => {
    const announcements: Announcement[] = [
      { title: "title", message: "message", created: "2022", url: null },
    ];
    render(<AnnouncementList announcements={announcements} />);
    expect(screen.queryByText("title")).not.toBeInTheDocument();
    expect(screen.getByText("message")).toBeInTheDocument();
    expect(screen.queryByText("2022")).not.toBeInTheDocument();
    expect(screen.queryByText("相关链接")).not.toBeInTheDocument();
  });

  it("shows an item format with url", () => {
    const announcements: Announcement[] = [
      { title: "title", message: "message", created: "2022", url: "url" },
    ];
    render(<AnnouncementList announcements={announcements} />);
    expect(screen.getByText("相关链接")).toBeInTheDocument();
  });
});
