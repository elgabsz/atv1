import React from 'react';
import FormularioLivro from './FormularioLivro';
import ListaLivros from './ListaLivros';
import { useTheme } from '../ThemeContext'; 
import './BookManager.css'; 

const BookManager = () => {
  const { isDarkTheme, toggleTheme } = useTheme(); 

  return (
    <div className={`book-manager ${isDarkTheme ? 'dark' : 'light'}`}>
      <header className="header">
        <h1>Agenda de Livros</h1>
        <FormularioLivro />
        <button onClick={toggleTheme} className="theme-toggle-button">
          {isDarkTheme ? 'Tema Claro' : 'Tema Escuro'}
        </button>
      </header>
      <ListaLivros />
    </div>
  );
};

export default BookManager;
