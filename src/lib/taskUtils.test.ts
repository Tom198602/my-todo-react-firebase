import { describe, expect, it } from "vitest";
import type { Task } from "../types/task";
import { filterTasks, getTaskStats } from "./taskUtils";

const tasks: Task[] = [
  {
    id: "task-1",
    title: "ポートフォリオを更新する",
    done: false,
    createdAt: 1783040000000,
  },
  {
    id: "task-2",
    title: "READMEを見直す",
    done: true,
    createdAt: 1783040100000,
  },
  {
    id: "task-3",
    title: "応募書類を確認する",
    done: true,
    createdAt: 1783040200000,
  },
];

describe("getTaskStats", () => {
  it("未完了数、完了数、完了率を計算する", () => {
    expect(getTaskStats(tasks)).toEqual({
      activeCount: 1,
      completedCount: 2,
      completionRate: 67,
    });
  });

  it("タスクがない場合は完了率を0にする", () => {
    expect(getTaskStats([])).toEqual({
      activeCount: 0,
      completedCount: 0,
      completionRate: 0,
    });
  });
});

describe("filterTasks", () => {
  it("未完了タスクだけを返す", () => {
    expect(filterTasks(tasks, "active").map((task) => task.id)).toEqual([
      "task-1",
    ]);
  });

  it("完了済みタスクだけを返す", () => {
    expect(filterTasks(tasks, "completed").map((task) => task.id)).toEqual([
      "task-2",
      "task-3",
    ]);
  });

  it("すべてのタスクを返す", () => {
    expect(filterTasks(tasks, "all")).toEqual(tasks);
  });
});
