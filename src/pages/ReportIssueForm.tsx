import { useState } from "react";
import axios from "axios";

const ReportIssueForm = () => {
  const [issueType, setIssueType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const validateForm = () => {
    if (!issueType || !location || !description) {
      alert("Please fill out all fields!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 

    if (!validateForm()) return;

    const newReport = {
      issueType,
      location,
      description,
      status: "pending", 
    };

    try {
      await axios.post("http://localhost:5000/issues", newReport);

      alert("Report submitted successfully!");

      setIssueType("");
      setLocation("");
      setDescription("");

    } catch (error) {
      console.error(error);
      alert("Error submitting report");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Report an Issue</h2>

      <form onSubmit={handleSubmit}>
        
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Issue Type (e.g. Pothole, Garbage)"
          value={issueType}
          onChange={(e) => setIssueType(e.target.value)}
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <textarea
          className="form-control mb-3"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <button type="submit" className="btn btn-primary w-100">
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default ReportIssueForm;