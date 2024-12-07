import { createSlice } from '@reduxjs/toolkit';

export const favoriteBooksSlice = createSlice({
    name: 'favoriteBooks',
    initialState: [],
    reducers: {
        addFavoriteBook: (state, action) => {
            state.push(action.payload);
        },
        removeFavoriteBook: (state, action) => {
            return state.filter(book => book.livroId !== action.payload);
        },
    },
});

export const { addFavoriteBook, removeFavoriteBook } = favoriteBooksSlice.actions;
export default favoriteBooksSlice.reducer;
