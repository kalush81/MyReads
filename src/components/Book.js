import React from "react";
import * as BooksAPI from "../BooksAPI";

export default function Book({ bookdata, shelf = "none", onUpdate }) {

  const displayAuthorName = (authors = ["anonymouse"]) => {
    return authors.join(", ");
  };

  const handleBookShelfChange = (event) => {
    const { value: shelf } = event.target;
    BooksAPI.update(bookdata, shelf)
    .then(res => { onUpdate(bookdata.id, shelf) })
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${bookdata.imageLinks &&
              bookdata.imageLinks.thumbnail})`,
          }}
        />
        <div className="book-shelf-changer">
          <select onChange={handleBookShelfChange} defaultValue={shelf}>
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="read">Read</option>
            <option value="none">None</option>
            <option value="wantToRead">Want to Read</option>
          </select>
        </div>
      </div>
      <div className="book-title">{bookdata.title}</div>
      <div className="book-authors">{displayAuthorName(bookdata.authors)}</div>
    </div>
  );
}
