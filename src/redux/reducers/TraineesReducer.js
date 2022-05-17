// Reducer that changes the state based on the action

import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const slice = createSlice({
  name: "trainee",
  initialState: {
    isLoading: false,
    data: [],
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
  },
});

export const {
  startFetching,
  setSuccess,
  setError,
  setData,
} = slice.actions;

export const useData = () => useSelector((state) => state.Trainees.data);
export const useIsLoading = () => useSelector((state) => state.Trainees.isLoading);
export const useSuccess = () => useSelector((state) => state.Trainees.success);
export const useError = () => useSelector((state) => state.Trainees.error);

export default slice.reducer;
