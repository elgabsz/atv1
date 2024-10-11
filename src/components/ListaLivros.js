import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeBook } from '../redux/booksSlice';
import './ListaLivros.css'; 

const ListaLivros = () => {
  const books = useSelector((state) => state.books);
  const dispatch = useDispatch();

  return (
    <div className="book-list">
      {books.map((book) => (
        <div className="book-item" key={book.id}>
          <span>{book.title}</span>
          <button onClick={() => dispatch(removeBook(book.id))} className="remove-button">Remover</button>
        </div>
      ))}
    </div>
  );
};

export default ListaLivros;
