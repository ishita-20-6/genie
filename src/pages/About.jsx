import { motion } from "framer-motion";
import "./about.css";

function About() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="about-container glass"
        >
            <h1 className="about-title">About The Magic List 🧞</h1>

            <section className="about-section">
                <p>
                    <strong>The Magic List</strong> is a next-generation productivity tool designed to turn
                    your daily tasks into fulfilled wishes. Built with a focus on speed, aesthetics,
                    and smart tracking, this app ensures you never miss a deadline again.
                </p>
            </section>

            <div className="about-grid">
                <div className="about-card glass">
                    <h3>✨ Magic Features</h3>
                    <ul>
                        <li>Real-time Sync with Firebase</li>
                        <li>Smart Priority Sorting</li>
                        <li>Automated Genie Alerts</li>
                        <li>Visual Progress Tracking</li>
                    </ul>
                </div>

                <div className="about-card glass">
                    <h3>🛠️ Tech Stack</h3>
                    <ul>
                        <li>React.js & Framer Motion</li>
                        <li>Firebase Firestore & Auth</li>
                        <li>Custom CSS3 Glassmorphism</li>
                    </ul>
                </div>
            </div>

            <section className="about-footer glass">
                <h3>👨‍💻 Developed By</h3>
                <p>
                    Hi, I'm <strong>Genie User</strong>. I am a passionate Web Developer dedicated to
                    building functional and beautiful digital experiences.
                </p>
            </section>
        </motion.div>
    );
}

export default About;