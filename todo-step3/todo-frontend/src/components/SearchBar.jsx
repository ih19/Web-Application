import React, { useState } from 'react';

// SearchBar receives the current query and a callback to update it in the parent
function SearchBar({ searchQuery, onSearch }) {
  const [input, setInput] = useState(searchQuery || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    // Live search as user types
    onSearch(e.target.value);
  };

  return (
    <form className="navbar-search" onSubmit={handleSubmit}>
      <select aria-label="Search category">
        <option>All</option>
        <option>Electronics</option>
        <option>Books</option>
        <option>Kitchen</option>
        <option>Clothing</option>
        <option>Toys</option>
      </select>
      <input
        type="text"
        placeholder="Search ShopNow..."
        value={input}
        onChange={handleChange}
        aria-label="Search products"
      />
      <button type="submit" aria-label="Submit search">
        <i className="bi bi-search"></i>
      </button>
    </form>
  );
}

export default SearchBar;
