import { createSlice } from "@reduxjs/toolkit";

const initialState = "maths";

const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {
    setSubject: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSubject } = subjectSlice.actions;

export default subjectSlice.reducer;
