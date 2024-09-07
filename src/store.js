import { configureStore } from "@reduxjs/toolkit";
import { appSlice, authSlice } from "./features";

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    auth: authSlice.reducer,
  },
  devTools: import.meta.env.VITE_NODE_ENV !== "production",
});
