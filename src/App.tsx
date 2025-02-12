import React, { useState } from "react";
import Header from "./components/Header.tsx";
import TaskViewScreen from "./screens/Auth/TaskViewScreen.tsx";
import BoardViewScreen from "./screens/Auth/BoardViewScreen.tsx";
import ActivityTabScreen from "./screens/ActiveTabScreen.tsx";
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
      content = <ActivityTabScreen/>;
      break;
  }

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
