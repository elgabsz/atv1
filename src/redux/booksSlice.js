import { createSlice } from '@reduxjs/toolkit';

// Estado inicial: uma lista vazia de livros
const initialState = [];

const booksSlice = createSlice({
  name: 'books', // Nome do slice
  initialState,
  reducers: {
    // Action para adicionar um livro
    addBook: (state, action) => {
      state.push(action.payload); // Adiciona o livro
    },
    // Action para remover um livro
    removeBook: (state, action) => {
      return state.filter(book => book.id !== action.payload); // Remove o livro
    }
  }
});

// Exportando as actions
export const { addBook, removeBook } = booksSlice.actions;

// Exportando o reducer para o store
export default booksSlice.reducer;
