/*import React, { useState } from "react";
import "./RiskZones.css";
import axios from "axios";
import LiveLocationMap from "../components/LiveLocationMap";

const zones = [
  {
    title: "Sector 5 - Industrial Area",
    location: "Plot 45-78, Industrial Estate",
    risk: 92,
    expected: 95,
    trend: "+3%",
    issues: ["High waste accumulation", "Delayed pickup"],
    time: "5 min ago",
    level: "critical",
  },
  {
    title: "Downtown Market Complex",
    location: "Main Bazaar Road",
    risk: 78,
    expected: 80,
    trend: "+2%",
    issues: ["Organic waste overflow", "Limited access"],
    time: "12 min ago",
    level: "moderate",
  },
  {
    title: "Residential Block C",
    location: "Gandhi Nagar, Phase 2",
    risk: 65,
    expected: 58,
    trend: "-7%",
    issues: ["Mixed waste"],
    time: "8 min ago",
    level: "moderate",
  },
  {
    title: "University Campus East",
    location: "State University Premises",
    risk: 45,
    expected: 42,
    trend: "-3%",
    issues: ["Plastic accumulation"],
    time: "20 min ago",
    level: "low",
  },
  {
    title: "Highway Service Area",
    location: "NH-44, KM 156",
    risk: 82,
    expected: 88,
    trend: "+6%",
    issues: ["High traffic waste", "Irregular collection"],
    time: "3 min ago",
    level: "critical",
  },
  {
    title: "Municipal Park Zone",
    location: "Central Park Area",
    risk: 35,
    expected: 28,
    trend: "-7%",
    issues: ["Minor littering"],
    time: "30 min ago",
    level: "low",
  },
];

const RiskZones = () => {
  // ✅ hooks INSIDE component
  const [showLive, setShowLive] = useState(false);
  const [alert, setAlert] = useState("");

  return (
    <div className="risk-page">
      //{HEADER }
      <div className="risk-header">
        <div>
          <h1>Risk Zones</h1>
          <p>AI-monitored high-risk waste accumulation areas</p>
        </div>

        <div className="header-actions">
          <button
            className="btn-outline"
            onClick={async () => {
              const res = await axios.get("http://127.0.0.1:8000/alerts");
              setAlert(res.data.message);
            }}
          >
            🔔 Alerts
          </button>

          <button
            className="btn-primary"
            onClick={() => setShowLive(true)}
          >
            👁 Live Monitor
          </button>
        </div>
      </div>

      //{ALERT MESSAGE }
      {alert && (
        <div style={{ color: "red", fontWeight: "bold", marginBottom: "16px" }}>
          🚨 {alert}
        </div>
      )}

     // {LIVE MAP }
      {showLive && <LiveLocationMap />}

      //{STATS }
      <div className="stats">
        <div className="stat-card">
          <span>Critical Zones</span>
          <strong className="critical">2</strong>
        </div>
        <div className="stat-card">
          <span>Moderate Risk</span>
          <strong className="moderate">2</strong>
        </div>
        <div className="stat-card">
          <span>Low Risk</span>
          <strong className="low">2</strong>
        </div>
        <div className="stat-card">
          <span>Monitored Areas</span>
          <strong>6</strong>
        </div>
      </div>

      //{ FILTERS }
      <div className="filters">
        <button className="active">All Zones</button>
        <button>Critical</button>
        <button>Moderate</button>
        <button>Low Risk</button>
      </div>

      //{ ZONES }
      <div className="zones">
        {zones.map((z, i) => (
          <div className="zone-card" key={i}>
            <h3>{z.title}</h3>
            <p className="location">📍 {z.location}</p>

            <div className="risk-row">
              <span>Risk Level</span>
              <strong className={z.level}>{z.risk}%</strong>
            </div>

            <div className="progress-bar">
              <div
                className={`progress ${z.level}`}
                style={{ width: `${z.risk}%` }}
              />
            </div>

            <div className="prediction">
              ⚡ AI Prediction (24h) <br />
              Expected risk:{" "}
              <strong>
                {z.expected}% ({z.trend})
              </strong>
            </div>

            <div className="issues">
              <span>Current Issues</span>
              <div className="tags">
                {z.issues.map((issue, idx) => (
                  <span key={idx}>{issue}</span>
                ))}
              </div>
            </div>

            <div className="footer">
              <small>⏱ {z.time}</small>
              <button>View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskZones;*/
import React, { useState, useEffect } from "react";
import "./RiskZones.css";
import axios from "axios";
import LiveLocationMap from "../components/LiveLocationMap";
// --- FIREBASE LOGIC ---
import { db } from "../services/firebase"; 
import { collection, onSnapshot } from "firebase/firestore";

const RiskZones = () => {
  const [showLive, setShowLive] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [dynamicZones, setDynamicZones] = useState([]);
  // --- NEW STATE FOR BUTTONS ---
  const [activeFilter, setActiveFilter] = useState("all");

  // 1. LIVE LOGIC: Fetch and Group Complaints by City/Location
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "complaints"), (snapshot) => {
      const cityGroups = {};

      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        const cityName = data.location || data.city || "Unknown Area";
        
        if (!cityGroups[cityName]) {
          cityGroups[cityName] = { count: 0, issues: new Set() };
        }
        cityGroups[cityName].count += 1;
        if (data.desc) cityGroups[cityName].issues.add(data.desc.substring(0, 20) + "...");
      });

      // 2. Map groups to your card design
      const zonesArray = Object.keys(cityGroups).map((city) => {
        const count = cityGroups[city].count;
        let level = "low";
        let riskValue = count * 15; 

        if (count >= 5) {
          level = "critical";
          riskValue = 90 + count; 
        } else if (count >= 3) {
          level = "moderate";
          riskValue = 60 + (count * 5);
        }

        return {
          title: city,
          location: city,
          risk: riskValue > 100 ? 100 : riskValue,
          expected: riskValue + 5,
          trend: "+5%",
          issues: Array.from(cityGroups[city].issues).slice(0, 2),
          time: "Just updated",
          level: level,
          count: count
        };
      });

      setDynamicZones(zonesArray);
    });

    return () => unsubscribe();
  }, []);

  // Stats calculation
  const stats = {
    critical: dynamicZones.filter(z => z.level === "critical").length,
    moderate: dynamicZones.filter(z => z.level === "moderate").length,
    low: dynamicZones.filter(z => z.level === "low").length,
    total: dynamicZones.length
  };

  // --- FILTER LOGIC ---
  const filteredZones = dynamicZones.filter(z => {
    if (activeFilter === "all") return true;
    return z.level === activeFilter;
  });

  return (
    <div className="risk-page">
      <div className="risk-header">
        <div>
          <h1>Risk Zones</h1>
          <p>AI-monitored based on {stats.total} live user complaints</p>
        </div>

        <div className="header-actions">
          <button
            className="btn-outline"
            onClick={async () => {
              try {
                const res = await axios.get("http://127.0.0.1:8000/alerts");
                setAlertMsg(res.data.message);
              } catch { 
                setAlertMsg("Backend not connected, showing local alerts.");
              }
            }}
          >
            🔔 Alerts
          </button>

          <button className="btn-primary" onClick={() => setShowLive(!showLive)}>
            {showLive ? "Hide Map" : "👁 Live Monitor"}
          </button>
        </div>
      </div>

      {alertMsg && (
        <div style={{ color: "red", fontWeight: "bold", marginBottom: "16px" }}>
          🚨 {alertMsg}
        </div>
      )}

      {showLive && <LiveLocationMap markers={dynamicZones} />}

      <div className="stats">
        <div className="stat-card">
          <span>Critical Zones</span>
          <strong className="critical">{stats.critical}</strong>
        </div>
        <div className="stat-card">
          <span>Moderate Risk</span>
          <strong className="moderate">{stats.moderate}</strong>
        </div>
        <div className="stat-card">
          <span>Low Risk</span>
          <strong className="low">{stats.low}</strong>
        </div>
        <div className="stat-card">
          <span>Total Areas</span>
          <strong>{stats.total}</strong>
        </div>
      </div>

      <div className="filters">
        <button 
          className={activeFilter === "all" ? "active" : ""} 
          onClick={() => setActiveFilter("all")}
        >
          All Zones
        </button>
        <button 
          className={activeFilter === "critical" ? "active" : ""} 
          onClick={() => setActiveFilter("critical")}
        >
          Critical
        </button>
        <button 
          className={activeFilter === "moderate" ? "active" : ""} 
          onClick={() => setActiveFilter("moderate")}
        >
          Moderate
        </button>
        <button 
          className={activeFilter === "low" ? "active" : ""} 
          onClick={() => setActiveFilter("low")}
        >
          Low Risk
        </button>
      </div>

      <div className="zones">
        {filteredZones.length === 0 ? (
          <p>No complaints reported for this category. System is clear! 🌱</p>
        ) : (
          filteredZones.map((z, i) => (
            <div className="zone-card" key={i}>
              <div className="card-badge" style={{float: 'right', fontSize: '12px'}}>
                {z.count} Complaints
              </div>
              <h3>{z.title}</h3>
              <p className="location">📍 {z.location}</p>

              <div className="risk-row">
                <span>Risk Level</span>
                <strong className={z.level}>{z.risk}%</strong>
              </div>

              <div className="progress-bar">
                <div
                  className={`progress ${z.level}`}
                  style={{ width: `${z.risk}%` }}
                />
              </div>

              <div className="prediction">
                ⚡ AI Prediction (24h) <br />
                Expected risk: <strong>{z.expected}% ({z.trend})</strong>
              </div>

              <div className="issues">
                <span>User Reports</span>
                <div className="tags">
                  {z.issues.map((issue, idx) => (
                    <span key={idx}>{issue}</span>
                  ))}
                </div>
              </div>

              <div className="footer">
                <small>⏱ {z.time}</small>
                <button>View Details</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RiskZones;