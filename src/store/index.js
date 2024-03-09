import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./UserSlice";
import subjectReducer from "./subjectSlice";
const store = configureStore({
  reducer: {
    user: rootReducer,
    subject: subjectReducer,
  },
});

export default store;
