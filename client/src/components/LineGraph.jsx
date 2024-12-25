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

const data = {
  users: [
    {
      user: "User 1",
      points: [1, 3, 5, 1, 3, 5, 1, 3, 0, 1, 3, 5, 1, 3],
    },
    {
      user: "User 2",
      points: [3, 1, 0, 5, 1, 3, 5, 1, 3, 5, 9, 3, 5, 1],
    },
    {
      user: "User 3",
      points: [5, 1, 3, 5, 1, 3, 0, 1, 3, 5, 1, 3, 5, 1],
    },
  ],
  dates: [
    "2024-01-01",
    "2024-01-02",
    "2024-01-03",
    "2024-01-04",
    "2024-01-05",
    "2024-01-06",
    "2024-01-07",
    "2024-01-08",
    "2024-01-09",
    "2024-01-10",
    "2024-01-11",
    "2024-01-12",
    "2024-01-13",
    "2024-01-14",
  ],
};

const LineGraph = () => {
  const colors = ["#FF5733", "#33B5FF", "#4CAF50", "#FFC107", "#9C27B0"];

  const graphData = data.dates.map((date, index) => {
    const entry = { name: date };
    data.users.forEach((user) => {
      entry[user.user] = user.points[index];
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
            key={`${item.user}-${index}`}
            type="monotone"
            dataKey={item.user}
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
