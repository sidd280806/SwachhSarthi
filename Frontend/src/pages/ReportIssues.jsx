/*import React, { useState } from 'react';
import { Send, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import './ReportIssues.css';

const ReportIssues = () => {
  const [activeTab, setActiveTab] = useState('new');

  const complaints = {
    new: [{ id: 1, name: "Rahul Sharma", location: "Mumbai • Andheri West", desc: "Garbage not collected for the past 3 days in our society. The waste is piling up and causing hygiene issues.", time: "2 hours ago" }],
    pending: [
      { id: 2, name: "Priya Patel", location: "Delhi • Rohini Sector 7", desc: "Overflowing garbage bins near the market area. Stray animals are scattering the waste.", time: "1 day ago" },
      { id: 3, name: "Amit Kumar", location: "Bangalore • Koramangala", desc: "Illegal dumping of construction waste near the park. Need immediate cleanup.", time: "2 days ago" }
    ],
    resolved: [
      { id: 4, name: "Sneha Reddy", location: "Hyderabad • Banjara Hills", desc: "Street sweeping not happening regularly. Leaves and debris accumulated on roads.", time: "3 days ago" },
      { id: 5, name: "Mohammed Ali", location: "Chennai • T. Nagar", desc: "Broken garbage collection point. Needs repair for proper waste disposal.", time: "4 days ago" }
    ]
  };

  return (
    <div className="report-container">
      <header className="report-header">
        <h1>Report Issues</h1>
        <p>Submit waste management complaints and track their resolution status.</p>
      </header>

      <div className="report-content">
        //{ Left Side: Form }
        <section className="complaint-form-card">
          <h3><span className="plus-icon">+</span> Submit Complaint</h3>
          <p className="form-subtitle">Fill in the details below to report a waste management issue.</p>
          
          <form className="complaint-form">
            <div className="input-group">
              <label>Full Name</label>
              <input type="text" placeholder="Enter your name" />
            </div>
            <div className="input-group">
              <label>City</label>
              <input type="text" placeholder="Enter your city" />
            </div>
            <div className="input-group">
              <label>Zone / Area</label>
              <input type="text" placeholder="Enter zone or area" />
            </div>
            <div className="input-group">
              <label>Complaint Details</label>
              <textarea placeholder="Describe your complaint in detail..." rows="5"></textarea>
            </div>
            <button type="submit" className="submit-btn">
              <Send size={18} /> Submit Complaint
            </button>
          </form>
        </section>

        //{ Right Side: Tracking Tabs }
        <section className="complaint-list-section">
          <div className="tabs">
            <button className={activeTab === 'new' ? 'active' : ''} onClick={() => setActiveTab('new')}>
              <Clock size={16} /> New ({complaints.new.length})
            </button>
            <button className={activeTab === 'pending' ? 'active' : ''} onClick={() => setActiveTab('pending')}>
              <AlertCircle size={16} /> Pending ({complaints.pending.length})
            </button>
            <button className={activeTab === 'resolved' ? 'active' : ''} onClick={() => setActiveTab('resolved')}>
              <CheckCircle size={16} /> Resolved ({complaints.resolved.length})
            </button>
          </div>

          <div className="complaint-list">
            {complaints[activeTab].map(item => (
              <div key={item.id} className="complaint-card">
                <div className="card-header">
                  <div>
                    <h4>{item.name}</h4>
                    <span className="location">{item.location}</span>
                  </div>
                  <span className={`status-badge ${activeTab}`}>{activeTab}</span>
                </div>
                <p className="description">{item.desc}</p>
                <span className="time-ago"><Clock size={12} /> {item.time}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReportIssues;*/
import React, { useState, useEffect } from 'react';
import { Send, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import './ReportIssues.css';
// --- FIREBASE LOGIC START ---
import { db } from "../services/firebase"; 
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
// --- FIREBASE LOGIC END ---

const ReportIssues = () => {
  const [activeTab, setActiveTab] = useState('new');
  
  // --- FORM STATES ---
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [zone, setZone] = useState("");
  const [details, setDetails] = useState("");

  // --- DATABASE DATA STATE ---
  const [dbComplaints, setDbComplaints] = useState([]);

  // 1. Realtime Data Fetch (Database se asali complaints lana)
  useEffect(() => {
    const q = query(collection(db, "complaints"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDbComplaints(data);
    });
    return () => unsubscribe();
  }, []);

  // 2. Submit Logic (Input store karne ke liye)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "complaints"), {
        name: fullName,
        location: `${city} • ${zone}`,
        desc: details,
        status: "new", // By default new tab mein jayega
        createdAt: serverTimestamp()
      });
      // Form Clear karna
      setFullName(""); setCity(""); setZone(""); setDetails("");
      alert("Complaint stored successfully!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // 3. Mapping data for Tabs
  const complaints = {
    new: dbComplaints.filter(c => c.status === "new"),
    pending: [
      { id: 2, name: "Priya Patel", location: "Delhi • Rohini Sector 7", desc: "Overflowing garbage bins near the market area.", time: "1 day ago" }
    ],
    resolved: [
      { id: 4, name: "Sneha Reddy", location: "Hyderabad • Banjara Hills", desc: "Street sweeping not happening regularly.", time: "3 days ago" }
    ]
  };

  return (
    <div className="report-container">
      <header className="report-header">
        <h1>Report Issues</h1>
        <p>Submit waste management complaints and track their resolution status.</p>
      </header>

      <div className="report-content">
        {/* Left Side: Form */}
        <section className="complaint-form-card">
          <h3><span className="plus-icon">+</span> Submit Complaint</h3>
          <p className="form-subtitle">Fill in the details below to report a waste management issue.</p>
          
          <form className="complaint-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Full Name</label>
              <input type="text" placeholder="Enter your name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </div>
            <div className="input-group">
              <label>City</label>
              <input type="text" placeholder="Enter your city" value={city} onChange={(e) => setCity(e.target.value)} required />
            </div>
            <div className="input-group">
              <label>Zone / Area</label>
              <input type="text" placeholder="Enter zone or area" value={zone} onChange={(e) => setZone(e.target.value)} required />
            </div>
            <div className="input-group">
              <label>Complaint Details</label>
              <textarea placeholder="Describe your complaint in detail..." rows="5" value={details} onChange={(e) => setDetails(e.target.value)} required></textarea>
            </div>
            <button type="submit" className="submit-btn">
              <Send size={18} /> Submit Complaint
            </button>
          </form>
        </section>

        {/* Right Side: Tracking Tabs */}
        <section className="complaint-list-section">
          <div className="tabs">
            <button className={activeTab === 'new' ? 'active' : ''} onClick={() => setActiveTab('new')}>
              <Clock size={16} /> New ({complaints.new.length})
            </button>
            <button className={activeTab === 'pending' ? 'active' : ''} onClick={() => setActiveTab('pending')}>
              <AlertCircle size={16} /> Pending ({complaints.pending.length})
            </button>
            <button className={activeTab === 'resolved' ? 'active' : ''} onClick={() => setActiveTab('resolved')}>
              <CheckCircle size={16} /> Resolved ({complaints.resolved.length})
            </button>
          </div>

          <div className="complaint-list">
            {complaints[activeTab].map(item => (
              <div key={item.id} className="complaint-card">
                <div className="card-header">
                  <div>
                    <h4>{item.name}</h4>
                    <span className="location">{item.location}</span>
                  </div>
                  <span className={`status-badge ${activeTab}`}>{activeTab}</span>
                </div>
                <p className="description">{item.desc}</p>
                <span className="time-ago">
                  <Clock size={12} /> {item.createdAt ? "Just now" : item.time}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReportIssues;