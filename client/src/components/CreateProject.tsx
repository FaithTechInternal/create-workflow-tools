import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProject } from "../services/api";

const CreateProject: React.FC = () => {
  const [projectName, setProjectName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProject({
        name: projectName,
        stages: {
          Discover: { completed: false },
          Discern: { completed: false },
          Develop: { completed: false },
          Demonstrate: { completed: false },
        },
      });
      navigate("/projects");
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Create New Project</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Create Project
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
