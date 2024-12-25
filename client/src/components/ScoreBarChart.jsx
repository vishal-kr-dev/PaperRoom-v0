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

const ScoreBarChart = () => {
  const newData = [
    { name: "User 1", score: 98 },
    { name: "User 2", score: 87 },
    { name: "User 3", score: 75 },
    { name: "User 4", score: 65 },
    { name: "User 5", score: 50 },
  ];

  const sortedData = newData.sort((a, b) => b.score - a.score);
  const colors = ["#FFD700", "#C0C0C0", "#CD7F32", "#848482"];

  const data = sortedData.map((data, index) => {
    const rank = index < 3 ? index : 3;
    return { ...data, color: colors[rank] };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <Tooltip />
        <Bar
          dataKey="score"
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
