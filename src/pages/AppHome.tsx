import type { User } from "firebase/auth";
import { SignOutButton } from "../components/AuthButtons";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

 export default function AppHome({ currentUser }: { currentUser: User }) {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-10">
        {/* ヘッダー */}
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              タスク管理
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              ようこそ、{currentUser.displayName ?? "ユーザー"} さん
            </p>
          </div>
          <SignOutButton />
        </header>

        {/* カード枠 */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          {/* フォーム */}
          <TaskForm currentUser={currentUser} />

          {/* 仕切り線 */}
          <div className="my-5 h-px bg-gray-100" />

          {/* リスト */}
          <TaskList currentUser={currentUser} />
        </div>
      </div>
    </main>
  );
}

