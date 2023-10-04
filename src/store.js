import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./redux/slicers/job.slice";
export const store = configureStore({
  reducer: {
    job: jobReducer,
  },
});
