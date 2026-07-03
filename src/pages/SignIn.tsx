import { SignInButton } from "../components/AuthButtons";

export default function SignIn() {
  return (
    <div className="mono-grid grid min-h-screen place-items-center bg-zinc-100 px-4 py-6 text-zinc-950 sm:py-10">
      <main className="grid w-full max-w-5xl overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-2xl shadow-zinc-950/10 lg:grid-cols-[1fr_420px]">
        <section className="hidden min-h-[560px] border-r border-zinc-200 bg-zinc-950 p-8 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="flex items-center gap-3">
            <img src="/taskflow.svg" alt="" className="h-10 w-10 rounded-lg" />
            <div>
              <p className="text-xs font-semibold uppercase text-zinc-400">
                Personal workspace
              </p>
              <h1 className="text-2xl font-semibold tracking-tight">
                TaskFlow
              </h1>
            </div>
          </div>

          <div>
            <p className="max-w-md text-5xl font-semibold leading-none tracking-tight">
              Make today visibly manageable.
            </p>
            <div className="mt-8 grid max-w-md grid-cols-3 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10">
              <div className="bg-zinc-950 p-4">
                <p className="text-2xl font-semibold">01</p>
                <p className="mt-2 text-xs uppercase text-zinc-500">Plan</p>
              </div>
              <div className="bg-zinc-950 p-4">
                <p className="text-2xl font-semibold">02</p>
                <p className="mt-2 text-xs uppercase text-zinc-500">Track</p>
              </div>
              <div className="bg-zinc-950 p-4">
                <p className="text-2xl font-semibold">03</p>
                <p className="mt-2 text-xs uppercase text-zinc-500">Clear</p>
              </div>
            </div>
          </div>

          <p className="text-sm text-zinc-500">React / TypeScript / Firebase</p>
        </section>

        <section className="flex min-h-[520px] items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-sm">
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <img
                src="/taskflow.svg"
                alt=""
                className="h-11 w-11 rounded-lg shadow-sm"
              />
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                  TaskFlow
                </h1>
                <p className="mt-1 text-sm text-zinc-500">
                  今日のタスクを整理する
                </p>
              </div>
            </div>
            <div className="mb-7 hidden lg:block">
              <p className="text-xs font-semibold uppercase text-zinc-400">
                Sign in
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                Welcome back
              </h2>
            </div>
            <SignInButton />
          </div>
        </section>
      </main>
    </div>
  );
}
