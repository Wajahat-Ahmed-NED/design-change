// Reducer that changes the state based on the action

import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const slice = createSlice({
  name: "monthlyDoc",
  initialState: {
    isLoading: false,
    accruedData: {},
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
    setAccruedData: (state, action) => {
      state.accruedData = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  startFetching,
  setSuccess,
  setError,
  setAccruedData,
} = slice.actions;

export const useAccruedData = () => useSelector((state) => state.MonthlyDoc.accruedData);
export const useIsLoading = () => useSelector((state) => state.MonthlyDoc.isLoading);
export const useSuccess = () => useSelector((state) => state.MonthlyDoc.success);
export const useError = () => useSelector((state) => state.MonthlyDoc.error);

export default slice.reducer;
