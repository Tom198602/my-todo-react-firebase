import { SignInButton } from "../components/AuthButtons"

export default function SignIn() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <main className="w-full max-w-md bg-white rounded-2xl shadow p-8">
        <h1 className="text-2xl font-bold mb-4">サインイン</h1>
        <p className="text-slate-600 mb-6">Googleアカウントでログインしてください</p>
        <SignInButton />
      </main>
    </div>
  );
}

