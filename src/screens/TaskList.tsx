import React, { useState } from "react";
import RenderFilterCard, { Task } from "../components/RenderFilterCard.tsx";
import { Button, Menu, MenuItem } from "@mui/material";
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../store/query/tasksApi.js";

const TaskList = ({ tasks, nodeRef }) => {
  const [updateTask] = useUpdateTaskMutation();

  const [deleteTask] = useDeleteTaskMutation();
  const handleBulkDelete = () => {
    // I'll just pass the entire IDs of selectedTasks as payload
    selectedTasks.forEach(
      async (task) =>
        await deleteTask(task)
    );
    setSelectedTasks([]);
  };

  const handleBulkUpdate = async (newStatus: string) => {
    // Get the tasks that need to be updated
    const toUpdateTasks = tasks.filter((task: Task) =>
      selectedTasks.includes(task.id)
    );

    if (toUpdateTasks.length === 0) {
      console.warn("No tasks selected for update");
      return;
    }

    try {
      await Promise.all(
        toUpdateTasks.map(async (task: Task) => {
          const updatePayload = { status: newStatus };
          await updateTask({ id: task.id, updatedData: updatePayload });
        })
      );
    } catch (error) {
      console.error("Bulk update failed:", error);
    }

    setSelectedTasks([]);
  };
  
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  return (
    <div ref={nodeRef} className="p-2">
      <div className="space-y-4">
        {tasks?.length > 0 ? (
          tasks.map((task: any) => (
            <RenderFilterCard
              task={task}
              key={task.id}
              selectedTasks={selectedTasks}
              setSelectedTasks={setSelectedTasks}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center py-6">No tasks available.</p>
        )}
      </div>
      {selectedTasks?.length > 0 && (
        <div className="flex items-center justify-center gap-4 p-4 mt-6 bg-gray-300 shadow-md rounded-lg">
          <p>{selectedTasks?.length} Items Selected</p>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => setMenuAnchor(e.currentTarget)}
            onPointerDown={(e) => e.stopPropagation()}
          >
            Change Status
          </Button>

          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={() => setMenuAnchor(null)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            transformOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <MenuItem
              onClick={() => handleBulkUpdate("Pending")}
              onPointerDown={(e) => e.stopPropagation()}
            >
              Pending
            </MenuItem>
            <MenuItem
              onClick={() => handleBulkUpdate("In Progress")}
              onPointerDown={(e) => e.stopPropagation()}
            >
              In Progress
            </MenuItem>
            <MenuItem
              onClick={() => handleBulkUpdate("Completed")}
              onPointerDown={(e) => e.stopPropagation()}
            >
              Completed
            </MenuItem>
          </Menu>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleBulkDelete}
            onPointerDown={(e) => e.stopPropagation()}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
