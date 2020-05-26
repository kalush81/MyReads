import React from "react";
import Book from '../Book';

export default function wantToRead({ books, onUpdate }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">Want To Read</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <Book key={book.id} bookdata={book} shelf='wantToRead' onUpdate={onUpdate}/>
          ))}
        </ol>
      </div>
    </div>
  );
}
