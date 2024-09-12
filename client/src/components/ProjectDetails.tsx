import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProject, updateProject } from "../services/api";
import { Project, Stage } from "../types";

const stageOrder: Stage[] = ["Discover", "Discern", "Develop", "Demonstrate"];

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [currentStage, setCurrentStage] = useState<Stage>("Discover");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const fetchedProject = await getProject(Number(id));
        setProject(fetchedProject);
        setCurrentStage(determineCurrentStage(fetchedProject.stages));
      } catch (error) {
        console.error("Failed to fetch project:", error);
      }
    };
    fetchProject();
  }, [id]);

  const determineCurrentStage = (stages: Project["stages"]): Stage => {
    return (
      stageOrder.find((stage) => !stages[stage].completed) || "Demonstrate"
    );
  };

  const handleCompleteStage = async () => {
    if (project) {
      const updatedProject = {
        ...project,
        stages: {
          ...project.stages,
          [currentStage]: { completed: true },
        },
      };
      try {
        await updateProject(project.id, updatedProject);
        setProject(updatedProject);
        setCurrentStage(determineCurrentStage(updatedProject.stages));
      } catch (error) {
        console.error("Failed to update project:", error);
      }
    }
  };

  if (!project) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">{project.name}</h1>
      <div className="mb-4">
        <h2 className="text-2xl">Current Stage: {currentStage}</h2>
        <button
          onClick={handleCompleteStage}
          className="bg-green-500 text-white p-2 rounded mt-2"
          disabled={
            currentStage === "Demonstrate" &&
            project.stages.Demonstrate.completed
          }
        >
          {currentStage === "Demonstrate" &&
          project.stages.Demonstrate.completed
            ? "All Stages Completed"
            : "Mark as Complete"}
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {stageOrder.map((stage) => (
          <div
            key={stage}
            className={`p-4 rounded ${
              project.stages[stage].completed ? "bg-green-200" : "bg-gray-200"
            } ${currentStage === stage ? "border-2 border-blue-500" : ""}`}
          >
            <h3 className="text-xl">{stage}</h3>
            <p>
              {project.stages[stage].completed ? "Completed" : "In Progress"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetails;
