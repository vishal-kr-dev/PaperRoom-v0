import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  plugins,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineGraph = (data) => {
  const options = {
    responsive: true, // Make the chart responsive
    plugins: {
      legend: {
        labels: {
          color: "white", // Set the color of legend text to white
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
      },
    },
  };

  const graphData = {
    labels: data.data.dates,
    datasets: data.data.users.map((item, index) => {
      const colors = ["#FF5733", "#33B5FF", "#4CAF50", "#FFC107", "#9C27B0"];
      const color = colors[index % colors.length];

      return {
        label: item.user,
        data: item.points,
        borderColor: color,
        tension: 0.1,
      };
    }),
  };

  return <Line options={options} data={graphData} />;
};

export default LineGraph;
