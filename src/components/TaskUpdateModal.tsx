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
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Task } from "./RenderFilterCard";
import { useUpdateTaskMutation } from "../store/query/tasksApi";

const TaskUpdateModal: React.FC<{
  open: boolean;
  onClose: () => void;
  taskToUpdate: Task | null;
}> = ({ open, onClose, taskToUpdate }) => {
  const [updateTask] = useUpdateTaskMutation();
  const [newUpdateTask, setNewUpdateTask] = useState<Task | null>(null);

  useEffect(() => {
    if (taskToUpdate) {
      setNewUpdateTask({ ...taskToUpdate });
    }
  }, [taskToUpdate]);

  if (!newUpdateTask) return null;

  const handleChange = (field: keyof Task, value: string) => {
    setNewUpdateTask((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleSubmit = async () => {
    if (newUpdateTask) {
      const updatedData = newUpdateTask;
      await updateTask({ id: updatedData.id, updatedData });
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
          width: { xs: "90%", sm: 500 },
          bgcolor: "white",
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          {" "}
          Edit Task
        </Typography>

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
          sx={{ mb: 2 }}
        />

        <Box
          sx={{
            display: "flex",
            gap: 2,
            my: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Button
            variant={
              newUpdateTask?.category === "Work" ? "contained" : "outlined"
            }
            onClick={() => handleChange("category", "Work")}
            onPointerDown={(e) => e.stopPropagation()}
            sx={{ flex: 1 }}
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
            sx={{ flex: 1 }}
          >
            Personal
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <TextField
            type="date"
            name="dueDate"
            value={newUpdateTask?.dueDate}
            onChange={(e) => handleChange("dueDate", e.target.value)}
            onPointerDown={(e) => e.stopPropagation()}
            sx={{ flex: 1, width: { xs: "100%", sm: "auto" } }}
          />
          <Select
            name="status"
            value={newUpdateTask?.status}
            onChange={(e) => handleChange("status", e.target.value)}
            onPointerDown={(e) => e.stopPropagation()}
            sx={{ flex: 1, width: { xs: "100%", sm: "auto" } }}
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
              sx={{ objectFit: "cover" }}
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

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 3,
            flexDirection: { xs: "column-reverse", sm: "row" },
            gap: 2,
          }}
        >
          {" "}
          <Button
            variant="outlined"
            onClick={onClose}
            onPointerDown={(e) => e.stopPropagation()}
            sx={{ width: "100%", sm: "auto" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            onPointerDown={(e) => e.stopPropagation()}
            sx={{ width: "100%", sm: "auto" }}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TaskUpdateModal;
