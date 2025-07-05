import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "./favoriteSlice";

const store = configureStore({
  reducer: {
    // The key here, `favorites`, will be the name of this piece of state in your global state object.
    // e.g., state.favorites
    favorites: favoriteReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself for type safety
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
