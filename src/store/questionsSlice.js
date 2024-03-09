import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const questionsSlice = createSlice({
  name: "Questions",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      return action.payload;
    },
  },
});

export const { setQuestions } = questionsSlice.actions;

export default questionsSlice.reducer;
