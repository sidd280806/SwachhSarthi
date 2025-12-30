import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { getCategories } from "../services/api";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function WasteDonut() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getCategories().then((res) => {
      setData({
        labels: res.map((r) => r.category),
        datasets: [
          {
            data: res.map((r) => r.percentage),
          },
        ],
      });
    });
  }, []);

  if (!data) return <p>Loading donut...</p>;

  return <Doughnut data={data} />;
}

export default WasteDonut;
