import { Button, Card, Checkbox, Col, Collapse, Grid, Row, Tag } from "antd";
import { useState } from "react";

import { CourseFilterItem, CourseFilters } from "@/lib/models";

const CourseFilterCard = ({
  filters,
  selectedCategories,
  selectedDepartments,
  defaultOnlyHasReviews,
  onClick,
  loading,
}: {
  filters: CourseFilters | undefined;
  selectedCategories?: string;
  selectedDepartments?: string;
  defaultOnlyHasReviews?: boolean;
  onClick: (
    onlyHasReviews: boolean,
    checkedCategories: number[],
    checkedDepartments: number[]
  ) => void;
  loading: boolean;
}) => {
  const [checkedCategories, setCheckedCategories] = useState<number[]>(
    selectedCategories
      ? selectedCategories.split(",").map((item) => parseInt(item))
      : []
  );
  const [checkedDepartments, setCheckedDepartments] = useState<number[]>(
    selectedDepartments
      ? selectedDepartments.split(",").map((item) => parseInt(item))
      : []
  );
  const [onlyHasReviews, setOnlyHasReviews] = useState<boolean>(false);
  const screens = Grid.useBreakpoint();
  return (
    <Card
      title="筛选"
      extra={
        <Button
          onClick={() =>
            onClick(onlyHasReviews, checkedCategories, checkedDepartments)
          }
        >
          确认
        </Button>
      }
      className={filters && "filter-card"}
      loading={loading}
    >
      {filters && (
        <Collapse
          defaultActiveKey={
            screens.md ? ["reviews", "categories", "departments"] : ["reviews"]
          }
          ghost
        >
          <Collapse.Panel header="点评" key="reviews">
            <Checkbox
              defaultChecked={defaultOnlyHasReviews}
              onChange={(e) => setOnlyHasReviews(e.target.checked)}
            >
              仅显示有点评的课程
            </Checkbox>
          </Collapse.Panel>
          <Collapse.Panel header="课程类别" key="categories">
            <Checkbox.Group
              defaultValue={checkedCategories}
              onChange={(e) => {
                setCheckedCategories(e as number[]);
              }}
            >
              <Row>
                {filters.categories.map((item: CourseFilterItem) => (
                  <Col span={24} key={item.id}>
                    <Checkbox value={item.id}>{item.name}</Checkbox>
                    <Tag>{item.count}</Tag>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </Collapse.Panel>
          <Collapse.Panel header="开课单位" key="departments">
            <Checkbox.Group
              defaultValue={checkedDepartments}
              onChange={(e) => {
                setCheckedDepartments(e as number[]);
              }}
            >
              <Row>
                {filters.departments.map((item: CourseFilterItem) => (
                  <Col span={24} key={item.id}>
                    <Checkbox value={item.id}>{item.name}</Checkbox>
                    <Tag>{item.count}</Tag>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </Collapse.Panel>
        </Collapse>
      )}
    </Card>
  );
};

export default CourseFilterCard;
