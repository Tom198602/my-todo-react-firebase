import { useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

function getAuthErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "認証に失敗しました。時間をおいてもう一度お試しください。";
}

export function SignInButton() {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignIn() {
    if (!auth || !googleProvider) {
      setError("Firebase設定が不足しています。環境変数を確認してください。");
      return;
    }

    setIsSigningIn(true);
    setError(null);

    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      setError(getAuthErrorMessage(e));
    } finally {
      setIsSigningIn(false);
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleSignIn}
        disabled={isSigningIn}
        className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-lg bg-zinc-950 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-zinc-950/10 transition hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 disabled:bg-zinc-400"
      >
        <span
          aria-hidden="true"
          className="grid h-6 w-6 place-items-center rounded-full bg-white text-sm font-bold text-zinc-950"
        >
          G
        </span>
        {isSigningIn ? "ログイン中..." : "Googleでログイン"}
      </button>
      {error && (
        <p className="text-sm leading-6 text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function SignOutButton() {
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    if (!auth) return;

    setIsSigningOut(true);

    try {
      await signOut(auth);
    } finally {
      setIsSigningOut(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={isSigningOut}
      className="inline-flex min-h-10 items-center justify-center rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm shadow-zinc-950/5 transition hover:border-zinc-950 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 disabled:text-zinc-400"
    >
      {isSigningOut ? "ログアウト中..." : "ログアウト"}
    </button>
  );
}
