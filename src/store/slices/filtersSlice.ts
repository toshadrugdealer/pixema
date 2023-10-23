import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    text: "movie",
    years: "",
  },
  reducers: {
    saveFilters: (state, action) => {
      state.text = action.payload.text;
      state.years = action.payload.years;
    },
  },
});

export const { saveFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
