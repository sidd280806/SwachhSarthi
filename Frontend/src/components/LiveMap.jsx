import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import axios from "axios";

export default function LiveMap() {
  const [pos, setPos] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/live-location")
      .then(res => setPos(res.data));
  }, []);

  if (!pos) return <p>Loading map...</p>;

  return (
    <MapContainer center={[pos.lat, pos.lng]} zoom={13} style={{ height: "350px" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[pos.lat, pos.lng]}>
        <Popup>Live Vehicle Location</Popup>
      </Marker>
    </MapContainer>
  );
}
