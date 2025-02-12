import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  IconButton,
  Card,
  CardMedia,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Task } from "./RenderFilterCard";
import { useDispatch } from "react-redux";
import { updateTask } from "../store";

const TaskUpdateModal: React.FC<{
  open: boolean;
  onClose: () => void;
  taskToUpdate: Task | null;
}> = ({ open, onClose, taskToUpdate }) => {
  const dispatch = useDispatch();
  const [newUpdateTask, setNewUpdateTask] = useState<Task | null>(null);

  useEffect(() => {
    if (taskToUpdate) {
      setNewUpdateTask({ ...taskToUpdate });
    }
  }, [taskToUpdate]);

  if (!newUpdateTask) return null; // Prevent errors if updateTask is null

  const handleChange = (field: keyof Task, value: string) => {
    setNewUpdateTask((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleSubmit = () => {
    if (newUpdateTask) {
      dispatch(updateTask(newUpdateTask));
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "white",
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
        }}
      >
        <TextField
          fullWidth
          label="Task Name"
          name="name"
          value={newUpdateTask?.name}
          onChange={(e) => handleChange("name", e.target.value)}
          onPointerDown={(e) => e.stopPropagation()}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          multiline
          rows={2}
          label="Task Description"
          name="description"
          value={newUpdateTask?.description}
          onChange={(e) => handleChange("description", e.target.value)}
          onPointerDown={(e) => e.stopPropagation()}
        />

        <Box sx={{ display: "flex", gap: 2, my: 2 }}>
          <Button
            variant={
              newUpdateTask?.category === "Work" ? "contained" : "outlined"
            }
            onClick={() => handleChange("category", "Work")}
            onPointerDown={(e) => e.stopPropagation()}
          >
            Work
          </Button>
          <Button
            variant={
              newUpdateTask?.category === "Personal" ? "contained" : "outlined"
            }
            onClick={() => handleChange("category", "Personal")}
            onPointerDown={(e) => e.stopPropagation()}
            color="secondary"
          >
            Personal
          </Button>
        </Box>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <TextField
            type="date"
            name="dueDate"
            value={newUpdateTask?.dueDate}
            onChange={(e) => handleChange("dueDate", e.target.value)}
            onPointerDown={(e) => e.stopPropagation()}
            sx={{ flex: 1 }}
          />
          <Select
            name="status"
            value={newUpdateTask?.status}
            onChange={(e) => handleChange("status", e.target.value)}
            onPointerDown={(e) => e.stopPropagation()}
            sx={{ flex: 1 }}
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </Box>

        {newUpdateTask?.image && (
          <Card sx={{ position: "relative", width: "100%", mt: 2 }}>
            <CardMedia
              component="img"
              image={newUpdateTask.image}
              alt="Uploaded Preview"
            />
            <IconButton
              sx={{
                position: "absolute",
                top: 5,
                right: 5,
                backgroundColor: "white",
              }}
              size="small"
              onClick={() => handleChange("image", "")}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Card>
        )}

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button
            variant="outlined"
            onClick={onClose}
            onPointerDown={(e) => e.stopPropagation()}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            onPointerDown={(e) => e.stopPropagation()}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TaskUpdateModal;
