import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LineGraph = ({ data }) => {
  const colors = ["#FF5733", "#33B5FF", "#4CAF50", "#FFC107", "#9C27B0"];

  const graphData = data.dates.map((date, index) => {
    const entry = { name: date };
    data.users.forEach((user) => {
      entry[user.username] = user.points[index];
    });
    return entry;
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={graphData}>
        {/* <CartesianGrid strokeDasharray="0 9" /> */}
        <XAxis dataKey="name" tick={{ fill: "white" }} />
        <YAxis tick={{ fill: "white" }} />
        <Tooltip />
        <Legend wrapperStyle={{ color: "white" }} />

        {data.users.map((item, index) => (
          <Line
            key={`${item.username}-${index}`}
            type="monotone"
            dataKey={item.username}
            stroke={colors[index % colors.length]}
            dot={true}
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineGraph;
