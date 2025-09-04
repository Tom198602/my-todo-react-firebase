import { useEffect, useState } from 'react';
import {
   collection,onSnapshot, orderBy, query, doc, updateDoc, deleteDoc
} from 'firebase/firestore';
import { db } from '../firebase';
import type { User } from 'firebase/auth';
import type { Task } from '../types/task';

function formatDateJP(ts?: number) {
  if (typeof ts !== "number") return "-";
  return new Date(ts).toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function TaskList( { currentUser }: { currentUser: User } ) {
   const [tasks, setTasks] = useState<Task[]>([]);
   const [loading, setLoading] = useState(true);
   const [err, setErr] = useState<string | null>(null);

   useEffect(() => {
      const q = query(
         collection(db, "users", currentUser.uid, "tasks"),
         orderBy("createdAt", "asc")
      );
      const unsub = onSnapshot(
         q, 
         (snap) => {
            const list = snap.docs.map((d) => ({
               id: d.id,
               ...(d.data() as Omit<Task, "id">),
            }));
            setTasks(list);
            setLoading(false);
         },
         (e) => {
            setErr(e.message);
            setLoading(false);
         }
      );
      return unsub
   }, [currentUser.uid]);

   if (loading) return <p>読み込み中...</p>;
   if (err) return <p style={{ color: "crimson"}}>エラー: {err}</p>;
   if(!tasks.length) return <p>タスクはまだありません</p>;

   async function toggle(id: string, done: boolean) {
      await updateDoc(doc(db, "users", currentUser.uid, "tasks", id), { done: !done})
   }
   async function remove( id: string ) {
      await deleteDoc(doc(db, "users", currentUser.uid, "tasks", id));
   }

   return(
      <ul className='space-y-2'>
         {tasks.length === 0 && (
            <li className='text-sm text-gray-500'>タスクはまだありません</li>
         )}

         {tasks.map((t) => (
            <li
               key={t.id} 
               className='flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2'
            >
               <label className='flex flex-1 items-center gap-3'>
                  <input 
                     type="checkbox"
                     checked={t.done}
                     onChange={() => toggle(t.id, t.done)}
                     className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                  />
                  
                  <div className='flex-1'>
                     <span
                        className={
                           "text-sm text-gray-800 " + (t.done ? "line-through text-gray-400" : "")
                        }
                     >
                        {t.title}
                     </span>

                     <div className='mt-1 text-xs text-gray-500'>
                        作成 {formatDateJP(t.createdAt)}
                     </div>
                  </div>
            
               </label>

               <button 
                  onClick={() => remove(t.id)}
                  className='rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-50 hover:text-red-600'
               >
                  削除
               </button>
            </li>
         ))}
      </ul>
   );

}