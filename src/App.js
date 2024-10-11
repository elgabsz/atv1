import React, { createContext, useContext, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import './App.css'; // Certifique-se de ter esse arquivo CSS para estilos

// Cabeçalho
const Header = () => {
  const members = [
    { name: 'Bhraian Ribeiro Marques', id: '23214290081 [1]' },
    { name: 'Cauã Cardoso Januário', id: '23214290120' },
    { name: 'Gabriel Bellumat da Silva', id: '23214290087' },
    { name: 'Gustavo Lacerda de Souza', id: '20214290018' },
    { name: 'Matheus Pereira de Araújo', id: '23214290074' },
  ];

  const integrantesComComponentes = [
    { name: 'Bhraian Ribeiro Marques', id: '23214290081', component: 'booksSlice [1]', function: 'Configuração do Redux para livros' },
    { name: 'Cauã Cardoso Januário', id: '23214290120', component: 'ThemeContext [2]', function: 'Contexto para tema' },
    { name: 'Gabriel Bellumat da Silva', id: '23214290087', component: 'FormularioLivro [3]', function: 'Componente para adicionar livros' },
    { name: 'Gustavo Lacerda de Souza', id: '20214290018', component: 'ListaLivros [4]', function: 'Componente para listar livros' },
    { name: 'Matheus Pereira de Araújo', id: '23214290074', component: 'BookManager [5]', function: 'Componente principal de gerenciamento de livros' },
  ];

  return (
    <header className="header">
      <h2>Membros e Gerenciamento de Livros</h2>
      <table className="members-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Matrícula </th>
            <th>Componente e Integrante</th>
            <th>Função</th>
          </tr>
        </thead>
        <tbody>
          {integrantesComComponentes.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.id}</td>
              <td>{member.component}</td>
              <td>{member.function}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </header>
  );
};


// Integrante 1. Configuração do Redux para livros

const booksSlice = createSlice({
  name: 'books',
  initialState: [],
  reducers: {
    addBook: (state, action) => {
      state.push(action.payload);
    },
    removeBook: (state, action) => {
      return state.filter(book => book.id !== action.payload);
    }
  }
});

const { addBook, removeBook } = booksSlice.actions;
const store = configureStore({
  reducer: {
    books: booksSlice.reducer
  }
});

// Integrante 2. Contexto para tema
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

// Integrante 3. Componente para adicionar livros
const FormularioLivro = () => {
  const [bookTitle, setBookTitle] = useState('');
  const dispatch = useDispatch();

  const handleAddBook = (e) => {
    e.preventDefault();
    if (bookTitle) {
      dispatch(addBook({ id: Date.now(), title: bookTitle }));
      setBookTitle('');
    }
  };

  return (
    <form onSubmit={handleAddBook} className="add-book-form">
      <input
        type="text"
        value={bookTitle}
        onChange={(e) => setBookTitle(e.target.value)}
        placeholder="Adicionar um novo livro"
        className="input-book"
      />
      <button type="submit" className="add-button">Adicionar</button>
    </form>
  );
};

// Integrante 4. Componente para listar livros
const ListaLivros = () => {
  const books = useSelector((state) => state.books);
  const dispatch = useDispatch();

  return (
    <div className="book-list">
      <h3>Lista de Livros</h3>
      {books.map((book) => (
        <div className="book-item" key={book.id}>
          <span>{book.title}</span>
          <button onClick={() => dispatch(removeBook(book.id))} className="remove-button">Remover</button>
        </div>
      ))}
    </div>
  );
};


// Integrante 5. Componente principal de gerenciamento de livros
const BookManager = () => {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <div className={`book-manager ${isDarkTheme ? 'dark' : 'light'}`}>
      <Header />
      <FormularioLivro />
      <button onClick={toggleTheme} className="theme-toggle-button">
        {isDarkTheme ? 'Tema Claro' : 'Tema Escuro'}
      </button>
      <ListaLivros />
    </div>
  );
};

// Aplicação
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <div>
          <BookManager />
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
