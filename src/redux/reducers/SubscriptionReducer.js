// Reducer that changes the state based on the action

import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const slice = createSlice({
  name: "subscription",
  initialState: {
    isLoading: false,
    data: [],
    userSubscription: null,
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
    setUserSubscription: (state, action) => {
      state.userSubscription = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  startFetching,
  setSuccess,
  setError,
  setData,
  setUserSubscription
} = slice.actions;

export const useData = () => useSelector((state) => state.Subscription.data);
export const useUserSubscription = () => useSelector((state) => state.Subscription.userSubscription);
export const useIsLoading = () => useSelector((state) => state.Subscription.isLoading);
export const useSuccess = () => useSelector((state) => state.Subscription.success);
export const useError = () => useSelector((state) => state.Subscription.error);

export default slice.reducer;
