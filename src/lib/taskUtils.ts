import type { Task, TaskFilter } from "../types/task";

export type TaskStats = {
  activeCount: number;
  completedCount: number;
  completionRate: number;
};

export function getTaskStats(tasks: Task[]): TaskStats {
  const completedCount = tasks.filter((task) => task.done).length;
  const activeCount = tasks.length - completedCount;
  const completionRate =
    tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

  return { activeCount, completedCount, completionRate };
}

export function filterTasks(tasks: Task[], filter: TaskFilter): Task[] {
  if (filter === "active") return tasks.filter((task) => !task.done);
  if (filter === "completed") return tasks.filter((task) => task.done);
  return tasks;
}
