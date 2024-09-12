import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../services/api";
import { Project } from "../types";

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await getProjects();
        setProjects(Array.isArray(fetchedProjects) ? fetchedProjects : []);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setError("Failed to fetch projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return <div>Loading projects...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4 text-black">Projects</h1>
      {projects.length === 0 ? (
        <p>No projects found. Create a new project to get started!</p>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project.id} className="mb-2">
              <Link
                to={`/project/${project.id}`}
                className="text-blue-500 hover:underline"
              >
                {project.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Link
        to="/create-project"
        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create New Project
      </Link>
    </div>
  );
};

export default ProjectList;
