import { type FormEvent, useMemo, useState } from "react";
import type { User } from "firebase/auth";
import TaskItem from "./TaskItem";
import { useTasks } from "../hooks/useTasks";
import type { Task, TaskFilter } from "../types/task";

const FILTERS: Array<{ value: TaskFilter; label: string }> = [
  { value: "all", label: "すべて" },
  { value: "active", label: "未完了" },
  { value: "completed", label: "完了" },
];

function getStats(tasks: Task[]) {
  const completedCount = tasks.filter((task) => task.done).length;
  const activeCount = tasks.length - completedCount;
  const completionRate =
    tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

  return { activeCount, completedCount, completionRate };
}

function filterTasks(tasks: Task[], filter: TaskFilter) {
  if (filter === "active") return tasks.filter((task) => !task.done);
  if (filter === "completed") return tasks.filter((task) => task.done);
  return tasks;
}

function EmptyState({ filter }: { filter: TaskFilter }) {
  const message =
    filter === "completed"
      ? "完了済みのタスクはありません。"
      : filter === "active"
        ? "未完了のタスクはありません。"
        : "タスクはまだありません。";

  return (
    <div className="px-4 py-14 text-center">
      <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-lg bg-zinc-100 text-lg font-semibold text-zinc-400">
        0
      </div>
      <p className="text-sm font-medium text-zinc-600">{message}</p>
    </div>
  );
}

function LoadingPanel() {
  return (
    <section
      className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm shadow-zinc-950/5"
      aria-label="タスクを読み込み中"
    >
      <div className="border-b border-zinc-100 p-5">
        <div className="h-5 w-32 animate-pulse rounded bg-zinc-100" />
        <div className="mt-3 h-4 w-48 animate-pulse rounded bg-zinc-100" />
      </div>
      <div className="divide-y divide-zinc-100">
        {[0, 1, 2].map((item) => (
          <div key={item} className="flex items-center gap-3 p-4">
            <div className="h-4 w-4 animate-pulse rounded bg-zinc-100" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/5 animate-pulse rounded bg-zinc-100" />
              <div className="h-3 w-2/5 animate-pulse rounded bg-zinc-100" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ErrorAlert({ message }: { message: string }) {
  return (
    <div
      className="rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 shadow-sm"
      role="alert"
    >
      <p className="font-medium">タスクを読み込めませんでした。</p>
      <p className="mt-1 break-words">{message}</p>
    </div>
  );
}

export default function TaskList({ currentUser }: { currentUser: User }) {
  const {
    tasks,
    loading,
    error,
    actionError,
    busyTaskId,
    isClearingCompleted,
    clearActionError,
    toggleTask,
    renameTask,
    removeTask,
    clearCompletedTasks,
  } = useTasks(currentUser.uid);

  const [filter, setFilter] = useState<TaskFilter>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState("");

  const stats = getStats(tasks);
  const visibleTasks = useMemo(
    () => filterTasks(tasks, filter),
    [filter, tasks],
  );

  function startEditing(task: Task) {
    setEditingId(task.id);
    setDraftTitle(task.title);
    clearActionError();
  }

  function cancelEditing() {
    setEditingId(null);
    setDraftTitle("");
  }

  async function saveEdit(e: FormEvent, task: Task) {
    e.preventDefault();

    const nextTitle = draftTitle.trim();
    if (!nextTitle || nextTitle === task.title) {
      cancelEditing();
      return;
    }

    await renameTask(task.id, nextTitle);
    cancelEditing();
  }

  if (loading) return <LoadingPanel />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <section
      className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm shadow-zinc-950/5"
      aria-label="タスクリスト"
    >
      <div className="border-b border-zinc-100 p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-zinc-950">
              今日のタスク
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              {stats.activeCount}件が未完了、{stats.completedCount}
              件が完了済みです。
            </p>
          </div>
          <button
            type="button"
            onClick={clearCompletedTasks}
            disabled={stats.completedCount === 0 || isClearingCompleted}
            className="inline-flex min-h-10 items-center justify-center rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm shadow-zinc-950/5 transition hover:border-zinc-950 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 disabled:text-zinc-400"
          >
            {isClearingCompleted ? "削除中..." : "完了を一括削除"}
          </button>
        </div>

        <dl className="mt-5 grid grid-cols-3 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50">
          <div className="border-r border-zinc-200 px-3 py-3 sm:px-4">
            <dt className="text-xs font-medium text-zinc-500">合計</dt>
            <dd className="mt-1 text-2xl font-semibold text-zinc-950">
              {tasks.length}
            </dd>
          </div>
          <div className="border-r border-zinc-200 px-3 py-3 sm:px-4">
            <dt className="text-xs font-medium text-zinc-500">未完了</dt>
            <dd className="mt-1 text-2xl font-semibold text-zinc-950">
              {stats.activeCount}
            </dd>
          </div>
          <div className="px-3 py-3 sm:px-4">
            <dt className="text-xs font-medium text-zinc-500">完了率</dt>
            <dd className="mt-1 text-2xl font-semibold text-zinc-950">
              {stats.completionRate}%
            </dd>
          </div>
        </dl>

        <div
          className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-100"
          aria-label={`完了率 ${stats.completionRate}%`}
        >
          <div
            className="h-full rounded-full bg-zinc-950 transition-all"
            style={{ width: `${stats.completionRate}%` }}
          />
        </div>

        <div
          className="mt-5 inline-flex rounded-lg border border-zinc-200 bg-zinc-100 p-1"
          role="group"
          aria-label="表示するタスク"
        >
          {FILTERS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFilter(option.value)}
              aria-pressed={filter === option.value}
              className={
                "rounded-md px-3 py-1.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-zinc-950 " +
                (filter === option.value
                  ? "bg-white text-zinc-950 shadow-sm shadow-zinc-950/5"
                  : "text-zinc-500 hover:text-zinc-800")
              }
            >
              {option.label}
            </button>
          ))}
        </div>

        {actionError && (
          <div
            className="mt-4 flex flex-col gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between"
            role="alert"
          >
            <p className="break-words">{actionError}</p>
            <button
              type="button"
              onClick={clearActionError}
              className="self-start rounded-md px-2 py-1 font-medium text-red-700 transition hover:bg-red-100 sm:self-auto"
            >
              閉じる
            </button>
          </div>
        )}
      </div>

      {visibleTasks.length === 0 ? (
        <EmptyState filter={filter} />
      ) : (
        <ul className="divide-y divide-zinc-100">
          {visibleTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              draftTitle={draftTitle}
              isBusy={busyTaskId === task.id}
              isEditing={editingId === task.id}
              onCancelEdit={cancelEditing}
              onChangeDraftTitle={setDraftTitle}
              onDelete={removeTask}
              onSaveEdit={saveEdit}
              onStartEdit={startEditing}
              onToggle={toggleTask}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
