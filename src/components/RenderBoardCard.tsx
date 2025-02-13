import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Delete, Edit, MoreHoriz } from "@mui/icons-material";
import { useDraggable } from "@dnd-kit/core";
import { Task } from "./RenderFilterCard";
import TaskUpdateModal from "./TaskUpdateModal.tsx";
import { useDeleteTaskMutation } from "../store/query/tasksApi.js";

const RenderBoardCard = ({ task }) => {
  const [deleteTask] = useDeleteTaskMutation();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id.toString(),
  });

  const [menuAnchor, setMenuAnchor] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleContentEdit = (task: Task) => {
    setSelectedTask(task);
    setShowEditModal(true);
    setMenuAnchor(null);
  };

  const handleDotsPress = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };

  const handleContentDelete = async (taskId: string | number) => {
    await deleteTask(taskId);
    handleCloseMenu();
  };

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : "none",
    position: "relative",
  };

  return (
    <Card
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="shadow-md border rounded-2xl mb-3 p-4"
    >
      <IconButton
        className="text-gray-600 hover:bg-gray-100 rounded-full"
        sx={{
          position: "absolute",
          top: "8px",
          right: "8px",
        }}
        onClick={handleDotsPress}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <MoreHoriz />
      </IconButton>
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        onPointerDown={(e) => e.stopPropagation()}
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
      
      <TaskUpdateModal
        taskToUpdate={selectedTask}
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
      />

      <CardContent>
        <Typography
          variant="h6"
          className={`font-semibold ${
            task.status === "Completed" ? "line-through" : ""
          }`}
        >
          {task.name}
        </Typography>
        <div className="flex justify-between items-end mt-4">
          <Typography variant="body2" className="text-gray-600">
            {task.category}
          </Typography>
          <Typography variant="caption" className="text-gray-500">
            {task.dueDate === "Today"
              ? "Today"
              : new Date(task.dueDate).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default RenderBoardCard;
