import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig.ts";

import Header from "./components/Header.tsx";
import TaskViewScreen from "./screens/TaskViewScreen.tsx";
import BoardViewScreen from "./screens/BoardViewScreen.tsx";
import ActivityTabScreen from "./screens/ActiveTabScreen.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import LoginPage from "./screens/LoginPage.tsx";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleFilteredTasks = (updatedTasks) => {
    setFilteredTasks(updatedTasks);
  };


  return (
    <Router>
      <div className="bg-[#FFF9F9]">
        <Routes>
          <Route
            path="/"
            element={
              user ? <Navigate to="/task-view" /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/task-view" /> : <LoginPage />}
          />

          <Route
            path="/task-view"
            element={
              <PrivateRoute user={user}>
                <>
                  <Header setFilteredTasks={handleFilteredTasks} />
                  <TaskViewScreen filteredTasks={filteredTasks} />
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/board-view"
            element={
              <PrivateRoute user={user}>
                <>
                  <Header setFilteredTasks={handleFilteredTasks} />
                  <BoardViewScreen filteredTasks={filteredTasks} />
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/activity-log"
            element={
              <PrivateRoute user={user}>
                <>
                  <Header setFilteredTasks={handleFilteredTasks} />
                  <ActivityTabScreen />
                </>
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
