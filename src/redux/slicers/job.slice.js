import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  jobList: {
    data: [
      {
        id: uuidv4(),
        title: "Chuyên viên phần mềm",
        content: "Công việc phù hợp cho những người thích học hỏi",
      },
      {
        id: uuidv4(),
        title: "Nhà đầu tư ngân hàng",
        content:
          "Công việc phù hợp cho những người cần kiếm càng nhiều tiền nhanh càng tốt",
      },
      {
        id: uuidv4(),
        title: "Kiến trúc sư",
        content: "Công việc phù hợp cho những người có tính cách rắn rỏi",
      },
    ],
  },
};

export const jobSlice = createSlice({
  name: "job",
  initialState: initialState,
  reducers: {
    addJob: (state, action) => {
      state.jobList.data.unshift(action.payload);
    },
    updateJob: (state, action) => {
      const { id, values } = action.payload;
      const index = state.jobList.data.findIndex((item) => item.id === id);
      state.jobList.data.splice(index, 1, { id, ...values });
    },
  },
});

export const { addJob, updateJob } = jobSlice.actions;

export default jobSlice.reducer;
