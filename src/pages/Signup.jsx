import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import "./auth.css";

function Signup() {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignup = async () => {
        // 1. Basic Validations
        if (!fullName || !email || !password || !confirmPassword) {
            alert("Sari fields bharna zaroori hai!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords match nahi kar rahe!");
            return;
        }

        if (password.length < 6) {
            alert("Password kam se kam 6 characters ka hona chahiye.");
            return;
        }

        try {
            // 2. Create User
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 3. Update Profile (Name set karna)
            // Aap chahein toh yahan default photoURL bhi set kar sakte hain
            await updateProfile(user, {
                displayName: fullName,
                photoURL: "https://via.placeholder.com/150" // Default image
            });

            // 4. Send Email Verification (OTP ki jagah Link)
            await sendEmailVerification(user);

            alert("Account ban gaya! Ek verification link aapke email par bheja gaya hai. Please use verify karke login karein.");

            navigate("/login");

        } catch (error) {
            console.error("Signup Error:", error.code);
            // Friendly error messages
            if (error.code === 'auth/email-already-in-use') {
                alert("Ye email pehle se registered hai.");
            } else {
                alert(error.message);
            }
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <button className="back-btn" onClick={() => navigate("/")}>← Back</button>
                <h2>Create Account </h2>
                <p className="subtitle">Join Genie and boost productivity</p>

                <input
                    type="text"
                    placeholder="Full Name"
                    onChange={(e) => setFullName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button className="auth-btn" onClick={handleSignup}>Register & Verify</button>

                <p className="switch-text">
                    Already have an account? <span onClick={() => navigate("/login")}> Login</span>
                </p>
            </div>
        </div>
    );
}

export default Signup;