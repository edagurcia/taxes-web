import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  session: null,
  status: "pending",
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onLogout: (state) => {
      state.user = null;
      state.session = null;
      state.status = "not-authenticated";
      state.isLoading = false;
      state.error = null;
    },
    onLogin: (state, { payload }) => {
      state.user = payload.user;
      state.session = payload.session;
      state.status = "authenticated";
      state.error = null;
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { onLogout, onLogin, setIsLoading, setError } = authSlice.actions;
