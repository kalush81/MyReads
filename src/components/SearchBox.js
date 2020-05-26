import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";

export default class SearchBox extends Component {
  state = {
    query: "",
    newBooks: [],
    myReadsBooks: [],
    selected: false,
  };

  handleChange = (event) => {
    const { value } = event.target;
    if (value.trim() !== "") {
      this.setState(
        {
          query: value,
        },
        () => {
          this.queryIsEmpty() && this.cleanUpnewBooks();
        }
      );
    } else {
      this.setState({
        query: "",
        newBooks: [],
      });
    }
  };

  queryIsEmpty = () => {
    return this.state.query.trim() === "";
  };

  handleSubmit = () => {
    const { query } = this.state;
    query.trim() ? this.fetchNewBooks(query.trim()) : this.cleanUpnewBooks();
  };

  fetchNewBooks = (query) => {
    BooksAPI.search(query)
      .then((books) => {
        return books.error
          ? this.setState({
              newBooks: [{ id: "notFound", title: "not found" }],
            })
          : this.setState(
              { newBooks: books },
              this.updateBooks(books, this.state.myReadsBooks)
            );
      })
      .catch((err) => console.log("err while fetching new books", err));
  };

  newSelection = () => {
    this.setState({
      selected: true,
    });
  };

  cleanUpnewBooks = () => {
    this.setState({ newBooks: [] });
  };

  updateBooks = (newBooks, myReadsBooks) => {
    const result = newBooks.map(function(obj) {
      const found = myReadsBooks.find((element) => element.id === obj.id);
      if (found) {
        obj.shelf = found.shelf;
      }
      return obj;
    });
    this.setState({
      newBooks: result,
    });
  };

  componentDidMount() {
    BooksAPI.getAll().then((data) => {
      this.setState({
        myReadsBooks: data,
      });
    });
  }

  componentWillUnmount() {
    this.setState({
      newBooks: [],
    });
  }

  render() {
    const { query, newBooks } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
    
                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                  */}
            <input
              type="text"
              value={query}
              placeholder="Search by title or author"
              onChange={this.handleChange}
            />
            <button disabled={this.queryIsEmpty()} onClick={this.handleSubmit}>
              fetch
            </button>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {newBooks.map((book) => (
              <Book
                key={book.id}
                bookdata={book}
                shelf={book.shelf}
                onUpdate={this.newSelection}
              />
            ))}
          </ol>
        </div>
        {this.state.selected && <Redirect to="/" />}
      </div>
    );
  }
}
