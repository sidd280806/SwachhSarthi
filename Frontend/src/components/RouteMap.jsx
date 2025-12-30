import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import axios from "axios";
import { useEffect, useState } from "react";

export default function RouteMap({ optimize }) {
  const [route, setRoute] = useState([]);

  useEffect(() => {
    if (optimize) {
      axios.get("http://127.0.0.1:8000/zones")
        .then(res => {
          const points = res.data.map(z => [z.latitude, z.longitude]);
          setRoute(points);
        });
    }
  }, [optimize]);

  return (
    <MapContainer center={[19.0760, 72.8777]} zoom={12} style={{ height: "350px" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {route.length > 0 && <Polyline positions={route} />}
    </MapContainer>
  );
}
