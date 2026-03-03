import { useState } from "react";
import "./home.css";

function Home() {
    const [task, setTask] = useState("");
    const [priority, setPriority] = useState("Low");
    const [deadline, setDeadline] = useState("");
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("All");

    const addTask = () => {
        if (!task.trim()) return;

        const newTask = {
            text: task,
            priority,
            deadline,
            completed: false
        };

        setTasks([...tasks, newTask]);
        setTask("");
        setDeadline("");
        setPriority("Low");
    };

    const toggleTask = (index) => {
        const updated = [...tasks];
        updated[index].completed = !updated[index].completed;
        setTasks(updated);
    };

    const deleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const filteredTasks = tasks.filter((t) => {
        if (filter === "Completed") return t.completed;
        if (filter === "Pending") return !t.completed;
        return true;
    });

    return (
        <div className="container">
            <h1 className="title">Genie Task Manager</h1>

            <div className="input-section">
                <input
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Enter task..."
                />

                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>

                <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />

                <button onClick={addTask}>Add</button>
            </div>

            <div className="filters">
                {["All", "Completed", "Pending"].map((type) => (
                    <button
                        key={type}
                        className={filter === type ? "active" : ""}
                        onClick={() => setFilter(type)}
                    >
                        {type}
                    </button>
                ))}
            </div>

            <div className="task-list">
                {filteredTasks.map((t, index) => (
                    <div key={index} className="task-card">
                        <div onClick={() => toggleTask(index)}>
                            <h3 className={t.completed ? "completed" : ""}>
                                {t.text}
                            </h3>
                            <p>
                                {t.priority} Priority | {t.deadline || "No deadline"}
                            </p>
                        </div>

                        <button
                            className="delete-btn"
                            onClick={() => deleteTask(index)}
                        >
                            ✖
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;