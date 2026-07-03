import { type FormEvent, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import type { User } from "firebase/auth";
import { db } from "../firebase";

const MAX_TITLE_LENGTH = 120;

function getTaskErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "タスクを追加できませんでした。時間をおいてもう一度お試しください。";
}

export default function TaskForm({ currentUser }: { currentUser: User }) {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    if (!db) {
      setError("Firebase設定が不足しています。環境変数を確認してください。");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const now = Date.now();
      await addDoc(collection(db, "users", currentUser.uid, "tasks"), {
        title: trimmedTitle,
        done: false,
        createdAt: now,
        updatedAt: now,
      });
      setTitle("");
    } catch (e) {
      setError(getTaskErrorMessage(e));
    } finally {
      setIsSubmitting(false);
    }
  }

  const isSubmitDisabled = isSubmitting || title.trim().length === 0;

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <label
          htmlFor="task-title"
          className="text-sm font-semibold text-zinc-950"
        >
          新しいタスク
        </label>
        <p className="text-xs font-medium text-zinc-400" aria-live="polite">
          {title.length}/{MAX_TITLE_LENGTH}
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="task-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="例: ポートフォリオを更新する"
          maxLength={MAX_TITLE_LENGTH}
          aria-describedby={error ? "task-form-error" : undefined}
          aria-invalid={Boolean(error)}
          className="min-h-12 min-w-0 flex-1 rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm outline-none transition placeholder:text-zinc-400 hover:border-zinc-500 focus:border-zinc-950 focus:bg-white focus:ring-2 focus:ring-zinc-200"
        />
        <button
          type="submit"
          disabled={isSubmitDisabled}
          className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-lg bg-zinc-950 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-zinc-950/10 transition hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 disabled:bg-zinc-400"
        >
          {isSubmitting ? "追加中..." : "追加"}
        </button>
      </div>
      {error && (
        <p id="task-form-error" className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
