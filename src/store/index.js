import { configureStore } from "@reduxjs/toolkit";
import {
  tasksReducer,
  addTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  reorderTasks,
  trackTaskActionsMiddleware,
} from "./slices/tasksSlice";
import { activityReducer } from "./slices/activityLog";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    activities: activityReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(trackTaskActionsMiddleware)
});
export { addTask, updateTask, deleteTask, updateTaskStatus, reorderTasks };
