import { createSlice } from "@reduxjs/toolkit";
import { logEvents } from "./activityLog";

export const taskSlice = createSlice({
  name: "taskList",
  initialState: {
    tasksList: [
      {
        id: "1",
        name: "Grocery Shopping",
        description: "",
        dueDate: "2024-03-15",
        status: "Pending",
        category: "Work",
        image: "",
      },
      {
        id: "2",
        name: "Work Report",
        description: "",
        dueDate: "2024-03-18",
        status: "In Progress",
        category: "Work",
        image: "",
      },
      {
        id: "3",
        name: "Pay Bills",
        description: "",
        dueDate: "2024-03-20",
        status: "Pending",
        category: "Personal",
        image: "",
      },
      {
        id: "4",
        name: "Book Tickets",
        description: "",
        dueDate: "2024-03-22",
        status: "Completed",
        category: "Personal",
        image: "",
      },
      {
        id: "5",
        name: "Meeting with Team",
        description: "",
        dueDate: "2024-03-25",
        status: "In Progress",
        category: "Work",
        image: "",
      },
    ],
  },
  reducers: {
    addTask(state, action) {
      state.tasksList.push(action.payload);
    },

    updateTask(state, action) {
      const taskToUpdate = action.payload;
      state.tasksList = state.tasksList.map((task) =>
        task.id === action.payload.id ? taskToUpdate : task
      );
    },

    deleteTask(state, action) {
      state.tasksList = state.tasksList.filter(
        (task) => task.id !== action.payload
      );
    },
    updateTaskStatus: (state, action) => {
      const { id, newStatus } = action.payload;
      const task = state.tasksList.find((task) => task.id === id);
      if (task) {
        task.status = newStatus;
      }
    },
    reorderTasks: (state, action) => {
      const { status, tasks } = action.payload;

      const updatedTasksList = state.tasksList.map((task) => {
        if (task.status === status) {
          const reorderedTask = tasks.find(
            (t) => String(t.id) === String(task.id)
          );
          return reorderedTask || task; // Return task if not found (important!)
        }
        return task;
      });

      state.tasksList = updatedTasksList;
    },
  },
});

// Middleware
export const trackTaskActionsMiddleware = (storeAPI) => (next) => (action) => {
  const result = next(action);

  const state = storeAPI.getState();
  const tasksList = state.tasks.tasksList;

  if (action.type.includes("taskList/")) {
    let message = "";

    switch (action.type) {
      case "taskList/addTask":
        message = `Added new task: "${action.payload.name}"`;
        break;
      case "taskList/updateTask":
        message = `Updated task "${action.payload.name}" - Status To: ${action.payload.status}`;
        break;
      case "taskList/deleteTask": {
        const deletedTask = tasksList.find(
          (task) => task.id === action.payload
        );
        message = deletedTask
          ? `Deleted task: "${deletedTask.name}"`
          : `Deleted task with ID: ${action.payload}`;
        break;
      }
      case "taskList/updateTaskStatus":
        message = `Updated status of task ID: ${action.payload.id} to "${action.payload.newStatus}"`;
        break;
      default:
        message = "Performed a task action";
    }

    storeAPI.dispatch(logEvents(message));
  }
  return result;
};

export const {
  addTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  reorderTasks,
} = taskSlice.actions;
export const tasksReducer = taskSlice.reducer;
