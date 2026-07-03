import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { Routes, Route, Navigate } from "react-router-dom";
import { auth, firebaseConfigError, missingFirebaseEnv } from "./firebase";
import SignIn from "./pages/SignIn";
import AppHome from "./pages/AppHome";

function AppLoading() {
  return (
    <main className="mono-grid grid min-h-screen place-items-center bg-zinc-100 px-4">
      <div className="rounded-lg border border-zinc-200 bg-white px-5 py-4 text-sm text-zinc-600 shadow-sm shadow-zinc-950/5">
        認証状態を確認しています...
      </div>
    </main>
  );
}

function FirebaseSetupError() {
  return (
    <main className="mono-grid grid min-h-screen place-items-center bg-zinc-100 px-4">
      <section className="w-full max-w-xl rounded-lg border border-zinc-200 bg-white p-6 shadow-sm shadow-zinc-950/5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
          Firebase setup required
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950">
          Firebase設定が必要です
        </h1>
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          `.env.local.example` を `.env.local` にコピーして、Firebase
          プロジェクトの値を設定してください。
        </p>
        {firebaseConfigError && (
          <p className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700">
            {firebaseConfigError}
          </p>
        )}
        {missingFirebaseEnv.length > 0 && (
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-zinc-600">
            {missingFirebaseEnv.map((key) => (
              <li key={key}>{key}</li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!auth) {
      setChecking(false);
      return;
    }

    return onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setChecking(false);
    });
  }, []);

  if (!auth) return <FirebaseSetupError />;
  if (checking) return <AppLoading />;

  return (
    <Routes>
      <Route
        path="/signin"
        element={currentUser ? <Navigate to="/app" replace /> : <SignIn />}
      />
      <Route
        path="/app"
        element={
          currentUser ? (
            <AppHome currentUser={currentUser} />
          ) : (
            <Navigate to="/signin" replace />
          )
        }
      />
      <Route
        path="*"
        element={<Navigate to={currentUser ? "/app" : "/signin"} replace />}
      />
    </Routes>
  );
}

export default App;
