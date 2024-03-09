import { createSlice } from "@reduxjs/toolkit";

const initialState = { correctness: "", feedback: "" };

const answerSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {
    setAnswerFeedback: (state, action) => {
      return action.payload;
    },
    clearFeedback: (state) => {
      return { feedback: "", correctness: "" };
    },
  },
});

export const { setAnswerFeedback, clearFeedback } = answerSlice.actions;

export default answerSlice.reducer;
