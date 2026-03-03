import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

function Navbar() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <h2 className="logo" onClick={() => navigate("/")}>
                Genie
            </h2>

            <div className="nav-links">
                <span onClick={() => navigate("/")}>Home</span>
                <span onClick={() => navigate("/about")}>About</span>

                <div className="profile">
                    <span onClick={() => setOpen(!open)}>Profile ⌄</span>

                    {open && (
                        <div className="dropdown">
                            <div onClick={() => navigate("/login")}>Login</div>
                            <div onClick={() => navigate("/signup")}>Sign Up</div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;