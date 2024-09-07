import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
};

export const appSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },

    appLogout: (state) => {
      state.theme = "light";
    },
  },
});

export const { toggleTheme, appLogout } = appSlice.actions;
