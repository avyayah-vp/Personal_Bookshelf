import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookCard from "./BookCard";
import Spinner from "./Spinner";

function BookSearch() {
  // State variables for query and books
  const [query, setQuery] = useState(localStorage.getItem("query") || "");
  const [books, setBooks] = useState(
    JSON.parse(localStorage.getItem("books")) || []
  );
  const [isLoading, setIsLoading] = useState(false);

  // Effect hook to store query and books in localStorage
  useEffect(() => {
    localStorage.setItem("query", query);
    localStorage.setItem("books", JSON.stringify(books));
  }, [query, books]);

  // Input change handler with debouncing
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Clear the previous timeout if there is one
    clearTimeout(window.searchTimeout);

    // Set a new timeout
    window.searchTimeout = setTimeout(() => {
      if (value.length > 0) {
        setIsLoading(true);
        fetch(`https://openlibrary.org/search.json?q=${value}&limit=10&page=1`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setBooks(data.docs);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error(
              "There has been a problem with your fetch operation:",
              error
            );
            setIsLoading(false);
          });
      } else {
        setBooks([]); // Clear the books data when the input is empty
      }
    }, 200); // 150ms timeout
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
  <div className="flex-1 text-center flex-col">
    <h1 className="text-5xl mb-5 ml-36">Personal Bookshelf</h1>
    <h1 className="font-bold text-xl ml-36">Search By Book Name:</h1>
    <input
      type="text"
      value={query}
      onChange={handleInputChange}
      placeholder="Harry Potter"
      className="mx-auto border-2 border-black p-1 m-3 rounded-lg mb-10 inline-block ml-36"
    />
  </div>
  <Link
    to="/my-bookshelf"
    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mt-4 sm:mt-0"
  >
    My Bookshelf
  </Link>
</div>

      {isLoading ? (
        <Spinner /> // Show spinner when fetching
      ) : query.length === 0 ? (
        <div className="text-center text-3xl mt-10 mr-24">
          Search for your books
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-1 mx-8">
          {books.map((book) => (
            <div className="flex justify-center items-stretch" key={book.key}>
              <BookCard book={book} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookSearch;
