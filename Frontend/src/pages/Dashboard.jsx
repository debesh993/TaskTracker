import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/Authcontext";
import DataTable from "react-data-table-component";

const Dashboard = () => {
  const { user, logout, loading: authLoading } = useAuth(); 
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    taskName: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    if (!token) return;

    try {
      const res = await axios.get(
        "https://task-tracker-backend-8b5a.onrender.com/api/tasks/get-tasks",
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setTasks(res.data.tasks);
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    setError("");

    if (form.taskName.length >= 50) {
      setError("Task Name must be less than 50 characters");
      return;
    }
    if (form.description.length >= 170) {
      setError("Description must be less than 170 characters");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        "https://task-tracker-backend-8b5a.onrender.com/api/tasks/add-task",
        form,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      setForm({
        taskName: "",
        description: "",
        startDate: "",
        endDate: "",
      });

      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const markCompleted = async (id) => {
    try {
      await axios.put(
        `https://task-tracker-backend-8b5a.onrender.com/api/tasks/complete-task/${id}`,
        {},
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      fetchTasks();
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `https://task-tracker-backend-8b5a.onrender.com/api/tasks/delete-task/${id}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      fetchTasks();
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-600">Please login to access dashboard.</p>
      </div>
    );
  }

  const columns = [
    {
      name: "Task",
      selector: (row) => row.taskName,
      cell: (row) => (
        <div>
          <p className="font-medium">{row.taskName}</p>
          <p className="text-sm text-gray-500">{row.description}</p>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Start",
      selector: (row) => row.startDate,
      cell: (row) => new Date(row.startDate).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "End",
      selector: (row) => row.endDate,
      cell: (row) => new Date(row.endDate).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded text-sm ${
            row.status === "fulfilled"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {row.status}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex flex-col sm:flex-row sm:gap-2 gap-1">
          {row.status === "pending" && (
            <button
              onClick={() => markCompleted(row._id)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-1 sm:px-1 py-1 rounded-md text-xs sm:text-sm w-full sm:w-auto"
            >
              Mark Done
            </button>
          )}
          <button
            onClick={() => deleteTask(row._id)}
            className="bg-red-500 hover:bg-red-600 text-white px-1 sm:px-1 py-1 rounded-md text-xs sm:text-sm w-full sm:w-auto"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="fixed top-0 left-0 right-0 flex justify-between items-center bg-blue-600 px-6 h-16 z-50 shadow-md">
        <h2 className="text-xl font-semibold text-white">
          Welcome, {user.name}
        </h2>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md"
        >
          Logout
        </button>
      </div>

      <div className="h-16"></div>

      <div className="max-w-5xl mx-auto mt-6 bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Add New Task</h3>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <form
          onSubmit={handleAddTask}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="taskName"
            value={form.taskName}
            onChange={handleChange}
            placeholder="Task Name"
            className="border rounded-md px-3 py-2"
            required
          />
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="border rounded-md px-3 py-2"
          />
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="border rounded-md px-3 py-2"
            required
          />
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            className="border rounded-md px-3 py-2"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="col-span-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-md"
          >
            {loading ? "Adding..." : "Add Task"}
          </button>
        </form>
      </div>

      <div className="max-w-5xl mx-auto mt-6 bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Your Tasks</h3>
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks found.</p>
        ) : (
          <DataTable
            columns={columns}
            data={tasks}
            pagination
            highlightOnHover
            responsive
            striped
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
