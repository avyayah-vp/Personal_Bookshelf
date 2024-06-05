// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookSearch from './components/BookSearch';
import MyBookshelf from './components/MyBookshelf';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<BookSearch />} />
          <Route path="/my-bookshelf" element={<MyBookshelf />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
