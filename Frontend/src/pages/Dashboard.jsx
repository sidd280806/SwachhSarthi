/*import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react'; // Make sure you have these icons
import "./Dashboard.css";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dashboard-container">
      //{ --- YOUR ORIGINAL DASHBOARD CODE --- }
      <div className="dash-header">
        <div>
          <h1>Dashboard</h1>
          <p>Real-time waste management overview</p>
        </div>
        <div className="dash-actions">
          <span>🕒 Last updated: Just now</span>
          <button>📊 View Reports</button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Waste Collected</h4>
          <h2>2,847 tons</h2>
        </div>
        <div className="stat-card">
          <h4>Active Vehicles</h4>
          <h2>89</h2>
        </div>
        <div className="stat-card">
          <h4>Risk Zones Monitored</h4>
          <h2>47</h2>
        </div>
        <div className="stat-card">
          <h4>Recycling Rate</h4>
          <h2>68.4%</h2>
        </div>
      </div>

      <div className="middle-grid">
        <div className="box">
          <h3>Recent Activity</h3>
          <ul>
            <li>Route 12 completed collection cycle</li>
            <li>Vehicle V-034 started maintenance</li>
            <li>Weekly report generated successfully</li>
            <li>AI prediction model updated</li>
          </ul>
        </div>
        <div className="box">
          <h3>Top Risk Zones</h3>
          <p>Sector 5 – Industrial (85%)</p>
        </div>
      </div>

     <div className="bottom-grid">
        <div className="feature-card">
          <h3>Route Optimization</h3>
          <p>Optimize collection routes with AI-powered suggestions</p>
        </div>
        <div className="feature-card">
          <h3>Analytics Reports</h3>
          <p>View detailed waste management analytics</p>
        </div>
        <div className="feature-card">
          <h3>Eco Impact</h3>
          <p>Track environmental impact and sustainability</p>
        </div>
      </div>

      //{ --- CHATBOT TOGGLE SECTION --- }
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
        {isOpen && (
          <div style={{ 
            width: '400px', 
            height: '650px', 
            background: 'white', 
            borderRadius: '15px', 
            boxShadow: '0 5px 25px rgba(0,0,0,0.3)', 
            marginBottom: '10px', 
            overflow: 'hidden', 
            border: '1px solid #ddd' 
          }}>
            //{This iframe points to your index.html file }
            <iframe 
              src="/src/pages/last chatbot/index.html" 
              title="Chatbot"
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          </div>
        )}
        
        //{ Floating Button }
        <button 
          onClick={() => setIsOpen(!isOpen)}
          style={{ 
            width: '60px', 
            height: '60px', 
            borderRadius: '50%', 
            background: '#00a884', 
            color: 'white', 
            border: 'none', 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)' 
          }}
        >
          {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        </button>
      </div>
    </div>
  );
}

*/
import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import "./Dashboard.css";
// --- FIREBASE LOGIC START ---
import { db } from "../services/firebase";
import { collection, onSnapshot } from "firebase/firestore";
// --- FIREBASE LOGIC END ---

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  
  // --- DYNAMIC DATA STATES ---
  const [riskZonesCount, setRiskZonesCount] = useState(0);
  const [topRisks, setTopRisks] = useState([]);
  const [stats, setStats] = useState({ vehicles: 89, cities: 0 });

  useEffect(() => {
    // Real-time complaints monitor karna
    const unsubscribe = onSnapshot(collection(db, "complaints"), (snapshot) => {
      const cityGroups = {};
      
      snapshot.docs.forEach((doc) => {
        const city = doc.data().city || "Unknown";
        cityGroups[city] = (cityGroups[city] || 0) + 1;
      });

      // 1. Logic: Sirf wo cities count karna jo Moderate (3+) ya Critical (5+) hain
      const riskyCities = Object.entries(cityGroups).filter(([ , count]) => count >= 3);
      setRiskZonesCount(riskyCities.length);

      // 2. Logic: Top 2 Cities nikalna Recent Activity ke liye
      const sorted = Object.entries(cityGroups)
        .map(([name, count]) => ({ name, risk: Math.min(count * 20, 100) }))
        .sort((a, b) => b.risk - a.risk)
        .slice(0, 2);
      
      setTopRisks(sorted);
      setStats(prev => ({ ...prev, cities: Object.keys(cityGroups).length }));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dash-header">
        <div>
          <h1>Dashboard</h1>
          <p>Real-time waste management overview</p>
        </div>
        <div className="dash-actions">
          <span>🕒 Last updated: Just now</span>
          <button>📊 View Reports</button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Waste Collected</h4>
          <h2>2,847 tons</h2>
        </div>
        <div className="stat-card">
          <h4>Active Vehicles</h4>
          <h2>{stats.vehicles}</h2>
        </div>
        <div className="stat-card">
          {/* Logic: Moderate + Critical zones ka total no yahan dikhega */}
          <h4>Risk Zones Monitored</h4>
          <h2>{riskZonesCount}</h2>
        </div>
        <div className="stat-card">
          <h4>Recycling Rate</h4>
          <h2>68.4%</h2>
        </div>
      </div>

      <div className="middle-grid">
        <div className="box">
          <h3>Recent Activity</h3>
          <ul>
            {/* Logic: Top 2 Risk Cities points */}
            {topRisks.map((r, i) => (
              <li key={i} style={{color: '#d32f2f', fontWeight: 'bold'}}>
                ⚠️ Alert: {r.name} is now a Risk Zone ({r.risk}%)
              </li>
            ))}
            {/* Baaki fixed points jo aapne maange the */}
            <li>🚛 {stats.vehicles} vehicles active across {stats.cities} cities</li>
            <li>📍 Route optimization completed for all active zones</li>
            <li>✅ AI prediction model updated based on new reports</li>
          </ul>
        </div>
        <div className="box">
          <h3>Top Risk Zones</h3>
          {topRisks.length > 0 ? (
            topRisks.map((r, i) => (
              <p key={i}>{r.name} – {r.risk >= 90 ? 'Industrial' : 'Residential'} ({r.risk}%)</p>
            ))
          ) : (
            <p>No high risk zones detected 🌱</p>
          )}
        </div>
      </div>

      <div className="bottom-grid">
        <div className="feature-card">
          <h3>Route Optimization</h3>
          <p>Optimize collection routes with AI-powered suggestions</p>
        </div>
        <div className="feature-card">
          <h3>Analytics Reports</h3>
          <p>View detailed waste management analytics</p>
        </div>
        <div className="feature-card">
          <h3>Eco Impact</h3>
          <p>Track environmental impact and sustainability</p>
        </div>
      </div>

      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
  {isOpen && (
    <div style={{
      width: '380px',
      height: '560px',
      background: 'white',
      borderRadius: '14px',
      overflow: 'hidden',
      boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
      marginBottom: '10px',
      border: '1px solid #ddd'
    }}>
      <iframe
        src="/chatbot-files/index1.html"
        title="Chatbot"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block'
        }}
      />
    </div>
  )}

  <button
    onClick={() => setIsOpen(!isOpen)}
    style={{
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      background: '#00a884',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 14px rgba(0,0,0,0.35)'
    }}
  >
    {isOpen ? <X size={28}/> : <MessageCircle size={28}/>}
  </button>
</div>

    </div>
  );
}
