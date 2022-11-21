import { Button, Col, Row, Select } from "antd";
import { useState } from "react";

import { ReviewFilterProps, ReviewFilterValue } from "@/lib/models";

enum ReviewOrder {
  LATEST_MODIFIED = 0,
  OLDEST_MODIFIED = 1,
  APPROVE_FROM_HIGH_TO_LOW = 2,
  RATING_FROM_HIGH_TO_LOW = 3,
  RATING_FROM_LOW_TO_HIGH = 4,
}

const ReviewFilter = ({
  filters,
  defaultValue,
  onClick,
}: {
  filters?: ReviewFilterProps;
  defaultValue?: ReviewFilterValue;
  onClick?: (value: ReviewFilterValue) => void;
}) => {
  const [order, setOrder] = useState<number>(0);
  const [semester, setSemester] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);

  const orderOptions = [
    { label: "最新回复", value: ReviewOrder.LATEST_MODIFIED },
    { label: "最早回复", value: ReviewOrder.OLDEST_MODIFIED },
    { label: "最高获赞", value: ReviewOrder.APPROVE_FROM_HIGH_TO_LOW },
    { label: "最高评分", value: ReviewOrder.RATING_FROM_HIGH_TO_LOW },
    { label: "最低评分", value: ReviewOrder.RATING_FROM_LOW_TO_HIGH },
  ];
  const semesterOptions = [{ label: "全部", value: 0 }].concat(
    filters
      ? filters.semesters.map((item) => {
          return {
            label: item.name + "（" + item.count + "条）",
            value: item.id,
          };
        })
      : []
  );
  const ratingOptions = [{ label: "全部", value: 0 }].concat(
    filters
      ? filters.ratings.map((item) => {
          return {
            label: item.rating + "（" + item.count + "条）",
            value: item.rating,
          };
        })
      : []
  );
  return (
    <Row gutter={[16, 16]}>
      <Col>
        排序：
        <Select
          dropdownMatchSelectWidth={false}
          options={orderOptions}
          defaultValue={defaultValue?.order || 0}
          onSelect={(value: number) => {
            setOrder(value);
          }}
        ></Select>
      </Col>
      <Col>
        学期：
        <Select
          dropdownMatchSelectWidth={false}
          defaultValue={defaultValue?.semester || 0}
          options={semesterOptions}
          onSelect={(value: number) => {
            setSemester(value);
          }}
        ></Select>
      </Col>
      <Col>
        推荐指数：
        <Select
          dropdownMatchSelectWidth={false}
          defaultValue={defaultValue?.rating || 0}
          options={ratingOptions}
          onSelect={(value: number) => {
            setRating(value);
          }}
        ></Select>
      </Col>
      <Button
        onClick={() => {
          onClick && onClick({ order, semester, rating });
        }}
      >
        筛选
      </Button>
    </Row>
  );
};

export default ReviewFilter;
