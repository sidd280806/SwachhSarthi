import { useEffect, useState } from "react";
import { getSummary } from "../services/api";

function AnalyticsCards() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getSummary().then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="cards">
      <div>Total Collected: {data.total_collected} tons</div>
      <div>Recycling Rate: {data.recycling_rate}%</div>
      <div>Fleet Efficiency: {data.fleet_efficiency}%</div>
      <div>Carbon Saved: {data.carbon_saved} kg</div>
    </div>
  );
}

export default AnalyticsCards;
