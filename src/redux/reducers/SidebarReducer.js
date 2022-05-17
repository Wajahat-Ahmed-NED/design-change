import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const slice = createSlice({
  name: "sidebar",
  initialState: {
    showSidebar: false,
  },
  reducers: {
    setShowSidebar: (state, action) => {
      state.showSidebar = action.payload;
    },
  },
});

export const {
  setShowSidebar,
} = slice.actions;

export const useShowSidebar = () => useSelector((state) => state.Sidebar.showSidebar);

export default slice.reducer;
