import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { database, ref, onValue, push, set } from "../../firebaseConfig.ts";

export const activityApi = createApi({
  reducerPath: "activityApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["ActivityLogs"],

  endpoints: (builder) => ({
    logActivity: builder.mutation({
      async queryFn(logEntry) {
        try {
          const logRef = push(ref(database, "activityLogs/"));
          await set(logRef, {
            id: logRef.key,
            message: logEntry.message,
            timeStamp: new Date().toISOString(),
          });

          return { data: logEntry };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["ActivityLogs"],
    }),

    getActivityLogs: builder.query({
      async queryFn() {
        try {
          return new Promise((resolve) => {
            const logsRef = ref(database, "activityLogs/");
            onValue(logsRef, (snapshot) => {
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
      providesTags: ["ActivityLogs"],
    }),
  }),
});

export const { useLogActivityMutation, useGetActivityLogsQuery } = activityApi;
