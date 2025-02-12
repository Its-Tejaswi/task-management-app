import React from "react";
import { useDispatch } from "react-redux";
import ToDoBoard from "../../components/BoardCards/ToDoBoard.tsx";
import InProgressBoard from "../../components/BoardCards/InProgressBoard.tsx";
import CompletedBoard from "../../components/BoardCards/CompletedBoard.tsx";

import { DndContext, closestCorners } from "@dnd-kit/core";
import { updateTaskStatus } from "../../store/index.js";

const BoardViewScreen = ({ filteredTasks }) => {
  const dispatch = useDispatch();
  // const tasksList = useSelector((state) => state.tasks.tasksList);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return; // Dropped outside any board

    const taskId = active.id;
    const newStatus = over.id; // Target board ID

    dispatch(updateTaskStatus({ id: taskId, newStatus }));
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="min-h-screen flex flex-col md:flex-row justify-between items-start gap-6 p-6">
        {" "}
        <ToDoBoard
          id="Pending"
          tasks={filteredTasks.filter((task) => task.status === "Pending")}
        />
        <InProgressBoard
          id="In Progress"
          tasks={filteredTasks.filter((task) => task.status === "In Progress")}
        />
        <CompletedBoard
          id="Completed"
          tasks={filteredTasks.filter((task) => task.status === "Completed")}
        />
      </div>
    </DndContext>
  );
};

export default BoardViewScreen;

// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import ToDoBoard from "../../components/BoardCards/ToDoBoard.tsx";
// import InProgressBoard from "../../components/BoardCards/InProgressBoard.tsx";
// import CompletedBoard from "../../components/BoardCards/CompletedBoard.tsx";

// import { DndContext, closestCorners } from "@dnd-kit/core";
// import { arrayMove } from "@dnd-kit/sortable";
// import { updateTaskStatus, reorderTasks } from "../../store/index.js";

// const BoardViewScreen = () => {
//   const dispatch = useDispatch();
//   const tasksList = useSelector((state) => state.tasks.tasksList);

//   const handleDragEnd = (event) => {
//     const { active, over } = event;

//     if (!active || !over) {
//       return;
//     }

//     const activeId = active.id;
//     const overId = over.id;

//     const activeTask = tasksList.find((task) => String(task.id) === String(activeId));
//     const overTask = tasksList.find((task) => String(task.id) === String(overId));

//     if (!activeTask || !overTask) return;

//     if (activeTask.status !== overTask.status) {
//       // Handle status change if dragged to a different board
//       dispatch(updateTaskStatus({ id: activeId, newStatus: overTask.status }));
//     } else if (activeId !== overId) {
//       // Handle reordering within the same board
//       const tasksInSameStatus = tasksList.filter((task) => task.status === activeTask.status);
//       const fromIndex = tasksInSameStatus.findIndex((task) => String(task.id) === String(activeId));
//       const toIndex = tasksInSameStatus.findIndex((task) => String(task.id) === String(overId));

//       if (fromIndex !== -1 && toIndex !== -1) {
//         const newTasks = arrayMove(tasksInSameStatus, fromIndex, toIndex).map((task, index) => ({
//           ...task,
//           order: index, // Add or update the 'order' property
//         }));

//         // Dispatch reorder action with the updated task list for the board
//         dispatch(reorderTasks({ status: activeTask.status, tasks: newTasks }));
//       }
//     }
//   };

//   const getTasksForBoard = (status) => {
//       return tasksList.filter((task) => task.status === status).sort((a, b) => (a.order || 0) - (b.order || 0));
//   };

//   return (
//     <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
//       <div className="bg-gray-200 min-h-screen flex flex-col md:flex-row justify-between items-start gap-6 p-6">
//         <ToDoBoard
//           id="Pending"
//           tasks={getTasksForBoard("Pending")}
//         />
//         <InProgressBoard
//           id="In Progress"
//           tasks={getTasksForBoard("In Progress")}
//         />
//         <CompletedBoard
//           id="Completed"
//           tasks={getTasksForBoard("Completed")}
//         />
//       </div>
//     </DndContext>
//   );
// };

// export default BoardViewScreen;
