import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavBar from './components/NavBar';
import IssueList from './pages/IssueList';
import IssueDetails from './pages/IssueDetails';
import Footer from './components/Footer';
import Admin from './components/Admin';
import ReportIssuesForm from './pages/ReportIssueForm';

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
            <Routes>
              <Route 
                path="/" 
                element={
                  <div id="home">
                    <h1 className="text-center mb-4">Issue Report System</h1>
                    <div id="report">
                      <ReportIssuesForm />
                    </div>
                    <div id="list" className="mt-5">
                      <IssueList />
                    </div>
                  </div>
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
