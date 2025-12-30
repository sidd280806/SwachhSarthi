import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { getZones } from "../services/api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function ZonePerformance() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getZones().then((zones) => {
      setData({
        labels: zones.map((z) => z.zone),
        datasets: [
          {
            label: "Waste (tons)",
            data: zones.map((z) => z.waste_tons),
          },
        ],
      });
    });
  }, []);

  if (!data) return <p>Loading zones...</p>;

  return <Bar data={data} />;
}

export default ZonePerformance;
