import { useState } from "react"; // Data save karne ke liye
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Apni firebase file ka sahi path check karein
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./auth.css";

function Signup() {
    const navigate = useNavigate();

    // 1. Inputs ki value save karne ke liye 'states'
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // 2. Button click hone par ye function chalega
    const handleSignup = async () => {
        if (!email || !password) {
            alert("Please enter email and password");
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Account Created Successfully! 🚀");
            navigate("/"); // Signup ke baad home page bhej dega
        } catch (error) {
            console.error(error.code);
            alert(error.message); // Agar koi error aaya toh screen par dikhega
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <button className="back-btn" onClick={() => navigate("/")}> ← Back </button>

                <h2>Create Account 🚀</h2>
                <p className="subtitle">Join Genie and boost productivity</p>

                <input type="text" placeholder="Full Name" />

                {/* 3. Email input ko track karein */}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* 4. Password input ko track karein */}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* 5. Button mein onClick function add kiya */}
                <button className="auth-btn" onClick={handleSignup}>
                    Sign Up
                </button>

                <p className="switch-text">
                    Already have an account?
                    <span onClick={() => navigate("/login")}> Login</span>
                </p>
            </div>
        </div>
    );
}

export default Signup;