import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import SearchBox from "./components/SearchBox";
import BookStand from "./components/BookStand";

const BooksApp = () => {
  return (
    <div className="app">
      <Route exact path="/" render={() => <BookStand />} />
      <Route path="/search" render={() => <SearchBox />} />
    </div>
  );
};

export default BooksApp;
