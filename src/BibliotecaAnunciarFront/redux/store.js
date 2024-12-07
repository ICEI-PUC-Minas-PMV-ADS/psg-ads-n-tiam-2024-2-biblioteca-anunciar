import { configureStore } from '@reduxjs/toolkit';
import favoriteBooksReducer from './favoriteBooksSlice';

export const store = configureStore({
    reducer: {
        favoriteBooks: favoriteBooksReducer,
    },
});
