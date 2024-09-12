import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import ProjectList from "./components/ProjectList";
import ProjectDetails from "./components/ProjectDetails";
import CreateProject from "./components/CreateProject";
import { AuthProvider } from "./context/AuthContext";
import AuthInterceptor from "./components/AuthInterceptor";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AuthInterceptor>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/projects" element={<ProjectList />} />
              <Route path="/project/:id" element={<ProjectDetails />} />
              <Route path="/create-project" element={<CreateProject />} />
            </Routes>
          </div>
        </Router>
      </AuthInterceptor>
    </AuthProvider>
  );
};

export default App;
