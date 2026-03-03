import { useState, useEffect, useRef } from "react";
import { auth, db } from "../firebase";
import {
    collection, addDoc, query, where, onSnapshot,
    deleteDoc, doc, updateDoc, serverTimestamp, orderBy
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./home.css";

function Home() {
    const navigate = useNavigate();
    const [task, setTask] = useState("");
    const [priority, setPriority] = useState("Low");
    const [deadline, setDeadline] = useState("");
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("All");
    const notifiedTasks = useRef(new Set());
    const user = auth.currentUser;

    useEffect(() => {
        if (!user) return;
        if ("Notification" in window && Notification.permission !== "granted") {
            Notification.requestPermission();
        }

        const q = query(
            collection(db, "tasks"),
            where("userId", "==", user.uid),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const taskData = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
            setTasks(taskData);
        });
        return () => unsubscribe();
    }, [user]);

    useEffect(() => {
        const checkDeadlines = setInterval(() => {
            const now = new Date();
            tasks.forEach(t => {
                if (!t.completed && t.deadline) {
                    const taskDate = new Date(t.deadline);
                    const diffInMs = taskDate - now;
                    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

                    // A. 1 Hour Reminder
                    if (diffInMinutes === 60 && !notifiedTasks.current.has(`${t.id}-1h`)) {
                        new Notification("Genie Reminder! 🧞", {
                            body: `Upcoming: "${t.text}" is due in 1 hour. Time to wrap it up!`,
                            icon: "/favicon.ico" // Aapka app icon yahan dikhega
                        });
                        notifiedTasks.current.add(`${t.id}-1h`);
                    }

                    // B. Overdue Alert
                    if (diffInMinutes <= 0 && !notifiedTasks.current.has(`${t.id}-overdue`)) {
                        new Notification("Task Overdue! ⚠️", {
                            body: `Attention: The deadline for "${t.text}" has passed.`,
                            requireInteraction: true // Jab tak user click na kare alert dikhta rahega
                        });
                        notifiedTasks.current.add(`${t.id}-overdue`);
                    }
                }
            });
        }, 10000);
        return () => clearInterval(checkDeadlines);
    }, [tasks]);

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    const priorityWeight = { "High": 3, "Medium": 2, "Low": 1 };
    const sortedAndFilteredTasks = tasks
        .filter((t) => {
            if (filter === "Completed") return t.completed;
            if (filter === "Pending") return !t.completed;
            return true;
        })
        .sort((a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]);

    const getTaskStatus = (t) => {
        if (t.completed) return { label: "Done ✨", class: "status-done" };
        const now = new Date();
        const taskDate = new Date(t.deadline);
        if (t.deadline && taskDate < now) return { label: "Overdue ⚠️", class: "status-overdue" };
        return { label: "Upcoming", class: "status-pending" };
    };

    const addTask = async () => {
        if (!task.trim()) return;
        try {
            await addDoc(collection(db, "tasks"), {
                text: task, priority, deadline, completed: false,
                userId: user.uid, createdAt: serverTimestamp()
            });
            setTask(""); setDeadline(""); setPriority("Low");
        } catch (err) { alert("Error: " + err.message); }
    };

    const toggleTask = async (id, currentStatus) => {
        await updateDoc(doc(db, "tasks", id), { completed: !currentStatus });
    };

    const deleteTask = async (e, id) => {
        e.stopPropagation();
        if (window.confirm("Delete this wish?")) {
            await deleteDoc(doc(db, "tasks", id));
        }
    };

    const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${user?.email}`;

    return (
        <div className="dashboard-wrapper">
            {/* 1. Header Section */}
            <header className="dash-header glass">
                <div className="user-brand">
                    <img src={avatarUrl} alt="avatar" className="avatar-img" />
                    <div>
                        <h1>Genie Dashboard</h1>
                        <p>{user?.email}</p>
                    </div>
                </div>
                <div className="quick-stats">
                    <div className="stat-item"><span>{pendingTasks}</span> Pending</div>
                    <div className="stat-item"><span>{completedTasks}</span> Completed</div>
                </div>
            </header>

            <main className="dash-content">
                {/* 2. Left Side: Input & Progress */}
                <section className="control-panel">
                    <div className="card glass">
                        <h3>Create a New Wish ✨</h3>
                        <div className="pro-input-group">
                            <input value={task} onChange={(e) => setTask(e.target.value)} placeholder="What needs to be done?" />
                            <div className="row">
                                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                                    <option>Low</option><option>Medium</option><option>High</option>
                                </select>
                                <input type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                            </div>
                            <button className="pro-add-btn" onClick={addTask}>Grant Wish 🧞</button>
                        </div>
                    </div>

                    <div className="card glass">
                        <h3>Magic Progress</h3>
                        <div className="pro-progress-bar">
                            <motion.div
                                className="fill"
                                animate={{ width: `${progressPercentage}%` }}
                                transition={{ duration: 1 }}
                            />
                        </div>
                        <p>{Math.round(progressPercentage)}% of goals achieved</p>
                    </div>
                </section>

                {/* 3. Right Side: Task List */}
                <section className="list-panel">
                    <div className="list-header">
                        <h2>Your Wishes</h2>
                        <div className="pro-filters">
                            {["All", "Pending", "Completed"].map(f => (
                                <button key={f} className={filter === f ? "active" : ""} onClick={() => setFilter(f)}>{f}</button>
                            ))}
                        </div>
                    </div>

                    <div className="pro-task-grid">
                        <AnimatePresence>
                            {sortedAndFilteredTasks.map((t) => {
                                const status = getTaskStatus(t);
                                return (
                                    <motion.div
                                        key={t.id} layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className={`pro-task-card glass ${t.priority.toLowerCase()}`}
                                        onClick={() => toggleTask(t.id, t.completed)}
                                    >
                                        <div className="card-indicator" />
                                        <div className="card-body">
                                            <h4 className={t.completed ? "strikethrough" : ""}>{t.text}</h4>
                                            <div className="card-meta">
                                                <span className={`tag ${status.class}`}>{status.label}</span>
                                                <span>⌛ {new Date(t.deadline).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <button className="mini-delete" onClick={(e) => deleteTask(e, t.id)}>×</button>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Home;