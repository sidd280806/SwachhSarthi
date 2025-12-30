import "./RouteOptimization.css";
import LiveRouteMap from "../components/LiveRouteMap";
import RouteMap from "../components/RouteMap";
import { useState } from "react";

export default function RouteOptimization() {
  const [optimize, setOptimize] = useState(false);

  return (
    <div className="route-opt">
      {/* Header */}
      <div className="route-header">
        <div>
          <h1>Route Optimization</h1>
          <p>AI-powered route planning for maximum efficiency</p>
        </div>

        <button
          className="optimize-btn"
          onClick={() => setOptimize(true)}
        >
          Optimize Routes
        </button>
      </div>

      {/* Stats */}
      <div className="route-stats">
        <div className="stat-box">
          <span>Active Routes</span>
          <h2>12</h2>
        </div>
        <div className="stat-box">
          <span>Vehicles on Road</span>
          <h2>89</h2>
        </div>
        <div className="stat-box">
          <span>Avg. Fuel Saved</span>
          <h2>11.2%</h2>
        </div>
        <div className="stat-box">
          <span>Collection Points</span>
          <h2>456</h2>
        </div>
      </div>

      {/* Content */}
      <div className="route-content">
        {/* MAP */}
        <div className="map-section">
          <div className="map-header">
            <h3>Live Route Map</h3>
            <span className="live">● Live tracking</span>
          </div>

          {optimize ? <RouteMap /> : <LiveRouteMap />}
        </div>

        {/* ROUTES LIST */}
        <div className="routes-section">
          <h3>Today's Routes</h3>
        </div>
      </div>
    </div>
  );
}
