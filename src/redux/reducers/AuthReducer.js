// Reducer that changes the state based on the action

import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    authToken: null,
    user: null,
    isSupervisor: null,
    error: null,
    success: false
  },
  reducers: {
    startLogin: (state, action) => {
      state.isLoading = true;
      state.success = false
      state.error = null
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
      state.isLoading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
      state.isLoading = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isSupervisor = action.payload?.is_supervisor;
    },
    setUserIsSupervisor: (state, action) => {
      state.isSupervisor = action.payload;
    },
    logoutUser: (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.authToken = null;
      state.error = null;
      state.success = false;
      state.isSupervisor = null;
    },
  },
});

export const {
  startLogin,
  setSuccess,
  setError,
  setAuthToken,
  setUser,
  setUserIsSupervisor,
  logoutUser
} = authSlice.actions;

export const useAuhToken = () => useSelector((state) => state.Auth.authToken);
export const useUser = () => useSelector((state) => state.Auth.user);
export const useIsSupervisor = () => useSelector((state) => state.Auth.isSupervisor);
export const useIsLoading = () => useSelector((state) => state.Auth.isLoading);
export const useSuccess = () => useSelector((state) => state.Auth.success);
export const useError = () => useSelector((state) => state.Auth.error);

export default authSlice.reducer;
