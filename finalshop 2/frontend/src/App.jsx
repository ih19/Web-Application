import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Card from './components/Card';
import ShoppingCart from './components/ShoppingCart';

const PRODUCTS_URL = 'http://localhost:5000/products';
const CART_URL = 'http://localhost:5000/cart';

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState('home');

  useEffect(() => {
    fetch(PRODUCTS_URL)
      .then(res => res.json())
      .then(data => setProducts(data));

    fetch(CART_URL)
      .then(res => res.json())
      .then(data => setCartItems(data));
  }, []);

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product) => {
    const existing = cartItems.find(item => item.id === product.id);
    if (existing) {
      const updated = { ...existing, quantity: existing.quantity + 1 };
      fetch(`${CART_URL}/${existing.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: updated.quantity })
      }).then(() => setCartItems(cartItems.map(i => i.id === existing.id ? updated : i)));
    } else {
      const newItem = { ...product, quantity: 1 };
      fetch(CART_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      })
        .then(res => res.json())
        .then(saved => setCartItems([...cartItems, saved]));
    }
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) { removeFromCart(id); return; }
    fetch(`${CART_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: qty })
    }).then(() => setCartItems(cartItems.map(i => i.id === id ? { ...i, quantity: qty } : i)));
  };

  const removeFromCart = (id) => {
    fetch(`${CART_URL}/${id}`, { method: 'DELETE' })
      .then(() => setCartItems(cartItems.filter(i => i.id !== id)));
  };

  return (
    <div>
      <NavBar
        cartItems={cartItems}
        onCartClick={setView}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
      />

      {view === 'cart' ? (
        <ShoppingCart
          cartItems={cartItems}
          onUpdateQty={updateQty}
          onRemove={removeFromCart}
          onBack={() => setView('home')}
        />
      ) : (
        <div className="container py-3">
          {!searchQuery && (
            <div className="hero">
              <h1>RADICAL SHOP 2000</h1>
              <p>The best deals on the World Wide Web.</p>
            </div>
          )}

          {searchQuery && (
            <p className="search-info">
              {filtered.length} result(s) for "{searchQuery}"
            </p>
          )}

          <div className="section-label">
            {searchQuery ? 'SEARCH RESULTS' : 'FEATURED ITEMS'}
          </div>

          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
            {filtered.map(product => (
              <div key={product.id} className="col">
                <Card product={product} onAddToCart={addToCart} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="footer">
        <div>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Guestbook</a>
        </div>
        <p>(c) 1999 Radical Shop 2000. All rights reserved.</p>
        <p className="small-text">Best viewed in Netscape Navigator at 800x600</p>
      </div>
    </div>
  );
}

export default App;
