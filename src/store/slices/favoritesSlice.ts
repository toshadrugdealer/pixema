import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type FavoriteFilm = {
  imdbID: string;
  Title: string;
  Poster: string;
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [] as FavoriteFilm[],
  reducers: {
    addToFavorites: (state, action: PayloadAction<FavoriteFilm>) => {
      state.push(action.payload);
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      return state.filter((film) => film.imdbID !== action.payload);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
