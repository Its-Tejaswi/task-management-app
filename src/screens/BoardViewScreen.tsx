import React from "react";
import ToDoBoard from "../components/BoardCards/ToDoBoard.tsx";
import InProgressBoard from "../components/BoardCards/InProgressBoard.tsx";
import CompletedBoard from "../components/BoardCards/CompletedBoard.tsx";

import { DndContext, closestCorners } from "@dnd-kit/core";
import { useUpdateTaskStatusMutation } from "../store/query/tasksApi.js";
import NoContent from "../components/NoContent.tsx";
import { Task } from "../components/RenderFilterCard.tsx";

const BoardViewScreen = ({ filteredTasks }) => {
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    const taskId = active.id;
    const newStatus = over.id;
    updateTaskStatus({ id: taskId, newStatus });
  };

  if (!filteredTasks || filteredTasks.length === 0) {
    return <NoContent />;
  }

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="min-h-screen flex flex-col md:flex-row justify-between items-start gap-6 p-6">
        {" "}
        <ToDoBoard
          id="Pending"
          tasks={filteredTasks.filter(
            (task: Task) => task.status === "Pending"
          )}
        />
        <InProgressBoard
          id="In Progress"
          tasks={filteredTasks.filter(
            (task: Task) => task.status === "In Progress"
          )}
        />
        <CompletedBoard
          id="Completed"
          tasks={filteredTasks.filter(
            (task: Task) => task.status === "Completed"
          )}
        />
      </div>
    </DndContext>
  );
};

export default BoardViewScreen;
