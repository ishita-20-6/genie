import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import "./navbar.css";

function Navbar() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); 
    const isActive = (path) => location.pathname === path ? "active-link" : "";

    return (
        <nav className="navbar glass">
            <h2 className="logo" onClick={() => navigate("/")}>
                Genie 🧞
            </h2>

            <div className="nav-links">
                <span
                    className={isActive("/dashboard")}
                    onClick={() => navigate("/dashboard")}
                >
                    Home
                </span>

                <span
                    className={isActive("/about")}
                    onClick={() => navigate("/about")}
                >
                    About
                </span>

                <div className="profile-container" onMouseLeave={() => setOpen(false)}>
                    <span
                        className={`profile-trigger ${open ? "open" : ""}`}
                        onClick={() => setOpen(!open)}
                    >
                        Account ⌄
                    </span>

                    {open && (
                        <div className="dropdown glass">
                            <div onClick={() => { navigate("/login"); setOpen(false); }}>Login</div>
                            <div onClick={() => { navigate("/signup"); setOpen(false); }}>Sign Up</div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;