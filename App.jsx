import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function showMessage(text) {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  }

  async function loadTasks() {
    try {
      setLoading(true);

      const params = {};

      if (search.trim()) {
        params.search = search.trim();
      }

      if (status !== "all") {
        params.completed = status === "completed";
      }

      const response = await axios.get(API_URL, {
        params: params
      });

      setTasks(response.data);
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Could not load tasks"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function addTask(event) {
    event.preventDefault();

    if (!title.trim()) {
      showMessage("Please enter a task");
      return;
    }

    try {
      await axios.post(API_URL, {
        title: title.trim()
      });

      setTitle("");
      showMessage("Task added");
      loadTasks();
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Could not add task"
      );
    }
  }

  async function toggleTask(task) {
    try {
      await axios.put(`${API_URL}/${task._id}`, {
        completed: !task.completed
      });

      loadTasks();
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Could not update task"
      );
    }
  }

  async function deleteTask(id) {
    try {
      await axios.delete(`${API_URL}/${id}`);

      showMessage("Task deleted");
      loadTasks();
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Could not delete task"
      );
    }
  }

  function handleSearch(event) {
    event.preventDefault();
    loadTasks();
  }

  function handleStatusChange(event) {
    const newStatus = event.target.value;

    setStatus(newStatus);

    setTimeout(() => {
      loadTasks();
    }, 0);
  }

  return (
    <div className="app">
      <h1>Task Manager</h1>

      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter task"
        />

        <button type="submit">Add Task</button>
      </form>

      <div className="filters">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search tasks"
          />

          <button type="submit">Search</button>
        </form>

        <select value={status} onChange={handleStatusChange}>
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {message && <p className="message">{message}</p>}

      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <div className="task-card" key={task._id}>
              <div>
                <h3 className={task.completed ? "completed" : ""}>
                  {task.title}
                </h3>

                <p>
                  Status:{" "}
                  {task.completed ? "Completed" : "Pending"}
                </p>
              </div>

              <div className="task-buttons">
                <button onClick={() => toggleTask(task)}>
                  {task.completed ? "Mark Pending" : "Complete"}
                </button>

                <button onClick={() => deleteTask(task._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;