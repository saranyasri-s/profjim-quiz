import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./UserSlice";
import subjectReducer from "./subjectSlice";
import questionsReducer from "./questionsSlice";
const store = configureStore({
  reducer: {
    user: rootReducer,
    subject: subjectReducer,
    questions: questionsReducer,
  },
});

export default store;
