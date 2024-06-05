import React, { useState, useEffect } from "react";
import BookCard from "./BookCard";
import Navbar from "./Navbar";

function MyBookshelf() {
  const [bookshelf, setBookshelf] = useState([]);

  const loadBookshelf = () => {
    let storedBookshelf = localStorage.getItem("bookshelf");
    storedBookshelf = storedBookshelf ? JSON.parse(storedBookshelf) : [];
    setBookshelf(storedBookshelf);
  };

  // Use an effect hook to load the bookshelf when the component mounts
  useEffect(loadBookshelf, []);

  return (
    <>
    <Navbar />
      <div className="text-center">
        <div className="flex justify-between items-center mb-4">
            <h1 className="font-bold text-2xl text-center mx-auto mb-10">
              My Bookshelf
            </h1>
        </div>
        {bookshelf.length === 0 ? (
          <div className="text-center text-3xl mt-10 mx-auto">
            Add books to your bookshelf to see them here.
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-1 mx-8">
            {bookshelf.map((book) => (
              <div className="flex justify-center" key={book.key}>
                <BookCard book={book} loadBookshelf={loadBookshelf} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default MyBookshelf;
