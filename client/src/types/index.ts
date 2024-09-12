export type Stage = "Discover" | "Discern" | "Develop" | "Demonstrate";

export interface Project {
  id: number;
  name: string;
  stages: {
    [key in Stage]: {
      completed: boolean;
    };
  };
}
