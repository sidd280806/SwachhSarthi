import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const routePath = [
  [19.0760, 72.8777],
  [19.0860, 72.8677],
  [19.0960, 72.8577],
];

export default function LiveRouteMap({ showRoute }) {
  return (
    <div style={{ height: "420px", borderRadius: "16px", overflow: "hidden" }}>
      <MapContainer
        center={[19.0760, 72.8777]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {routePath.map((pos, i) => (
          <Marker key={i} position={pos} />
        ))}

        {showRoute && (
          <Polyline positions={routePath} />
        )}
      </MapContainer>
    </div>
  );
}
