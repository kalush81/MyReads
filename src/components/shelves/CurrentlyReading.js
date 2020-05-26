import React from "react";
import Book from "../Book";

export default function CurrentlyReading({ books, onUpdate }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">Currently Reading</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <Book key={book.id} bookdata={book} shelf='currentlyReading' onUpdate={onUpdate}/>
          ))}
        </ol>
      </div>
    </div>
  );
}
