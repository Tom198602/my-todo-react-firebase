export type Task = {
  id: string;
  title: string;
  done: boolean;
  createdAt: number;
  updatedAt?: number;
};

export type TaskFilter = "all" | "active" | "completed";
