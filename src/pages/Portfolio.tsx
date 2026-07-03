const highlights = [
  {
    title: "認証とユーザー別データ",
    body: "Firebase AuthenticationでGoogleログインを実装し、Firestoreではユーザーごとにタスクを保存します。",
  },
  {
    title: "リアルタイム同期",
    body: "FirestoreのonSnapshotを使い、タスクの追加・更新・削除が画面にすぐ反映される構成にしました。",
  },
  {
    title: "説明しやすいコード分割",
    body: "Firebase処理はuseTasksに集約し、一覧はTaskList、1件ごとの表示はTaskItemに分けています。",
  },
];

const techStack = [
  "React",
  "TypeScript",
  "Vite",
  "React Router",
  "Firebase Authentication",
  "Firestore",
  "Firebase Hosting",
  "Tailwind CSS",
  "Vitest",
];

const talkingPoints = [
  "ログイン、DB保存、公開まで含めた実務に近い流れを経験するためFirebaseを採用",
  "UIとデータ処理の責務を分け、保守しやすいコンポーネント構成に整理",
  "空状態、ローディング、エラー、送信中など、実際の利用時に必要な状態表示を実装",
  "タスクの集計・フィルター処理を純粋関数に切り出し、単体テストを追加",
];

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <a href="/portfolio" className="flex items-center gap-3">
            <img
              src="/taskflow.svg"
              alt=""
              className="h-9 w-9 rounded-lg shadow-sm shadow-zinc-950/10"
            />
            <span className="text-sm font-semibold tracking-tight">
              TaskFlow
            </span>
          </a>
          <nav className="flex items-center gap-3 text-sm font-medium text-zinc-600">
            <a className="transition hover:text-zinc-950" href="/signin">
              アプリ
            </a>
            <a
              className="transition hover:text-zinc-950"
              href="https://github.com/Tom198602/my-todo-react-firebase"
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
              Portfolio project
            </p>
            <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-tight tracking-tight text-zinc-950 sm:text-5xl">
              TaskFlow
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-zinc-600">
              React、TypeScript、Firebaseで開発したタスク管理アプリです。
              Googleログイン、Firestore保存、リアルタイム同期、Tailwind
              CSSによるレスポンシブUIを実装しています。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/signin"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-zinc-950 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-zinc-950/10 transition hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2"
              >
                アプリを開く
              </a>
              <a
                href="https://github.com/Tom198602/my-todo-react-firebase"
                rel="noreferrer"
                target="_blank"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-800 shadow-sm shadow-zinc-950/5 transition hover:border-zinc-950 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2"
              >
                ソースコードを見る
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 shadow-2xl shadow-zinc-950/10">
            <img
              src="/taskflow-preview.png"
              alt="TaskFlowのサインイン画面"
              className="aspect-[16/10] w-full bg-zinc-100 object-contain p-4 sm:p-6"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
          <div className="grid gap-4 md:grid-cols-3">
            {highlights.map((item) => (
              <article
                key={item.title}
                className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm shadow-zinc-950/5"
              >
                <h2 className="text-base font-semibold tracking-tight">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[320px_1fr] lg:py-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
              Stack
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              使用技術
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-zinc-300 bg-zinc-50 px-3 py-1.5 text-sm font-medium text-zinc-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[320px_1fr] lg:py-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Interview notes
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              面接で説明できること
            </h2>
          </div>
          <ul className="grid gap-3 text-sm leading-6 text-zinc-300">
            {talkingPoints.map((point) => (
              <li key={point} className="border-b border-white/10 pb-3">
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
