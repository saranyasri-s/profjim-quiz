import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const answersForAllQnsSlice = createSlice({
  name: "answersForAllQns",
  initialState,
  reducers: {
    setAllQuestions: (state, action) => {
      return state.concat(action.payload);
    },
  },
});

export const { setAllQuestions } = answersForAllQnsSlice.actions;

export default answersForAllQnsSlice.reducer;
