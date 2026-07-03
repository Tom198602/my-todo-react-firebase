import type { FormEvent, KeyboardEvent } from "react";
import type { Task } from "../types/task";

function formatDateJP(ts?: number) {
  if (typeof ts !== "number") return "-";

  return new Date(ts).toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

type TaskItemProps = {
  task: Task;
  draftTitle: string;
  isBusy: boolean;
  isEditing: boolean;
  onCancelEdit: () => void;
  onChangeDraftTitle: (title: string) => void;
  onDelete: (taskId: string) => void;
  onSaveEdit: (e: FormEvent, task: Task) => void;
  onStartEdit: (task: Task) => void;
  onToggle: (task: Task) => void;
};

export default function TaskItem({
  task,
  draftTitle,
  isBusy,
  isEditing,
  onCancelEdit,
  onChangeDraftTitle,
  onDelete,
  onSaveEdit,
  onStartEdit,
  onToggle,
}: TaskItemProps) {
  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") onCancelEdit();
  }

  if (isEditing) {
    return (
      <li className="bg-white px-4 py-4 transition hover:bg-zinc-50 sm:px-5">
        <form
          onSubmit={(e) => onSaveEdit(e, task)}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <input
            value={draftTitle}
            onChange={(e) => onChangeDraftTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            maxLength={120}
            className="min-h-11 min-w-0 flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-zinc-950 focus:ring-2 focus:ring-zinc-200"
            aria-label="タスク名を編集"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isBusy}
              className="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg bg-zinc-950 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-zinc-950/10 transition hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-950 disabled:bg-zinc-400 sm:flex-none"
            >
              保存
            </button>
            <button
              type="button"
              onClick={onCancelEdit}
              disabled={isBusy}
              className="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm shadow-zinc-950/5 transition hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-950 disabled:text-zinc-400 sm:flex-none"
            >
              キャンセル
            </button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className="bg-white px-4 py-4 transition hover:bg-zinc-50 sm:px-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 flex-1 items-start gap-3 sm:gap-4">
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => onToggle(task)}
            disabled={isBusy}
            aria-label={`${task.title}を${task.done ? "未完了" : "完了"}にする`}
            className="mt-1 h-4 w-4 rounded border-zinc-300 text-zinc-950 focus:ring-zinc-950 disabled:opacity-50"
          />
          <div className="min-w-0 flex-1">
            <p
              className={
                "break-words text-sm font-medium " +
                (task.done ? "text-zinc-400 line-through" : "text-zinc-950")
              }
            >
              {task.title}
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              {formatDateJP(task.createdAt)}
              {task.updatedAt && task.updatedAt !== task.createdAt
                ? ` / 更新 ${formatDateJP(task.updatedAt)}`
                : ""}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 gap-2 sm:justify-end">
          <button
            type="button"
            onClick={() => onStartEdit(task)}
            disabled={isBusy}
            className="rounded-md px-2.5 py-1.5 text-sm font-medium text-zinc-500 transition hover:bg-white hover:text-zinc-950 focus:outline-none focus:ring-2 focus:ring-zinc-950 disabled:text-zinc-400"
          >
            編集
          </button>
          <button
            type="button"
            onClick={() => onDelete(task.id)}
            disabled={isBusy}
            className="rounded-md px-2.5 py-1.5 text-sm font-medium text-zinc-500 transition hover:bg-white hover:text-zinc-950 focus:outline-none focus:ring-2 focus:ring-zinc-950 disabled:text-zinc-400"
          >
            削除
          </button>
        </div>
      </div>
    </li>
  );
}
