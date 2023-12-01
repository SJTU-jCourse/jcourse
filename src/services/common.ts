import { CommonInfo, CommonInfoDTO } from "@/lib/models";
import { fetcher } from "@/services/request";
import useSWR from "swr";

export function useCommonInfo() {
  const { data, error } = useSWR<CommonInfoDTO>("/api/common/", fetcher);

  let commonInfo: CommonInfo = {
    announcements: [],
    semesters: [],
    available_semesters: [],
    user: {
      id: 0,
      username: "",
      is_staff: false,
      account: null,
    },
    semesterMap: new Map(),
    my_reviews: new Map(),
    enrolled_courses: new Map(),
    reviewed_courses: new Map(),
    promotions: new Map(),
  };
  if (data) {
    commonInfo.announcements = data.announcements;
    commonInfo.user = data.user;
    commonInfo.user.account = localStorage.getItem("account");
    commonInfo.semesters = data.semesters;
    commonInfo.available_semesters = data.semesters.filter(
      (item) => item.available
    );
    data.semesters.forEach((item) => {
      commonInfo.semesterMap.set(item.id, item.name);
    });
    data.my_reviews.forEach((item) => {
      commonInfo.my_reviews.set(item.id, item);
      commonInfo.reviewed_courses.set(item.course_id, item);
    });
    data.enrolled_courses.forEach((item) => {
      commonInfo.enrolled_courses.set(item.course_id, item);
    });
    data.promotions.forEach((item) => {
      commonInfo.promotions.set(item.touchpoint, item);
    });
  }
  return {
    commonInfo,
    loading: !error && !data,
    error: error,
  };
}
