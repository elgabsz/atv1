import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../redux/booksSlice';


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

export default FormularioLivro;
