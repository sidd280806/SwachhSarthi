/*import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import logo from "../assets/logo.png";


export default function SignIn() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [stateLocation, setStateLocation] = useState("");

  const indianStates = [
    "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", 
    "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", 
    "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", 
    "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", 
    "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <div className="brand">
          <img src={logo} alt="SwacchSarthi" />
        </div>

        <h1>Welcome back</h1>
        <p className="subtitle">Sign in to access your dashboard and manage waste efficiently.</p>

        <form onSubmit={handleSubmit}>
          <label>Email address</label>
          <div className="input-box">
            <span>📧</span>
            <input type="email" placeholder="you@example.com" required />
          </div>

          <label>Password</label>
          <div className="input-box">
            <span>🔒</span>
            <input type="password" placeholder="••••••••" required />
            <span className="eye">👁️</span>
          </div>

          <label>Choose your role</label>
          <div className="input-box">
            <span>👤</span>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              className="role-select"
              required
            >
              <option value="" disabled>Select your role</option>
              <option value="Municipal admin">Municipal admin</option>
              <option value="Sanitation Supervisior">Sanitation Supervisior</option>
              <option value="Vehical Driver">Vehical Driver</option>
              <option value="Citizen">Citizen</option>
            </select>
          </div>

          //{ NEW: Indian States Dropdown }
          <label>Select State</label>
          <div className="input-box">
            <span>📍</span>
            <select 
              value={stateLocation} 
              onChange={(e) => setStateLocation(e.target.value)}
              className="role-select"
              required
            >
              <option value="" disabled>Select your state</option>
              {indianStates.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div className="forgot">Forgot password?</div>

          <button type="submit" className="signin-btn">Sign In →</button>
        </form>

        <div className="divider">OR CONTINUE WITH</div>
        <div className="social">
          <button className="social-btn">Google</button>
          <button className="social-btn">GitHub</button>
        </div>

        <div className="signup">
          Don&apos;t have an account? <span onClick={() => navigate("/signup")}>Sign up</span>
        </div>
      </div>
    </div>
  );
} */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import logo from "../assets/logo.png";
// --- FIREBASE LOGIC START ---
import { auth } from "../services/firebase"; // Sahi path
import { signInWithEmailAndPassword } from "firebase/auth";
// --- FIREBASE LOGIC END ---

export default function SignIn() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [stateLocation, setStateLocation] = useState("");
  
  // --- STATE FOR FORM DATA ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const indianStates = [
    "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", 
    "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", 
    "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", 
    "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", 
    "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  // --- UPDATED SUBMIT LOGIC ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Firebase se sign in kar rahe hain
      await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ User Logged In!");
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Login Error:", error.message);
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <div className="brand">
          <img src={logo} alt="SwacchSarthi" />
        </div>

        <h1>Welcome back</h1>
        <p className="subtitle">Sign in to access your dashboard and manage waste efficiently.</p>

        <form onSubmit={handleSubmit}>
          <label>Email address</label>
          <div className="input-box">
            <span>📧</span>
            <input 
              type="email" 
              placeholder="you@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Email set ho raha hai
              required 
            />
          </div>

          <label>Password</label>
          <div className="input-box">
            <span>🔒</span>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Password set ho raha hai
              required 
            />
            <span className="eye">👁️</span>
          </div>

          <label>Choose your role</label>
          <div className="input-box">
            <span>👤</span>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              className="role-select"
              required
            >
              <option value="" disabled>Select your role</option>
              <option value="Municipal admin">Municipal admin</option>
              <option value="Sanitation Supervisior">Sanitation Supervisior</option>
              <option value="Vehical Driver">Vehical Driver</option>
              <option value="Citizen">Citizen</option>
            </select>
          </div>

          <label>Select State</label>
          <div className="input-box">
            <span>📍</span>
            <select 
              value={stateLocation} 
              onChange={(e) => setStateLocation(e.target.value)}
              className="role-select"
              required
            >
              <option value="" disabled>Select your state</option>
              {indianStates.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div className="forgot">Forgot password?</div>

          <button type="submit" className="signin-btn">Sign In →</button>
        </form>

        <div className="divider">OR CONTINUE WITH</div>
        <div className="social">
          <button className="social-btn">Google</button>
          <button className="social-btn">GitHub</button>
        </div>

        <div className="signup">
          Don&apos;t have an account? <span onClick={() => navigate("/signup")}>Sign up</span>
        </div>
      </div>
    </div>
  );
}