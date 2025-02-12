import React, { useState } from "react";
import RenderFilterCard from "../../components/RenderFilterCard.tsx";
import { Button, Menu, MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../../store/index.js";

const TaskList = ({ tasks, nodeRef }) => {
  const dispatch = useDispatch();
  const handleBulkDelete = () => {
    // I'll just pass the entire IDs of selectedTasks as payload
    selectedTasks.forEach((task) => dispatch(deleteTask(task)));
    setSelectedTasks([]);
  };

  const handleBulkUpdate = (newStatus) => {
    // We map through each ID and then take the new status and update

    // Here I got the 2 tasks from the main tasks

    const toUpdateTasks = tasks.filter((task) =>
      selectedTasks.includes(task.id)
    );

    toUpdateTasks.forEach((task) =>
      dispatch(updateTask({ ...task, status: newStatus }))
    );
    setSelectedTasks([]);
  };

  // You can Delete multiple tasks from one single, status group
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
