import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './booksSlice'; 

const store = configureStore({
  reducer: {
    books: booksReducer // Adiciona o reducer de livros
  }
});

export default store;
