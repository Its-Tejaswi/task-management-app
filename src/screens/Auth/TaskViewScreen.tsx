import React, { useEffect, useState } from "react";
import ToDoListCard from "../../components/ListCards/ToDoListCard.tsx";
import InProgressCard from "../../components/ListCards/InProgressCard.tsx";
import CompletedCard from "../../components/ListCards/CompletedCard.tsx";
import { useDispatch } from "react-redux";

import { DndContext, closestCorners } from "@dnd-kit/core";

import { updateTaskStatus } from "../../store/index.js";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Task } from "../../components/RenderFilterCard.tsx";

const TaskViewScreen = ({ filteredTasks }) => {
  const dispatch = useDispatch();

  const [orderedTasks, setOrderedTasks] = useState<Task[] | null>(null);
  const [updatedFilteredTasks, setUpdatedFilteredTasks] = useState<
    Task[] | null
  >(filteredTasks);

  const [sortedState, setSortedState] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const sorted = [...filteredTasks].sort((a, b) => {
      return sortedState === "desc"
        ? new Date(b.dueDate) - new Date(a.dueDate)
        : new Date(a.dueDate) - new Date(b.dueDate);
    });

    setOrderedTasks(sorted);
  }, [filteredTasks, sortedState]);

  useEffect(() => {
    setUpdatedFilteredTasks(orderedTasks);
  }, [filteredTasks, orderedTasks]);

  const handleSort = () => {
    setSortedState((curr) => (curr === "asc" ? "desc" : "asc"));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return; // Dropped outside any board

    const taskId = active.id;
    const newStatus = over.id; // Target board ID

    dispatch(updateTaskStatus({ id: taskId, newStatus }));
  };

  return (
    <>
      <hr />
      <div className="flex flex-col items-center justify-between ml-5 mr-5 mb-20">
        {/* <Filter tasks={filteredTasks} filterStatus="All" /> */}
        <div className="bg-white shadow-lg w-full text-center align-center">
          <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
            <table className="min-w-full bg-white border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-sm font-semibold text-gray-600 p-4 text-center border-b border-gray-300">
                    Task name
                  </th>
                  <th className="text-sm font-semibold text-gray-600 p-4 text-center border-b border-gray-300 flex items-center justify-center">
                    <span className="mr-2">Due on</span>
                    <button
                      className="ml-1 p-1 rounded bg-gray-200 hover:bg-gray-300"
                      onClick={handleSort}
                    >
                      <ArrowUpward fontSize="small" />
                    </button>
                    <button
                      className="ml-1 p-1 rounded bg-gray-200 hover:bg-gray-300"
                      onClick={handleSort}
                    >
                      <ArrowDownward fontSize="small" />
                    </button>
                  </th>
                  <th className="text-sm font-semibold text-gray-600 p-4 text-center border-b border-gray-300">
                    Task Status
                  </th>
                  <th className="text-sm font-semibold text-gray-600 p-4 text-center border-b border-gray-300">
                    Task Category
                  </th>
                </tr>
              </thead>
            </table>
          </div>
        </div>

        <DndContext
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <ToDoListCard
            id="Pending"
            tasks={updatedFilteredTasks?.filter(
              (task) => task.status === "Pending"
            )}
          />
          <InProgressCard
            id="In Progress"
            tasks={updatedFilteredTasks?.filter(
              (task) => task.status === "In Progress"
            )}
          />
          <CompletedCard
            id="Completed"
            tasks={updatedFilteredTasks?.filter(
              (task) => task.status === "Completed"
            )}
          />
        </DndContext>
      </div>
    </>
  );
};

export default TaskViewScreen;
