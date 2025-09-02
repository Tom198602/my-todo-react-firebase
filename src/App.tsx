import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "./firebase";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import AppHome from "./pages/AppHome";

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      setChecking(false);
    });
  }, []);

  if (checking) return <p style={{ padding: 24 }}>読み込み中...</p>;

  return (
    <Routes>
      <Route
        path="/signin"
        element= {
          currentUser ? <Navigate to="/app" replace /> : <SignIn />
        }
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
        element={
          <Navigate to={currentUser ? "/app" : "/signin"} replace />
        }
      />
      </Routes>
  );
}

export default App
