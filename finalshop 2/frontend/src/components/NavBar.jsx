import React from 'react';

function NavBar({ cartItems, onCartClick, searchQuery, onSearch }) {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="navbar-90s">
      <div className="logo" onClick={() => onCartClick('home')}>
        RADICAL<br />SHOP 2000
      </div>

      <input
        className="search-input"
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
      />

      <button className="cart-button" onClick={() => onCartClick('cart')}>
        CART
        {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
      </button>
    </div>
  );
}

export default NavBar;
