import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ReviewFilterSemesterItem } from "@/lib/models";

const ReviewRatingTrend = ({ data }: { data?: ReviewFilterSemesterItem[] }) => {
  return (
    <ResponsiveContainer height={400}>
      <LineChart data={data} margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
        <Line
          name="点评数量"
          yAxisId="left"
          type="monotone"
          dataKey="count"
          stroke="#8884d8"
          strokeWidth={2}
        />
        <Line
          name="平均评分"
          yAxisId="right"
          type="monotone"
          dataKey="avg"
          stroke="#82ca9d"
          strokeWidth={2}
        />
        <XAxis name="学期" reversed={true} dataKey="name" />
        <YAxis yAxisId="left" />
        <YAxis
          yAxisId="right"
          orientation="right"
          domain={[0, 6]}
          ticks={[1, 2, 3, 4, 5]}
        />
        <Legend></Legend>
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ReviewRatingTrend;
