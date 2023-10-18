import { createSlice } from "@reduxjs/toolkit";

const inputSlice = createSlice({
  name: "input",
  initialState: "",
  reducers: {
    setInputValue: (state, action) => {
      return action.payload;
    },
  },
});

export const { setInputValue } = inputSlice.actions;
export default inputSlice.reducer;
