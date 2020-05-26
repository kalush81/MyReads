import React from "react";
import Book from '../Book';

export default function Read({ books, onUpdate }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">Read</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <Book key={book.id} bookdata={book} shelf='read' onUpdate={onUpdate}/>
          ))}
        </ol>
      </div>
    </div>
  );
}
