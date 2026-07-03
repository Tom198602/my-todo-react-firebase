import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import type { Task } from "../types/task";

function getTaskErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return "タスクの更新に失敗しました。時間をおいてもう一度お試しください。";
}

export function useTasks(userId: string) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [busyTaskId, setBusyTaskId] = useState<string | null>(null);
  const [isClearingCompleted, setIsClearingCompleted] = useState(false);

  useEffect(() => {
    if (!db) {
      setError("Firebase設定が不足しています。環境変数を確認してください。");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const taskQuery = query(
      collection(db, "users", userId, "tasks"),
      orderBy("createdAt", "asc"),
    );

    return onSnapshot(
      taskQuery,
      (snap) => {
        const nextTasks = snap.docs.map((taskDoc): Task => {
          const data = taskDoc.data() as Omit<Task, "id">;
          return { id: taskDoc.id, ...data };
        });

        setTasks(nextTasks);
        setLoading(false);
      },
      (e) => {
        setError(e.message);
        setLoading(false);
      },
    );
  }, [userId]);

  async function runTaskAction(taskId: string, action: () => Promise<void>) {
    setActionError(null);
    setBusyTaskId(taskId);

    try {
      await action();
    } catch (e) {
      setActionError(getTaskErrorMessage(e));
    } finally {
      setBusyTaskId(null);
    }
  }

  async function toggleTask(task: Task) {
    if (!db) return;

    const firestore = db;
    await runTaskAction(task.id, () =>
      updateDoc(doc(firestore, "users", userId, "tasks", task.id), {
        done: !task.done,
        updatedAt: Date.now(),
      }),
    );
  }

  async function renameTask(taskId: string, title: string) {
    if (!db) return;

    const firestore = db;
    await runTaskAction(taskId, () =>
      updateDoc(doc(firestore, "users", userId, "tasks", taskId), {
        title,
        updatedAt: Date.now(),
      }),
    );
  }

  async function removeTask(taskId: string) {
    if (!db) return;

    const firestore = db;
    await runTaskAction(taskId, () =>
      deleteDoc(doc(firestore, "users", userId, "tasks", taskId)),
    );
  }

  async function clearCompletedTasks() {
    if (!db) return;

    const firestore = db;
    const completedTasks = tasks.filter((task) => task.done);
    if (completedTasks.length === 0) return;

    setActionError(null);
    setIsClearingCompleted(true);

    try {
      await Promise.all(
        completedTasks.map((task) =>
          deleteDoc(doc(firestore, "users", userId, "tasks", task.id)),
        ),
      );
    } catch (e) {
      setActionError(getTaskErrorMessage(e));
    } finally {
      setIsClearingCompleted(false);
    }
  }

  return {
    tasks,
    loading,
    error,
    actionError,
    busyTaskId,
    isClearingCompleted,
    clearActionError: () => setActionError(null),
    toggleTask,
    renameTask,
    removeTask,
    clearCompletedTasks,
  };
}
