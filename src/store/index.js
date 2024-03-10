import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./UserSlice";
import subjectReducer from "./subjectSlice";
import questionsReducer from "./questionsSlice";
import answerReducer from "./answerSlice";
import finalFeedbackReducer from "./finalFeedback";
import answersAllReducer from "./answersForAllQns";
import scoresReducer from "./scoresSlice";
const store = configureStore({
  reducer: {
    user: rootReducer,
    subject: subjectReducer,
    questions: questionsReducer,
    answerFeedback: answerReducer,
    answerForAllQns: answersAllReducer,
    finalFeedback: finalFeedbackReducer,
    scores:scoresReducer
  },
});

export default store;
