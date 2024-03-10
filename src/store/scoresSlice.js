import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  easy: { score: 0, qns: 0 },
  medium: { score: 0, qns: 0 },
  hard: { score: 0, qns: 0 },
};

const scoresSlice = createSlice({
  name: "scores",
  initialState,
  reducers: {
    setScores: (state, action) => {
      const { level, score, qns } = action.payload;

      if (state.hasOwnProperty(level)) {
        return {
          ...state,
          [level]: {
            ...state[level],
            score: score,
            qns: qns,
          },
        };
      }

      return state; // Return the state unchanged if the provided level is invalid
    },
  },
});

export const { setScores } = scoresSlice.actions;

export default scoresSlice.reducer;
