import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./UserSlice";
import subjectReducer from "./subjectSlice";
import questionsReducer from "./questionsSlice";
import answerReducer from "./answerSlice";
import answersAllReducer from "./answersForAllQns";
const store = configureStore({
  reducer: {
    user: rootReducer,
    subject: subjectReducer,
    questions: questionsReducer,
    answerFeedback: answerReducer,
    answerForAllQns: answersAllReducer,
  },
});

export default store;
