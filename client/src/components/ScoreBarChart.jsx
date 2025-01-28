import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const ScoreBarChart = ({data}) => {

  const sortedData = data.sort((a, b) => b.monthlyPoints - a.monthlyPoints);
  const colors = ["#FFD700", "#C0C0C0", "#CD7F32", "#848482"];

  const graphData = sortedData.map((data, index) => {
    const rank = index < 3 ? index : 3;
    return { ...data, color: colors[rank] };
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={graphData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="username" />
        {/* <Tooltip /> */}
        <Bar
          dataKey="monthlyPoints"
          label={{ position: "top" }}
          isAnimationActive={true}
          shape={(props) => {
            const { x, y, width, height, payload } = props;
            return (
              <rect
                x={x}
                y={y}
                width={width}
                height={height}
                fill={payload.color}
                radius={[10, 10, 0, 0]}
              />
            );
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ScoreBarChart;
