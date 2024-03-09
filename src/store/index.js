import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./UserSlice";

const store = configureStore({
  reducer: {
    user: rootReducer,
  },
});

export default store;
