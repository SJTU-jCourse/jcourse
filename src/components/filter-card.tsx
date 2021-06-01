import { Filter } from '@/models';
import { Button, Card, Checkbox, Divider, Tag } from 'antd';
import { useState } from 'react';

const FilterCard = ({
  categories,
  departments,
  onClick,
  loading,
}: {
  categories: Filter[];
  departments: Filter[];
  onClick: Function;
  loading: boolean;
}) => {
  const [checkedCategories, setCheckedCategories] = useState<number[]>([]);
  const [checkedDepartments, setCheckedDepartments] = useState<number[]>([]);

  return (
    <Card
      title="筛选"
      extra={
        <Button onClick={() => onClick(checkedCategories, checkedDepartments)}>
          确认
        </Button>
      }
      loading={loading}
    >
      <h3>课程类别</h3>
      <Checkbox.Group onChange={(e) => setCheckedCategories(e)}>
        {categories.map((item) => (
          <div key={item.id}>
            <Checkbox value={item.id}>{item.name}</Checkbox>
            <Tag>{item.count}</Tag>
          </div>
        ))}
      </Checkbox.Group>
      <Divider></Divider>
      <h3>开课单位</h3>
      <Checkbox.Group onChange={(e) => setCheckedDepartments(e)}>
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
