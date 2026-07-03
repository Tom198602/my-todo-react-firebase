import type { User } from "firebase/auth";
import { SignOutButton } from "../components/AuthButtons";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function AppHome({ currentUser }: { currentUser: User }) {
  const displayName = currentUser.displayName ?? "ユーザー";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <main className="mono-grid min-h-screen bg-zinc-100 text-zinc-950">
      <div className="sticky top-0 z-10 border-b border-zinc-200 bg-white/90 backdrop-blur">
        <header className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <img
              src="/taskflow.svg"
              alt=""
              className="h-10 w-10 rounded-lg shadow-sm shadow-zinc-950/10"
            />
            <div className="min-w-0">
              <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
                TaskFlow
              </h1>
              <p className="truncate text-sm text-zinc-500">{displayName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/portfolio"
              className="hidden rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm shadow-zinc-950/5 transition hover:border-zinc-950 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 sm:inline-flex"
            >
              作品紹介
            </a>
            {currentUser.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt=""
                className="h-10 w-10 rounded-full border border-white shadow-sm shadow-zinc-950/10"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="grid h-10 w-10 place-items-center rounded-full bg-zinc-950 text-sm font-semibold text-white shadow-sm shadow-zinc-950/10">
                {initial}
              </div>
            )}
            <SignOutButton />
          </div>
        </header>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-6 sm:px-6 lg:py-8">
        <section className="grid gap-2 border-b border-zinc-300 pb-6 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
              Daily desk
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              今日の作業を整える
            </h2>
          </div>
          <p className="text-sm text-zinc-500">Private task board</p>
        </section>

        <section className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm shadow-zinc-950/5 sm:p-5">
          <TaskForm currentUser={currentUser} />
        </section>

        <TaskList currentUser={currentUser} />
      </div>
    </main>
  );
}
