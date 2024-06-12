import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user/userSlice';

export const store = configureStore({
  reducer: {
    userStatus: userReducer,
  }
});

export default store;