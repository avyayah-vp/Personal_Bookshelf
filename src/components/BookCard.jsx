import React, { useState, useEffect } from 'react';

function BookCard({ book, loadBookshelf }) {
    // A state variable to check if the book is in the bookshelf
    const [isBookInBookshelf, setIsBookInBookshelf] = useState(false);

    // Use an effect hook to check if the book is in the bookshelf when the component mounts    
    useEffect(() => {
        const bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
        setIsBookInBookshelf(bookshelf.some(b => b.key === book.key));
    }, [book.key]); // Dependency array added to avoid warning

    // Define a function to handle adding the book to the bookshelf
    const handleAddToBookshelf = () => {
        const bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
        bookshelf.push(book);
        localStorage.setItem('bookshelf', JSON.stringify(bookshelf));
        setIsBookInBookshelf(true);
    };

    // Define a function to handle removing the book from the bookshelf
    const handleRemoveFromBookshelf = () => {
        let bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
        bookshelf = bookshelf.filter(b => b.key !== book.key);
        localStorage.setItem('bookshelf', JSON.stringify(bookshelf));
        setIsBookInBookshelf(false);
        if (loadBookshelf) {
            loadBookshelf();
        }
    };

    return (
        <div className="book-card border-2 border-black rounded-lg p-4 m-2 flex flex-col h-60 w-52 gap-4 justify-evenly">
            <div className='text-left'>
                <span className="font-bold text-black">Book Title:</span> {book.title}
            </div>
            <div className='text-left'>
                <span className="font-bold text-black">Edition Count:</span> {book.edition_count}
            </div>
            {!isBookInBookshelf ? (
                <button className="add-button bg-green-500 hover:bg-green-700 rounded-full p-1 text-white" onClick={handleAddToBookshelf}>Add to Bookshelf</button>
            ) : (
                <button className="remove-button bg-red-500 hover:bg-red-700 rounded-full p-1 text-white" onClick={handleRemoveFromBookshelf}>Remove from Bookshelf</button>
            )}
        </div>
    );
}

export default BookCard;
