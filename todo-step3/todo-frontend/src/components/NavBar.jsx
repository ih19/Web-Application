import React from 'react';
import SearchBar from './SearchBar';

// NavBar receives cart items, search state, and a setter to switch between home/cart views
function NavBar({ cartItems, onCartClick, searchQuery, onSearch, currentView }) {

  // Total quantity in cart
  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Main Nav */}
      <nav className="navbar-amazon">
        {/* Logo */}
        <a className="navbar-logo" href="#" onClick={(e) => { e.preventDefault(); onCartClick('home'); }}>
          shop<span>Now</span>
        </a>

        {/* Delivery address */}
        <div className="navbar-deliver d-none d-md-block">
          <span>Deliver to</span>
          <strong><i className="bi bi-geo-alt-fill me-1"></i>Philadelphia</strong>
        </div>

        {/* Search Bar */}
        <SearchBar searchQuery={searchQuery} onSearch={onSearch} />

        {/* Account */}
        <div className="navbar-account d-none d-md-block">
          <span>Hello, User</span>
          <strong>Account & Lists <i className="bi bi-chevron-down" style={{ fontSize: '0.65rem' }}></i></strong>
        </div>

        {/* Returns */}
        <div className="navbar-account d-none d-lg-block">
          <span>Returns</span>
          <strong>& Orders</strong>
        </div>

        {/* Cart */}
        <div
          className="navbar-cart"
          onClick={() => onCartClick(currentView === 'cart' ? 'home' : 'cart')}
          role="button"
          aria-label={`Cart with ${totalQty} items`}
        >
          <span className="cart-icon"><i className="bi bi-cart3"></i></span>
          {totalQty > 0 && <span className="cart-count">{totalQty}</span>}
          <span className="d-none d-sm-inline">Cart</span>
        </div>
      </nav>

      {/* Sub Nav */}
      <div className="subnav">
        {['All', "Today's Deals", 'Electronics', 'Books', 'Kitchen', 'Clothing', 'Toys', 'Prime'].map(item => (
          <button key={item} className="subnav-item" onClick={() => onSearch(item === 'All' || item === 'Prime' ? '' : item)}>
            {item}
          </button>
        ))}
      </div>
    </>
  );
}

export default NavBar;
