import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

export function SignInButton() {
   return (
 <button
      onClick={() => signInWithPopup(auth, googleProvider)}
      className="w-full inline-flex items-center justify-center gap-2
                 rounded-lg px-5 py-3 font-medium text-white
                 bg-blue-600 hover:bg-blue-700
                 shadow-md hover:shadow-lg
                 transition focus:outline-none
                 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
   >

      Googleでログイン
    </button>   
    )
}

export function SignOutButton() {
   return (
      <button 
         onClick={() => signOut(auth)}
         className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm transition hover:bg-gray-50"
      >
         ログアウト
      </button>
   )
}