import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./redux/slicers/job.slice";
export const store = configureStore({
  reducer: {
    task: taskReducer,
  },
});
