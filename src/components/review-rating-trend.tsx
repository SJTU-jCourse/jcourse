import {
  Bar,
  ComposedChart,
  LabelList,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ReviewFilterSemesterItem } from "@/lib/models";

const ReviewRatingTrend = ({ data }: { data?: ReviewFilterSemesterItem[] }) => {
  return (
    <ResponsiveContainer height={400}>
      <ComposedChart
        data={data}
        margin={{ left: 0, right: 0, top: 5, bottom: 0 }}
      >
        <Bar name="点评数量" yAxisId="left" dataKey="count" fill="#adc6ff">
          <LabelList dataKey="count" position="top" />
        </Bar>
        <Line
          name="平均评分"
          yAxisId="right"
          type="monotone"
          dataKey="avg"
          stroke="#82ca9d"
          strokeWidth={3}
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
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ReviewRatingTrend;
