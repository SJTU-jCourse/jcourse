import useSWR from "swr";
import { Semester } from "@/lib/models";
import { fetcher } from "@/services/request";

export function useSemesters() {
  const { data, error } = useSWR<Semester[]>("/api/semester/", fetcher);
  let semesterMap = undefined;
  if (data) {
    semesterMap = new Map(data.map((item: Semester) => [item.id, item.name]));
  }

  const avaiableSemesters = data?.filter((item) => item.available);

  return {
    semesters: data,
    avaiableSemesters,
    semesterMap,
    loading: !error && !data,
    error: error,
  };
}
