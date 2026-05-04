import { useEffect, useState } from "react";

type Contact = {
  _id: string;
  issueType: string;
  location: string;
  description: string;
  status?: string;
};

interface AdminProps {
  onBack: () => void;
}

const Admin: React.FC<AdminProps> = ({ onBack }) => {
  const [data, setData] = useState<Contact[]>([]);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/issues")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  const handleLogin = () => {
    if (password === "admin123") {
      setAuthenticated(true);
    } else {
      alert("Wrong password");
    }
  };

  const deleteIssue = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/issues/${id}`, {
        method: "DELETE",
      });
      setData(data.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const updateIssue = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/issues/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const updated = await res.json();
      setData(data.map((item) => (item._id === id ? updated : item)));
    } catch (error) {
      console.error(error);
    }
  };

  if (!authenticated) {
    return (
      <div className="container mt-5 text-center">
        <h2>Admin Login</h2>
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-dark me-2" onClick={handleLogin}>
          Login
        </button>
        <button className="btn btn-link" onClick={onBack}>
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Admin Dashboard</h2>
        <button className="btn btn-outline-secondary" onClick={onBack}>
          Exit Admin
        </button>
      </div>

      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Issue Type</th>
            <th>Location</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.issueType}</td>
              <td>{item.location}</td>
              <td>{item.description}</td>
              <td>{item.status || "pending"}</td>
              <td>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => updateIssue(item._id)}
                >
                  Resolved
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteIssue(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
