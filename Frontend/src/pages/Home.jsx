import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Truck, MapPin, BarChart3, CheckCircle2, Mail, Phone } from 'lucide-react';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="badge">🌱 AI-Powered Waste Management</div>
        <h1>Smart Waste Solutions with <span>SwacchSarthi</span></h1>
        <p className="hero-description">
          Transform your city's waste management with AI-driven insights, optimized routes, and real-time monitoring for a cleaner, greener tomorrow.
        </p>
        <div className="hero-cta">
          <button className="btn-filled" onClick={() => navigate('/dashboard')}>Explore Dashboard →</button>
          <button className="btn-outline" onClick={() => navigate('/signup')}>Get Started Free</button>
        </div>
        
        {/* STATS BAR */}
        <div className="stats-bar">
          <div className="stat-item"><h2>500+</h2><p>Cities Served</p></div>
          <div className="stat-item"><h2>2M+</h2><p>Tons Managed</p></div>
          <div className="stat-item"><h2>40%</h2><p>Cost Reduction</p></div>
          <div className="stat-item"><h2>98%</h2><p>Accuracy Rate</p></div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section">
        <div className="section-title">
          <h2>Powerful Features for Modern Cities</h2>
          <p>Comprehensive tools designed to revolutionize how cities manage waste efficiently.</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="icon-box"><Bot size={24} /></div>
            <h3>AI-Powered Analytics</h3>
            <p>Smart waste prediction and pattern recognition using advanced machine learning algorithms.</p>
          </div>
          <div className="feature-card">
            <div className="icon-box"><Truck size={24} /></div>
            <h3>Route Optimization</h3>
            <p>Reduce fuel costs and time with intelligent route planning for collection vehicles.</p>
          </div>
          <div className="feature-card">
            <div className="icon-box"><MapPin size={24} /></div>
            <h3>Risk Zone Detection</h3>
            <p>Identify and monitor high-risk waste accumulation areas in real-time.</p>
          </div>
          <div className="feature-card">
            <div className="icon-box"><BarChart3 size={24} /></div>
            <h3>Comprehensive Reports</h3>
            <p>Generate detailed insights and analytics for informed decision making.</p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE SECTION */}
      <section className="why-choose">
        <div className="why-left">
          <h2>Why Choose <span>SwacchSarthi</span>?</h2>
          <p>Our platform combines cutting-edge AI technology with practical waste management solutions.</p>
          <ul className="benefits-list">
            <li><CheckCircle2 size={18} /> Reduce operational costs by up to 40%</li>
            <li><CheckCircle2 size={18} /> Eco-friendly route optimization</li>
            <li><CheckCircle2 size={18} /> Citizen engagement portal</li>
            <li><CheckCircle2 size={18} /> Real-time monitoring and alerts</li>
          </ul>
          <button className="btn-filled" onClick={() => navigate('/dashboard')}>View Live Demo →</button>
        </div>
        <div className="why-right">
          <div className="preview-card">
            <div className="card-header">
              <div className="mini-logo">♻</div>
              <div><strong>SwacchSarthi Platform</strong><p>Real-time Overview</p></div>
            </div>
            <div className="preview-row"><span>⚡ Active Collections</span><strong>1,234</strong></div>
            <div className="preview-row"><span>🚚 Vehicles on Route</span><strong>89</strong></div>
            <div className="preview-row"><span>🛡️ Risk Zones Monitored</span><strong>47</strong></div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-col">
            <div className="logo">♻ SwacchSarthi</div>
            <p>AI-powered waste management for a cleaner, greener tomorrow.</p>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <a href="/dashboard">Dashboard</a>
            <a href="/reports">Reports</a>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <p><Mail size={14} /> contact@SwacchSarthi.in</p>
            <p><Phone size={14} /> +91 1800-123-4567</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 SwacchSarthi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;