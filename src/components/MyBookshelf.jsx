import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';
import { FaArrowLeft } from 'react-icons/fa'; // Import the back arrow icon

function MyBookshelf() {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    let storedBookshelf = localStorage.getItem('bookshelf');
    storedBookshelf = storedBookshelf ? JSON.parse(storedBookshelf) : [];
    setBookshelf(storedBookshelf);
  }, []);

  return (
    <div className="text-center">
      <div className="flex justify-between items-center mb-4">
        <div>
          <Link to="/" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full flex items-center">
            <FaArrowLeft className="sm:hidden"/> {/* The back arrow icon will only be visible on small screens */}
            <span className="hidden sm:inline">Back to Search</span> {/* The text will be hidden on small screens */}
          </Link>
        </div>
        <div>
        <h1 className='text-5xl mb-5 mr-36'>Personal Bookshelf</h1>
          <h1 className='font-bold text-xl text-center mb-4 mr-36'>My Bookshelf</h1>
        </div>
        <div></div>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-1 mx-8">
        {bookshelf.map((book) => (
          <div className="flex justify-center" key={book.key}>
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBookshelf;
