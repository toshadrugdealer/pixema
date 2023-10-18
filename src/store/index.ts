import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.ts";
import favoritesReducer from "./slices/favoritesSlice.ts";
import inputReducer from "./slices/inputSlice.ts";
// import dataReducer from "./dataSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    favorites: favoritesReducer,
    input: inputReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
