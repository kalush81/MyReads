import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import CurrentlyReading from "./shelves/CurrentlyReading";
import WantToRead from "./shelves/WantToRead";
import Read from "./shelves/Read";

export default class BookStand extends Component {
  state = {
    books: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) =>
      this.setState({
        books,
      })
    );
  };

  updateBooks = (id, shelf) => {
    const updatedBooks = this.state.books.map((book) => {
      if (book.id === id) {
        return { ...book, shelf };
      } else {
        return book;
      }
    });

    this.setState({
      books: updatedBooks,
    });
  };

  render() {
    const { books } = this.state;

    const currentlyReading = books.filter(
      (book) => book.shelf === "currentlyReading"
    );
    const wantToRead = books.filter((book) => book.shelf === "wantToRead");
    const read = books.filter((book) => book.shelf === "read");

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <CurrentlyReading
              books={currentlyReading}
              onUpdate={this.updateBooks}
            />

            <WantToRead books={wantToRead} onUpdate={this.updateBooks} />

            <Read books={read} onUpdate={this.updateBooks} />
          </div>
        </div>
        <div className="open-search">
          <Link to="search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    );
  };
};
