// Reducer that changes the state based on the action

import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const slice = createSlice({
  name: "experienceLog",
  initialState: {
    isLoading: false,
    formData: {
      expTypes: [],
      setting: [],
      supervisors: [],
      obsevations: [],
      methods: [],
      contacts: [],
      tasks: []
    },
    selectedDate: new Date(),
    logs: [],
    flagged: [],
    pastFlagged: [],
    csvData: '',
    success: false,
    errors: null
  },
  reducers: {
    startFetching: (state, action) => {
      state.isLoading = true;
      state.errors = null
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
      state.isLoading = false;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
      state.isLoading = false;
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
      state.isLoading = false;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setLogs: (state, action) => {
      state.logs = action.payload;
      state.isLoading = false;
    },
    setFlagged: (state, action) => {
      state.flagged = action.payload;
      state.isLoading = false;
    },
    setPastFlagged: (state, action) => {
      state.pastFlagged = action.payload;
      state.isLoading = false;
    },
    setCsvData: (state, action) => {
      state.csvData = action.payload;
      state.isLoading = false;
    },

  },
});

export const {
  startFetching,
  setSuccess,
  setErrors,
  setFormData,
  setSelectedDate,
  setLogs,
  setFlagged,
  setPastFlagged,
  setCsvData
} = slice.actions;

export const useFormData = () => useSelector((state) => state.ExpLog.formData);
export const useSelectedDate = () => useSelector((state) => state.ExpLog.selectedDate);
export const useLogs = () => useSelector((state) => state.ExpLog.logs);
export const useFlagged = () => useSelector((state) => state.ExpLog.flagged);
export const usePastFlagged = () => useSelector((state) => state.ExpLog.pastFlagged);
export const useCsvData = () => useSelector((state) => state.ExpLog.csvData);
export const useIsLoading = () => useSelector((state) => state.ExpLog.isLoading);
export const useSuccess = () => useSelector((state) => state.ExpLog.success);
export const useErrors = () => useSelector((state) => state.ExpLog.errors);

export default slice.reducer;
