import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  taskList: {
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
  name: "task",
  initialState: initialState,
  reducers: {
    addTask: (state, action) => {
      state.taskList.data.unshift(action.payload);
    },
    updateTask: (state, action) => {
      const { id, values } = action.payload;
      const index = state.taskList.data.findIndex((item) => item.id === id);
      state.taskList.data.splice(index, 1, { id, ...values });
    },
    deleteTask: (state, action) => {
      const { id } = action.payload;
      state.taskList.data = state.taskList.data.filter(
        (item) => item.id !== id
      );
    },
  },
});

export const { addTask, updateTask, deleteTask } = jobSlice.actions;

export default jobSlice.reducer;
