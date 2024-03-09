import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const finalFeedbackSlice = createSlice({
  name: "finalFeedback",
  initialState,
  reducers: {
    setFinalFeedback: (state, action) => {
      return {...action.payload};
    },
  },
});

export const { setFinalFeedback } = finalFeedbackSlice.actions;

export default finalFeedbackSlice.reducer;
