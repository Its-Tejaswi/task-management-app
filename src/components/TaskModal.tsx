import React, { useRef, useState, useCallback, useMemo } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  MenuItem,
  Select,
  InputAdornment,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useDispatch } from "react-redux";
import { addTask } from "../store";
import { useAddTaskMutation } from "../store/query/tasksApi";

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ open, onClose }) => {
  const [task, setTask] = useState({
    name: "",
    description: "",
    dueDate: "",
    category: "Work",
    status: "",
    file: null as File | null,
  });

  const dispatch = useDispatch();

  // const [addTaskToFirebase] = useAddTaskMutation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Memoized preview image URL
  const previewImage = useMemo(
    () => (task.file ? URL.createObjectURL(task.file) : null),
    [task.file]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setTask((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleCategoryChange = useCallback((_, newCategory: string) => {
    if (newCategory) {
      setTask((prev) => ({ ...prev, category: newCategory }));
    }
  }, []);

  const handleStatusChange = useCallback(
    (e: React.ChangeEvent<{ value: unknown }>) => {
      setTask((prev) => ({ ...prev, status: e.target.value as string }));
    },
    []
  );

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.length) {
        setTask((prev) => ({ ...prev, file: event.target.files![0] }));
      }
    },
    []
  );

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const clearForm = useCallback(() => {
    setTask({
      name: "",
      description: "",
      dueDate: "",
      category: "Work",
      status: "",
      file: null,
    });
    onClose();
  }, [onClose]);

  const [addTask] = useAddTaskMutation();

  const handleNewTaskAdd = async () => {
    if (!task.name || !task.dueDate || !task.status || !task.category) {
      // Show toast
      alert("Enter Values in fields");
      return;
    }
    await addTask(task);
    clearForm();
  };

  // const handleCreateTask = useCallback(() => {
  //   if (!task.name || !task.date || !task.status || !task.category) {
  //     // Show toast
  //     alert("Enter Values in fields");
  //     return;
  //   }
  //   dispatch(
  //     addTask({
  //       id: crypto.randomUUID(),
  //       name: task.name,
  //       desciption: task.description,
  //       dueDate: task.date,
  //       status: task.status,
  //       category: task.category,
  //       image: previewImage,
  //     })
  //   );
  //   clearForm();
  // }, [dispatch, task, clearForm, previewImage]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        Add Task
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {/* Task Title */}
        <TextField
          label="Task Name"
          fullWidth
          margin="dense"
          variant="outlined"
          name="name"
          value={task.name}
          onChange={handleChange}
        />

        {/* Description with Formatting Icons */}
        <TextField
          label="Description"
          multiline
          rows={3}
          fullWidth
          margin="dense"
          variant="outlined"
          name="description"
          value={task.description}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small">
                  <FormatBoldIcon fontSize="small" />
                </IconButton>
                <IconButton size="small">
                  <FormatItalicIcon fontSize="small" />
                </IconButton>
                <IconButton size="small">
                  <FormatStrikethroughIcon fontSize="small" />
                </IconButton>
                <IconButton size="small">
                  <FormatListBulletedIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Task Category */}
        <Typography variant="subtitle2" mt={2}>
          Task Category*
        </Typography>
        <ToggleButtonGroup
          value={task.category}
          exclusive
          onChange={handleCategoryChange}
          sx={{ mt: 1 }}
        >
          <ToggleButton value="Work">Work</ToggleButton>
          <ToggleButton value="Personal">Personal</ToggleButton>
        </ToggleButtonGroup>

        {/* Due Date & Task Status */}
        <Box display="flex" gap={2} mt={2}>
          <TextField
            type="date"
            label="Due on*"
            fullWidth
            InputLabelProps={{ shrink: true }}
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
          />
          <Select
            value={task.status}
            onChange={handleStatusChange}
            displayEmpty
            fullWidth
          >
            <MenuItem value="" disabled>
              Choose Status
            </MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </Box>

        {/* File Upload */}
        <Typography variant="subtitle2" mt={3}>
          Attachment
        </Typography>
        <Box
          sx={{
            border: "1px dashed #aaa",
            borderRadius: 1,
            p: 2,
            mt: 1,
            textAlign: "center",
            cursor: "pointer",
            color: "#666",
          }}
          onClick={handleClick}
        >
          <CloudUploadIcon sx={{ fontSize: 24, mb: 1 }} />
          <Typography variant="body2">
            Drop your files here or{" "}
            <span style={{ color: "blue" }}>Upload</span>
          </Typography>
          <input
            type="file"
            hidden
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </Box>

        {/* Preview Uploaded File */}
        {task.file && (
          <Box mt={2}>
            <Typography variant="body2" color="success.main">
              Successfully uploaded: {task.file.name}
            </Typography>
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                style={{ width: "100%", marginTop: "8px", borderRadius: "4px" }}
              />
            )}
          </Box>
        )}
      </DialogContent>

      {/* Buttons */}
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ bgcolor: "#AF71C6" }}
          onClick={handleNewTaskAdd}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskModal;
