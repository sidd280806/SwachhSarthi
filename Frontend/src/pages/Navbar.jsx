import { NavLink, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  Route, 
  AlertTriangle, 
  MessageSquare 
} from "lucide-react"; 
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="nav-left">
        {/* Corrected spelling to SwacchSarthi */}
        <div 
          className="logo" 
          onClick={() => navigate("/")} 
          style={{cursor: 'pointer'}}
        >
          <span className="logo-icon">♻</span> SwacchSarthi
        </div>

        <div className="nav-links">
          <NavLink to="/dashboard" className="nav-item">
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>
          
          <NavLink to="/reports" className="nav-item">
            <FileText size={18} /> Reports
          </NavLink>
          
          <NavLink to="/route-optimization" className="nav-item">
            <Route size={18} /> Route Optimization
          </NavLink>
          
          <NavLink to="/risk-zones" className="nav-item">
            <AlertTriangle size={18} /> Risk Zones
          </NavLink>

          {/* Now matching the style of other headings */}
          <NavLink to="/report-issues" className="nav-item">
            <MessageSquare size={18} /> Report Issues
          </NavLink>
        </div>
      </div>

      <div className="nav-right">
        <button 
          className="signin-btn-text" 
          onClick={() => navigate("/signin")}
        >
          Sign In
        </button>
        <button 
          className="getstarted-btn" 
          onClick={() => navigate("/signup")}
        >
          Get Started
        </button>
      </div>
    </nav>
  );
}
