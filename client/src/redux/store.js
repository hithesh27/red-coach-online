import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./alertsSlice";
import usersReducer from "./usersSlice";

const store = configureStore({
  reducer: {
    alert: alertReducer,
    user: usersReducer,
  },
});

export default store;
