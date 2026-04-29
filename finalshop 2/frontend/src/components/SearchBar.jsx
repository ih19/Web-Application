import React from 'react';

function SearchBar({ searchQuery, onSearch }) {
  return (
    <input
      className="search-input"
      type="text"
      placeholder="Search products..."
      value={searchQuery}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}

export default SearchBar;
