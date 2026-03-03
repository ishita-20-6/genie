import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About"; // Naya About page import kiya
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import { AnimatePresence } from "framer-motion";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div className="loading">Genie is waking up... 🧞</div>;

  return (
    <>
      {/* Navbar ko user state pass kari taaki login/logout handle ho sake */}
      <Navbar user={user} />

      <div style={{ minHeight: "100vh", background: "#0f172a" }}>
        <AnimatePresence mode="wait">
          <Routes>
            {/* 1. Landing Page */}
            <Route path="/" element={<LandingPage user={user} />} />

            {/* 2. About Page (Sabke liye open hai) */}
            <Route path="/about" element={<About />} />

            {/* 3. Protected Dashboard/Home (Sirf login users ke liye) */}
            <Route
              path="/dashboard"
              element={user ? <Home /> : <Navigate to="/login" />}
            />

            {/* 4. Login & Signup (Sirf logout users ke liye) */}
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/dashboard" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/dashboard" />}
            />

            {/* 5. Fallback: Agar koi galat URL dale toh landing page par bhej do */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;