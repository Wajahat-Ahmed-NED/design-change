// Reducer that changes the state based on the action

import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const slice = createSlice({
  name: "profile",
  initialState: {
    isLoading: false,
    data: [],
    userProfile: { },
    success: false,
    error: null
  },
  reducers: {
    startFetching: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
      state.isLoading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setData: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  startFetching,
  setSuccess,
  setError,
  setData,
  setUserProfile
} = slice.actions;

export const useData = () => useSelector((state) => state.Profile.data);
export const useUserProfile = () => useSelector((state) => state.Profile.userProfile);
export const useIsLoading = () => useSelector((state) => state.Profile.isLoading);
export const useSuccess = () => useSelector((state) => state.Profile.success);
export const useError = () => useSelector((state) => state.Profile.error);

export default slice.reducer;
