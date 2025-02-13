import React, { useState } from "react";
import {
  Typography,
  IconButton,
  Checkbox,
  Button,
  MenuItem,
  Menu,
} from "@mui/material";
import { Delete, Edit, MoreVert } from "@mui/icons-material";
import { useDraggable } from "@dnd-kit/core";
import TaskUpdateModal from "./TaskUpdateModal.tsx";
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../store/query/tasksApi.js";

export interface Task {
  id: number;
  name: string;
  description?: string;
  dueDate: string;
  status: string;
  category: string;
  image?: string;
}

interface RenderFilterCardProps {
  task: Task;
  selectedTasks: number[];
  setSelectedTasks: React.Dispatch<React.SetStateAction<number[]>>;
}

const RenderFilterCard: React.FC<RenderFilterCardProps> = ({
  task,
  selectedTasks,
  setSelectedTasks,
}) => {
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [selectedStatus, setSelectedStatus] = useState(task.status);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [statusMenuAnchor, setStatusMenuAnchor] = useState<null | HTMLElement>(
    null
  );

  const handleSelectedCheckBox = (event, taskId) => {
    const isChecked = event.target.checked;
    setSelectedTasks((currTask) =>
      isChecked
        ? [...currTask, taskId]
        : selectedTasks.filter((id) => id !== taskId)
    );
  };

  const handleContentDelete = async (taskId: string | number) => {
    await deleteTask(taskId);
    setMenuAnchor(null);
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null); // Store the task to edit

  const handleContentEdit = (task: Task) => {
    setSelectedTask(task);
    setShowEditModal(true);
    setMenuAnchor(null);
  };

  const handleStatusChange = async (newStatus: string) => {
    const validTransitions = {
      Pending: new Set(["In Progress"]),
      "In Progress": new Set(["Pending", "Completed"]),
      Completed: new Set(["Pending"]),
    };

    if (validTransitions[selectedStatus]?.has(newStatus)) {
      if (!task?.id) {
        console.error("Task ID is missing");
        return;
      }
      const updatePayload = { status: newStatus };
      try {
        await updateTask({ id: task.id, updatedData: updatePayload });
        setSelectedStatus(newStatus);
      } catch (error) {
        console.error("Update failed:", error);
      }
    } else {
      alert("Cannot Perform Wrong Operation !!!");
    }
    setStatusMenuAnchor(null);
  };

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id.toString(),
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : "none",
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      <div className="flex items-center justify-center gap-4 w-full">
        <Checkbox
          checked={selectedTasks.includes(task.id)}
          onChange={(e) => handleSelectedCheckBox(e, task.id)}
          onPointerDown={(e) => e.stopPropagation()}
          color="primary"
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 w-full text-gray-800 items-center">
          <Typography
            className={`font-medium text-lg text-center ${
              selectedStatus === "Completed" ? "line-through text-gray-500" : ""
            }`}
          >
            {task.name}
          </Typography>
          <Typography className="text-gray-600 text-center">
            {task.dueDate}
          </Typography>
          <Button
            variant="outlined"
            className="w-full md:w-24 rounded-lg bg-gray-400 text-white font-semibold text-xs justify-self-center"
            sx={{
              backgroundColor: "gray",
              color: "white",
              border: "none",
              "&:hover": { backgroundColor: "darkgray" },
              width: "40%",
            }}
            onClick={(e) => setStatusMenuAnchor(e.currentTarget)}
            onPointerDown={(e) => e.stopPropagation()}
          >
            {selectedStatus}
          </Button>
          <Typography className="text-sm md:text-base text-left md:text-center break-words justify-self-center">
            {task.category}
          </Typography>
        </div>
      </div>
      <IconButton
        className="text-gray-600 hover:bg-gray-200 rounded-full self-start md:self-center"
        onClick={(e) => setMenuAnchor(e.currentTarget)}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <MoreVert />
      </IconButton>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        onPointerDown={(e) => e.stopPropagation()}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          onClick={() => handleContentEdit(task)}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <Edit
            fontSize="small"
            className="mr-2"
            sx={{ color: "blueviolet" }}
          />{" "}
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => handleContentDelete(task.id)}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <Delete fontSize="small" className="mr-2" sx={{ color: "red" }} />{" "}
          Delete
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={statusMenuAnchor}
        open={Boolean(statusMenuAnchor)}
        onClose={() => setStatusMenuAnchor(null)}
        onPointerDown={(e) => e.stopPropagation()}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        transformOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MenuItem
          onClick={() => handleStatusChange("Pending")}
          onPointerDown={(e) => e.stopPropagation()}
        >
          Pending
        </MenuItem>
        <MenuItem
          onClick={() => handleStatusChange("In Progress")}
          onPointerDown={(e) => e.stopPropagation()}
        >
          In Progress
        </MenuItem>
        <MenuItem
          onClick={() => handleStatusChange("Completed")}
          onPointerDown={(e) => e.stopPropagation()}
        >
          Completed
        </MenuItem>
      </Menu>

      <TaskUpdateModal
        taskToUpdate={selectedTask}
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
      />
    </div>
  );
};

export default RenderFilterCard;
