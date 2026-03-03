import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./landing.css";

function LandingPage({ user }) {
    const navigate = useNavigate();

    return (
        <div className="landing-wrapper">
            <div className="orb blue"></div>
            <div className="orb purple"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="hero-content"
            >
                <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="genie-icon"
                >
                    🧞
                </motion.div>

                <h1 className="main-title">Make Your Wishes <br /> <span>Productive</span></h1>
                <p className="description">
                    Genie helps you manage tasks with a touch of magic.
                    Get notified before deadlines and stay ahead.
                </p>

                <div className="btn-group">
                    <button
                        className="primary-btn"
                        onClick={() => navigate(user ? "/dashboard" : "/signup")}
                    >
                        {user ? "Go to Dashboard ✨" : "Start For Free ✨"}
                    </button>
                    {!user && (
                        <button className="secondary-btn" onClick={() => navigate("/login")}>
                            Login to Account
                        </button>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

export default LandingPage;