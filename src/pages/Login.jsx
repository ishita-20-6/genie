import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; 
import { signInWithEmailAndPassword } from "firebase/auth"; 
import "./auth.css";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Both Email and password are required!");
            return;
        }

        try {
            
            await signInWithEmailAndPassword(auth, email, password);
            alert("Login Successful! 🧞");
            navigate("/"); 
        } catch (error) {
            console.error("Login Error:", error.message);
            
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                alert("Invalid Email or Password , Please Try again!");
            } else {
                alert(error.message);
            }
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <button className="back-btn" onClick={() => navigate("/")}>
                    ← Back
                </button>

                <h2>Welcome Back 👋</h2>
                <p className="subtitle">Login to continue using Genie</p>

                {/* Email Input */}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* Password Input */}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* Button calling handleLogin */}
                <button className="auth-btn" onClick={handleLogin}>Login</button>

                <p className="switch-text">
                    Don’t have an account?
                    <span onClick={() => navigate("/signup")}> Sign Up</span>
                </p>
            </div>
        </div>
    );
}

export default Login;