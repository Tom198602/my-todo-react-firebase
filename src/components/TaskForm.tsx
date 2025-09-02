import { type FormEvent, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import type { User } from "firebase/auth";

export default function TaskForm( { currentUser }: { currentUser: User }) {
   const [title, setTitle] = useState("");

   async function onSubmit(e: FormEvent){
      e.preventDefault();
      const t = title.trim();
      if(!t) return;
      await addDoc(collection(db, "users", currentUser.uid, "tasks"), {
         title: t,
         done: false,
         createdAt: Date.now()
      });
      setTitle("");

   }


   return (
      <form onSubmit={onSubmit} className="flex items-center gap-2">
         <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="タスク名を入力"
            className="flex-1 min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none ring-0 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
         />
         <button
            type="submit"
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 shrink-0 whitespace-nowrap"
         >
            追加
         </button>
      </form>
   );
}