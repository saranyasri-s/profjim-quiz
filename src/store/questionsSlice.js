import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const questionsSlice = createSlice({
  name: "Questions",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      return action.payload;
    },
    clearQuestions: (state) => {
      return {};
    },
  },
});

export const { setQuestions, clearQuestions } = questionsSlice.actions;

export default questionsSlice.reducer;
