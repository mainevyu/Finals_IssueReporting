import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import NavBar from "./components/NavBar";
import IssueList from "./Pages/IssueList";
import IssueDetails from "./Pages/IssuesDetails";
import Footer from "./components/Footer";
import Admin from "./components/Admin";
import ReportIssuesForm from "./components/ReportIssuesForm";

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <Router>
      {isAdmin ? (
        <Admin onBack={() => setIsAdmin(false)} />
      ) : (
        <>
          <NavBar />

          <div className="container mt-4">
            <h1 className="text-center mb-4">Issue Report System</h1>

            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <ReportIssuesForm />
                    <IssueList />
                  </>
                }
              />

              <Route path="/issues/:id" element={<IssueDetails />} />
            </Routes>
          </div>

          <Footer onAdminAccess={() => setIsAdmin(true)} />
        </>
      )}
    </Router>
  );
};

export default App;
