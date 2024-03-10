import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./UserSlice";
import subjectReducer from "./subjectSlice";
import questionsReducer from "./questionsSlice";

import scoresReducer from "./scoresSlice";
const store = configureStore({
  reducer: {
    user: rootReducer,
    subject: subjectReducer,
    questions: questionsReducer,
 
    scores:scoresReducer
  },
});

export default store;
