import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../../features/api/apiSlice";
import drawerReducer from "../../features/drawer/drawerSlice";
import themeReducer from "../../features/theme/themeSlice";
import authReducer from "../../features/auth/authSlice"; // <-- Import your authSlice

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    drawer: drawerReducer,
    theme: themeReducer,
    auth: authReducer, // <-- Add auth reducer here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
