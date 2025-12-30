import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getTrend } from "../services/api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function CollectionTrend() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    getTrend().then((data) => {
      setChartData({
        labels: data.map((d) => d.month),
        datasets: [
          {
            label: "Collected",
            data: data.map((d) => d.collected_tons),
            borderWidth: 2,
          },
          {
            label: "Recycled",
            data: data.map((d) => d.recycled_tons),
            borderWidth: 2,
          },
        ],
      });
    });
  }, []);

  if (!chartData) return <p>Loading chart...</p>;

  return <Line data={chartData} />;
}

export default CollectionTrend;
