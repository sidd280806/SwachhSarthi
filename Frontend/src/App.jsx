import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react"; 
import { db } from "./services/firebase"; // Sahi path check karein
import { collection, getDocs, addDoc } from "firebase/firestore"; // 1. Yahan addDoc add kiya hai

import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import RouteOptimization from "./pages/RouteOptimization";
import RiskZones from "./pages/RiskZones";
import ReportIssues from "./pages/ReportIssues"; 
import Logout from "./pages/Logout";

function App() {
  const location = useLocation();

  // Firebase Connection & Test Data Sending
  useEffect(() => {
    const checkAndSendData = async () => {
      try {
        // Connection test
        await getDocs(collection(db, "test_connection"));
        console.log("✅ Firebase Connection Successful!");

        // 2. TEST DATA: Ye code Firebase mein naya data bhejega
        const docRef = await addDoc(collection(db, "test_collection"), {
          message: "Working! Frontend is sending data.",
          timestamp: new Date().toLocaleString()
        });

        console.log("🔥 Test Data sent! Document ID:", docRef.id);
        alert("Success! Check your Firebase Console.");

      } catch (error) {
        console.error("❌ Firebase Error:", error.message);
      }
    };

    checkAndSendData();
  }, []);

  const hideNavbar = 
    location.pathname === "/signin" || 
    location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/route-optimization" element={<RouteOptimization />} />
        <Route path="/risk-zones" element={<RiskZones />} />
        <Route path="/report-issues" element={<ReportIssues />} /> 
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
}

export default App;





/* import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react"; 
import { db } from "./services/firebase"; // Sahi path: src/services/firebase.js
//import { collection, getDocs } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import RouteOptimization from "./pages/RouteOptimization";
import RiskZones from "./pages/RiskZones";
import ReportIssues from "./pages/ReportIssues"; 
import Logout from "./pages/Logout";

function App() {
  const location = useLocation();

  // Firebase Connection Test
  useEffect(() => {
    const checkFirebase = async () => {
      try {
        // Database se ek baar connect karne ki koshish
        await getDocs(collection(db, "test_connection"));
        console.log("✅ Firebase Connection Successful!");
        // 2. TEST DATA: Ye Firebase mein data insert karega
        const docRef = await addDoc(collection(db, "test_collection"), {
          message: "Working! Frontend is sending data.",
          timestamp: new Date().toLocaleString()
        });

        console.log("🔥 Test Data sent! Document ID:", docRef.id);
        alert("Success! Check your Firebase Console.");
      } catch (error) {
        // Agar configuration mein galti hui toh yahan error dikhega
        console.error("❌ Firebase Connection Error:", error.message);
      }
    };

    checkFirebase();
  }, []);

  const hideNavbar = 
    location.pathname === "/signin" || 
    location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/route-optimization" element={<RouteOptimization />} />
        <Route path="/risk-zones" element={<RiskZones />} />
        <Route path="/report-issues" element={<ReportIssues />} /> 
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
}

// Yaad rakhein: Export default puri file mein sirf EK baar hona chahiye
export default App; 

  

  










import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import RouteOptimization from "./pages/RouteOptimization";
import RiskZones from "./pages/RiskZones";
import ReportIssues from "./pages/ReportIssues"; // New Import
import Logout from "./pages/Logout";

function App() {
  const location = useLocation();

  const hideNavbar = 
    location.pathname === "/signin" || 
    location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/route-optimization" element={<RouteOptimization />} />
        <Route path="/risk-zones" element={<RiskZones />} />
        <Route path="/report-issues" element={<ReportIssues />} /> {/* New Route }
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
} 

export default App; */ 
