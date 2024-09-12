import axios from "axios";
import { Project } from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Set up the authorization header with the token from localStorage
api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get("/projects");
  return response.data;
};

export const getProject = async (id: number): Promise<Project> => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};

export const createProject = async (
  projectData: Partial<Project>
): Promise<Project> => {
  const response = await api.post("/projects", projectData);
  return response.data;
};

export const updateProject = async (
  id: number,
  projectData: Partial<Project>
): Promise<Project> => {
  const response = await api.put(`/projects/${id}`, projectData);
  return response.data;
};

export default api;
