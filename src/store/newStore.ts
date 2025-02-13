import { configureStore } from "@reduxjs/toolkit";
import { firebaseApi } from "./query/tasksApi";
import { activityApi } from "./query/activityApi";

export const store = configureStore({
  reducer: {
    [firebaseApi.reducerPath]: firebaseApi.reducer,
    [activityApi.reducerPath]: activityApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(firebaseApi.middleware)
      .concat(activityApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
