import { Filter } from '@/models';
import { Button, Card, Checkbox, Divider, Tag } from 'antd';
import { useState } from 'react';

const FilterCard = ({
  categories,
  departments,
  selectedCategories,
  selectedDepartments,
  defaultOnlyHasReviews,
  onClick,
  loading,
}: {
  categories: Filter[];
  departments: Filter[];
  selectedCategories?: string;
  selectedDepartments?: string;
  defaultOnlyHasReviews?: boolean;
  onClick: (
    onlyHasReviews: boolean,
    checkedCategories: number[],
    checkedDepartments: number[],
  ) => void;
  loading: boolean;
}) => {
  const [checkedCategories, setCheckedCategories] = useState<number[]>(
    selectedCategories
      ? selectedCategories.split(',').map((item) => parseInt(item))
      : [],
  );
  const [checkedDepartments, setCheckedDepartments] = useState<number[]>(
    selectedDepartments
      ? selectedDepartments.split(',').map((item) => parseInt(item))
      : [],
  );
  const [onlyHasReviews, setOnlyHasReviews] = useState<boolean>(false);

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
      loading={loading}
    >
      <Checkbox
        defaultChecked={defaultOnlyHasReviews}
        onChange={(e) => setOnlyHasReviews(e.target.checked)}
      >
        仅显示有点评的课程
      </Checkbox>
      <Divider />
      <h3>课程类别</h3>

      <Checkbox.Group
        defaultValue={checkedCategories}
        onChange={(e) => {
          setCheckedCategories(e as number[]);
        }}
      >
        {categories.map((item) => (
          <div key={item.id}>
            <Checkbox value={item.id}>{item.name}</Checkbox>
            <Tag>{item.count}</Tag>
          </div>
        ))}
      </Checkbox.Group>
      <Divider></Divider>
      <h3>开课单位</h3>
      <Checkbox.Group
        defaultValue={checkedDepartments}
        onChange={(e) => {
          setCheckedDepartments(e as number[]);
        }}
      >
        {departments.map((item) => (
          <div key={item.id}>
            <Checkbox value={item.id}>{item.name}</Checkbox>
            <Tag>{item.count}</Tag>
          </div>
        ))}
      </Checkbox.Group>
    </Card>
  );
};

export default FilterCard;
