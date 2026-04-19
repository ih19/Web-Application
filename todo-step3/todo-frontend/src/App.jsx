import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Card from './components/Card';
import ShoppingCart from './components/ShoppingCart';

const PRODUCTS_URL = 'http://localhost:5000/products';
const CART_URL = 'http://localhost:5000/cart';

function App() {
  // State
  const [products, setProducts] = useState([]);       // All products from backend
  const [cartItems, setCartItems] = useState([]);     // Cart items from backend
  const [searchQuery, setSearchQuery] = useState(''); // Current search string
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'cart'
  const [loading, setLoading] = useState(true);

  // useEffect: Fetch products and cart from json-server on mount
  useEffect(() => {
    Promise.all([
      fetch(PRODUCTS_URL).then(r => r.json()),
      fetch(CART_URL).then(r => r.json())
    ]).then(([prods, cart]) => {
      setProducts(prods);
      setCartItems(cart);
      setLoading(false);
    }).catch(err => {
      console.error('Failed to fetch data:', err);
      setLoading(false);
    });
  }, []);

  // Filter products by search query (title or category)
  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // POST or PATCH: Add item to cart (persist to backend)
  const handleAddToCart = (product) => {
    const existing = cartItems.find(item => item.id === product.id);

    if (existing) {
      // PATCH: increment quantity
      const updated = { ...existing, quantity: existing.quantity + 1 };
      fetch(`${CART_URL}/${existing.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: updated.quantity })
      })
        .then(r => r.json())
        .then(() => {
          setCartItems(cartItems.map(item => item.id === existing.id ? updated : item));
        });
    } else {
      // POST: add new cart item
      const newCartItem = { ...product, quantity: 1 };
      fetch(CART_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCartItem)
      })
        .then(r => r.json())
        .then(saved => {
          setCartItems([...cartItems, saved]);
        });
    }
  };

  // PATCH: Update quantity of cart item; if qty becomes 0, delete it
  const handleUpdateQty = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    fetch(`${CART_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: newQty })
    })
      .then(r => r.json())
      .then(() => {
        setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: newQty } : item));
      });
  };

  // DELETE: Remove item from cart
  const handleRemoveFromCart = (id) => {
    fetch(`${CART_URL}/${id}`, { method: 'DELETE' })
      .then(() => {
        setCartItems(cartItems.filter(item => item.id !== id));
      });
  };

  // Navigate between views
  const handleViewChange = (view) => {
    setCurrentView(view);
    setSearchQuery('');
  };

  return (
    <div>
      {/* NavBar — always visible */}
      <NavBar
        cartItems={cartItems}
        onCartClick={handleViewChange}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        currentView={currentView}
      />

      {/* CART VIEW */}
      {currentView === 'cart' && (
        <ShoppingCart
          cartItems={cartItems}
          onUpdateQty={handleUpdateQty}
          onRemove={handleRemoveFromCart}
          onContinueShopping={() => handleViewChange('home')}
        />
      )}

      {/* HOME VIEW */}
      {currentView === 'home' && (
        <>
          {/* Hero Banner */}
          {!searchQuery && (
            <div className="hero-banner">
              <h2>🛒 Welcome to ShopNow</h2>
              <p>Millions of products. Delivered fast. Prices you'll love.</p>
              <button className="btn btn-warning fw-bold px-4 py-2 rounded-pill">
                Shop Today's Deals
              </button>
            </div>
          )}

          <div className="container py-3">
            {/* Search Results Header */}
            {searchQuery && (
              <p className="search-results-header">
                {filteredProducts.length} results for <span>"{searchQuery}"</span>
              </p>
            )}

            {/* Section Title */}
            {!searchQuery && <h3 className="section-title">Featured Products</h3>}

            {/* Loading */}
            {loading && (
              <div className="text-center py-5">
                <div className="spinner-border text-warning" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2 text-muted">Loading products...</p>
              </div>
            )}

            {/* No Results */}
            {!loading && filteredProducts.length === 0 && (
              <div className="text-center py-5">
                <i className="bi bi-search" style={{ fontSize: '3rem', color: '#ccc' }}></i>
                <p className="mt-2 text-muted">No products found for "{searchQuery}"</p>
                <button className="btn btn-warning mt-2" onClick={() => setSearchQuery('')}>
                  Clear Search
                </button>
              </div>
            )}

            {/* Product Grid — uses Card component via props */}
            {!loading && filteredProducts.length > 0 && (
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                {filteredProducts.map(product => (
                  <div key={product.id} className="col">
                    <Card
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="mb-2">
          <a href="#">Careers</a>
          <a href="#">Blog</a>
          <a href="#">About ShopNow</a>
          <a href="#">Help</a>
          <a href="#">Privacy</a>
        </div>
        <p className="mb-0">© 2026 ShopNow, Inc. — Built with React & JSON Server | CSC353</p>
      </footer>
    </div>
  );
}

export default App;
