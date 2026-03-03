import { useNavigate } from "react-router-dom";
import "./auth.css";

function Login() {
    const navigate = useNavigate();

    return (
        <div className="auth-container">
            <div className="auth-card">

                <button className="back-btn" onClick={() => navigate("/")}>
                    ← Back
                </button>

                <h2>Welcome Back 👋</h2>
                <p className="subtitle">Login to continue using Genie</p>

                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />

                <button className="auth-btn">Login</button>

                <p className="switch-text">
                    Don’t have an account?
                    <span onClick={() => navigate("/signup")}> Sign Up</span>
                </p>
            </div>
        </div>
    );
}

export default Login;