import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoritesState {
  favorites: string[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (item) => item !== action.payload
      );
    },
    clearFavorites: (state) => {
      state.favorites = [];
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
