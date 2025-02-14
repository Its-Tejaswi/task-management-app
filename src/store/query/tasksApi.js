import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  database,
  ref,
  onValue,
  set,
  push,
  update,
  remove,
} from "../../firebaseConfig.ts";
import { activityApi } from "./activityApi";

export const firebaseApi = createApi({
  reducerPath: "firebaseApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Tasks"],

  endpoints: (builder) => ({
    getTasks: builder.query({
      async queryFn() {
        try {
          return new Promise((resolve) => {
            const taskRef = ref(database, "tasks/");
            onValue(taskRef, (snapshot) => {
              const data = snapshot.val();
              resolve({
                data: data
                  ? Object.entries(data).map(([id, value]) => ({
                      id,
                      ...value,
                    }))
                  : [],
              });
            });
          });
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Tasks"],
    }),

    addTask: builder.mutation({
      async queryFn(newTask) {
        try {
          const newTaskRef = push(ref(database, "tasks/"));
          await set(newTaskRef, newTask);
          return { data: { id: newTaskRef.key, ...newTask } };
        } catch (error) {
          return { error };
        }
      },
      onQueryStarted: async (newTask, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(
            activityApi.endpoints.logActivity.initiate({
              message: `Added new task: "${newTask.name}"`,
            })
          );
        } catch (error) {}
      },
      invalidatesTags: ["Tasks"],
    }),

    updateTask: builder.mutation({
      async queryFn({ id, updatedData }) {
        try {
          if (!id || typeof updatedData !== "object") {
            throw new Error("Invalid update payload");
          }

          await update(ref(database, `tasks/${id}`), updatedData);
          return { data: { id, ...updatedData } };
        } catch (error) {
          return { error: error.message || "An unknown error occurred" };
        }
      },
      onQueryStarted: async (
        { id, updatedData },
        { dispatch, queryFulfilled }
      ) => {
        try {
          await queryFulfilled;
          dispatch(
            activityApi.endpoints.logActivity.initiate({
              message: `Updated task "${
                updatedData.name
              }" - New Data: ${JSON.stringify(updatedData)}`,
            })
          );
        } catch (error) {}
      },
      invalidatesTags: ["Tasks"],
    }),

    updateTaskStatus: builder.mutation({
      async queryFn({ id, newStatus }) {
        try {
          if (!id) {
            throw new Error("Task ID is missing");
          }

          await update(ref(database, `tasks/${id}`), { status: newStatus });

          return { data: { id, newStatus } };
        } catch (error) {
          return { error: error.message || "An error occurred" };
        }
      },
      onQueryStarted: async (
        { id, newStatus },
        { dispatch, queryFulfilled }
      ) => {
        let patchResult;
        try {
          patchResult = dispatch(
            firebaseApi.util.updateQueryData("getTasks", undefined, (draft) => {
              const task = draft.find((t) => t.id === id);
              if (task) {
                task.status = newStatus;
              }
            })
          );

          await queryFulfilled;

          dispatch(
            activityApi.endpoints.logActivity.initiate({
              message: `Updated status of task ID: ${id} to "${newStatus}"`,
            })
          );
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Tasks"],
    }),

    deleteTask: builder.mutation({
      async queryFn(id) {
        try {
          await remove(ref(database, `tasks/${id}`));
          return { data: id };
        } catch (error) {
          return { error };
        }
      },
      onQueryStarted: async (id, { dispatch, queryFulfilled, getState }) => {
        try {
          await queryFulfilled;
          dispatch(
            activityApi.endpoints.logActivity.initiate({
              message: `Deleted task with ID: ${id}`,
            })
          );
        } catch (error) {}
      },
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useUpdateTaskStatusMutation,
  useDeleteTaskMutation,
} = firebaseApi;
