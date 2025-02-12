import { createSlice, nanoid } from "@reduxjs/toolkit";

const acticitySlice = createSlice({
  name: "activity",
  initialState: {
    logs: [],
  },
  reducers: {
    logEvents(state, action) {
      state.logs.push({
        id: nanoid(),
        message: action.payload,
        timeStamp: new Date().toISOString(),
      });
    },
  },
});

export const { logEvents } = acticitySlice.actions;
export const activityReducer = acticitySlice.reducer;
