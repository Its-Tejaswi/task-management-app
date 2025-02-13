import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import TaskList from "../../screens/TaskList.tsx";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, TextField, MenuItem, Box } from "@mui/material";
import { Add, Cancel } from "@mui/icons-material";
import { useDroppable } from "@dnd-kit/core";
import { useAddTaskMutation } from "../../store/query/tasksApi.js";

const ToDoListCard = ({ id, tasks }) => {
  const { setNodeRef } = useDroppable({ id });
  const [addTask] = useAddTaskMutation();
  const [open, setOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskStatus, setTaskStatus] = useState("Pending");
  const [taskCategory, setTaskCategory] = useState("");

  const handleToggleForm = () => setOpen(!open);

  const handleAddTask = async () => {
    if (!taskTitle || !taskDueDate || !taskStatus || !taskCategory) {
      // Show some toast
      alert("Please enter data");
      return;
    }
    await addTask({
      name: taskTitle,
      dueDate: taskDueDate,
      status: taskStatus,
      category: taskCategory,
    });
    setOpen(false);
    setTaskTitle("");
    setTaskDueDate("");
    setTaskStatus("Pending");
    setTaskCategory("");
  };

  return (
    <>
      <Accordion
        defaultExpanded
        className="bg-white shadow-lg rounded-2xl border border-gray-300 overflow-hidden w-full"
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="text-gray-600" />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            backgroundColor: "#FAC3FF",
            transition: "all 0.2s",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
            paddingX: "16px",
            paddingY: "12px",
          }}
        >
          <Typography component="span" className="text-lg font-xl">
            TODO <span className="text-gray-700">({tasks?.length})</span>
          </Typography>
        </AccordionSummary>

        <div className="flex flex-col items-start pl-10 pt-3 pb-3 bg-gray-300">
          <Button
            variant="contained"
            startIcon={!open ? <Add /> : <Cancel />}
            onClick={handleToggleForm}
            sx={{
              backgroundColor: "purple",
              color: "white",
              px: 3,
              py: 1.5,
              borderRadius: "12px",
              boxShadow: 2,
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.05)",
                backgroundColor: "purple700",
              },
            }}
          >
            {open ? "Cancel" : "Add New Task"}
          </Button>

          {open && (
            <Box
              className="w-[90%] md:w-[80%] bg-gray-200 p-3 md:p-5 rounded-xl mt-4 mx-auto"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                boxShadow: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "center",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <TextField
                  label="Task Title"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  margin="dense"
                  fullWidth 
                  sx={{
                    flex: { xs: 1, md: 1 },
                    borderRadius: "10px",
                  }}
                />
                <TextField
                  type="date"
                  label="Due Date"
                  InputLabelProps={{ shrink: true }}
                  value={taskDueDate}
                  onChange={(e) => setTaskDueDate(e.target.value)}
                  margin="dense"
                  fullWidth
                  sx={{
                    flex: { xs: 1, md: 1 },
                    borderRadius: "10px",
                  }}
                />
                <TextField
                  select
                  label="Status"
                  value={taskStatus}
                  onChange={(e) => setTaskStatus(e.target.value)}
                  margin="dense"
                  fullWidth
                  sx={{
                    flex: { xs: 1, md: 1 },
                    borderRadius: "10px",
                  }}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </TextField>
                <TextField
                  select
                  label="Category"
                  value={taskCategory}
                  onChange={(e) => setTaskCategory(e.target.value)}
                  margin="dense"
                  fullWidth
                  sx={{
                    flex: { xs: 1, md: 1 },
                    borderRadius: "10px",
                  }}
                >
                  <MenuItem value="Work">Work</MenuItem>
                  <MenuItem value="Personal">Personal</MenuItem>
                </TextField>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                  mt: 2,
                }}
              >
                <Button
                  onClick={handleAddTask}
                  color="primary"
                  variant="contained"
                  sx={{
                    backgroundColor: "purple",
                    "&:hover": { backgroundColor: "purple.700" },
                    textTransform: "none",
                    px: 3,
                    py: 1.5,
                    borderRadius: "12px",
                    boxShadow: 2,
                  }}
                >
                  Add Task
                </Button>
              </Box>
            </Box>
          )}
        </div>

        <AccordionDetails className="bg-gray-200 p-4">
          <TaskList nodeRef={setNodeRef} tasks={tasks} />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default ToDoListCard;
