/*import React from "react";
import { useNavigate } from "react-router-dom"; // Added this
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="title">Swachh Sarthi</h1>
        <p className="subtitle">
          Smart Waste Management Portal
        </p>

        <h2 className="signup-heading">Create Your Account</h2>

        <form className="signup-form">
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email Address" required />
          <input type="tel" placeholder="Mobile Number" required />

          <select required>
            <option value="">Select User Role</option>
            <option>Municipal Admin</option>
            <option>Sanitation Supervisor</option>
            <option>Vehicle Driver</option>
            <option>Citizen</option>
          </select>

          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />

          <button type="submit">Sign Up</button>
        </form>

        <p className="login-text">
          { Updated this span with an onClick event }
          Already registered? <span style={{ cursor: 'pointer' }} onClick={() => navigate("/signin")}>Sign In</span>
        </p>

        <div className="thankyou-box">
          <p>
            Thank you for visiting <strong>Swachh Sarthi</strong> 🌱  
            <br />
            Together we build a cleaner & smarter India.
          </p>
          <p className="visit-again">Visit Again!</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;*/
import React, { useState } from "react"; // 1. useState add kiya
import { useNavigate } from "react-router-dom";
import "./Signup.css";

// --- FIREBASE LOGIC START ---
import { auth, db } from "../services/firebase"; // Sahi path check karein
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
// --- FIREBASE LOGIC END ---

const Signup = () => {
  const navigate = useNavigate();

  // --- FORM STATE ---
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // --- SUBMIT LOGIC ---
  const handleSignup = async (e) => {
    e.preventDefault();

    // Password matching check
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // 1. Firebase Auth mein account banana
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Firestore mein user ka extra data store karna
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName: fullName,
        email: email,
        mobile: mobile,
        role: role,
        createdAt: new Date()
      });

      console.log("✅ User Registered and Data Saved!");
      alert("Account Created Successfully!");
      navigate("/dashboard");

    } catch (error) {
      console.error("❌ Signup Error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="title">Swachh Sarthi</h1>
        <p className="subtitle">Smart Waste Management Portal</p>

        <h2 className="signup-heading">Create Your Account</h2>

        <form className="signup-form" onSubmit={handleSignup}>
          <input 
            type="text" 
            placeholder="Full Name" 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required 
          />
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <input 
            type="tel" 
            placeholder="Mobile Number" 
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required 
          />

          <select 
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select User Role</option>
            <option value="Municipal Admin">Municipal Admin</option>
            <option value="Sanitation Supervisor">Sanitation Supervisor</option>
            <option value="Vehicle Driver">Vehicle Driver</option>
            <option value="Citizen">Citizen</option>
          </select>

          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <input 
            type="password" 
            placeholder="Confirm Password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required 
          />

          <button type="submit">Sign Up</button>
        </form>

        <p className="login-text">
          Already registered? <span style={{ cursor: 'pointer' }} onClick={() => navigate("/signin")}>Sign In</span>
        </p>

        <div className="thankyou-box">
          <p>
            Thank you for visiting <strong>Swachh Sarthi</strong> 🌱  
            <br />
            Together we build a cleaner & smarter India.
          </p>
          <p className="visit-again">Visit Again!</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
