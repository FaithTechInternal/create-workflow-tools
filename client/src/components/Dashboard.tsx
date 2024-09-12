import React from "react";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/projects"
          className="bg-blue-500 text-white p-4 rounded text-center"
        >
          View Projects
        </Link>
        <Link
          to="/create-project"
          className="bg-green-500 text-white p-4 rounded text-center"
        >
          Create New Project
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
