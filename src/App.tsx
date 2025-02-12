import React, { useState } from "react";
import Header from "./components/Header.tsx";
import TaskViewScreen from "./screens/Auth/TaskViewScreen.tsx";
import BoardViewScreen from "./screens/Auth/BoardViewScreen.tsx";
import ActivityTabScreen from "./screens/ActiveTabScreen.tsx";

import { createBrowserRouter } from "react-router";
import LoginScreen from "./screens/LoginScreen.tsx";
function App() {
  let content;

  const [view, setView] = useState("list");
  const [filteredTasks, setFilteredTasks] = useState([]);

  const handleFilteredTasks = (updatedTasks) => {
    setFilteredTasks(updatedTasks);
  };

  const handleViewChange = (newView: string) => {
    setView(newView);
  };

  switch (view) {
    case "list":
      content = <TaskViewScreen filteredTasks={filteredTasks} />;
      break;

    case "board":
      content = <BoardViewScreen filteredTasks={filteredTasks} />;
      break;

    case "activity":
      content = <ActivityTabScreen />;
      break;
  }

  // React Router Impl.

  const router = createBrowserRouter([
    {
      index: true,
      path: "/login",
      element: <LoginScreen />,
    },
    {
      path: "/",
      element: (
        <Auth>
          <TaskViewScreen filteredTasks={filteredTasks} />,
        </Auth>
      ),

      children: [
        {
          path: "/task-view",
          element: (
            <Auth>
              <TaskViewScreen filteredTasks={filteredTasks} />,
            </Auth>
          ),
        },
        {
          path: "board-view",

        }
      ],
    },
  ]);

  return (
    <div className="bg-[#FFF9F9]">
      {/* <LoginScreen /> */}
      {/* <TaskList /> */}
      <Header
        onViewChange={handleViewChange}
        setFilteredTasks={handleFilteredTasks}
      />

      {content}
    </div>
  );
}

export default App;
