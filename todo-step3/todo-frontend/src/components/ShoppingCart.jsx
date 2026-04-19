import React from 'react';

// ShoppingCart receives cartItems array and handlers as props
function ShoppingCart({ cartItems, onUpdateQty, onRemove, onContinueShopping }) {

  // Calculate subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const renderStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating);
    for (let i = 0; i < full; i++) stars.push(<i key={i} className="bi bi-star-fill"></i>);
    return stars;
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-4">
        <div className="empty-cart">
          <i className="bi bi-cart-x"></i>
          <h3 className="mt-3 text-muted">Your ShopNow Cart is empty</h3>
          <p className="text-muted">You have no items in your shopping cart.</p>
          <button className="btn btn-warning mt-3 px-4 fw-bold" onClick={onContinueShopping}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row g-3">

        {/* Cart Items */}
        <div className="col-lg-9">
          <div className="cart-container">
            <h2 className="cart-title">Shopping Cart</h2>

            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/100?text=No+Image'; }}
                />

                {/* Info */}
                <div className="flex-grow-1">
                  <p className="cart-item-title">{item.title}</p>
                  <p className="text-success small mb-1">
                    <i className="bi bi-check-circle-fill me-1"></i>In Stock
                  </p>
                  {item.prime && (
                    <p className="prime-badge mb-1">
                      <i className="bi bi-lightning-charge-fill"></i> Prime
                    </p>
                  )}

                  {/* Qty Controls */}
                  <div className="d-flex align-items-center gap-3 flex-wrap">
                    <div className="qty-controls">
                      <button
                        className="qty-btn"
                        onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        {item.quantity === 1 ? <i className="bi bi-trash3"></i> : '−'}
                      </button>
                      <span className="qty-display">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-muted" style={{ fontSize: '0.8rem' }}>|</span>

                    {/* Delete */}
                    <button
                      style={{ background: 'none', border: 'none', color: '#007185', fontSize: '0.82rem', cursor: 'pointer', padding: 0 }}
                      onClick={() => onRemove(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="text-end flex-shrink-0">
                  <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                  {item.quantity > 1 && (
                    <p className="text-muted" style={{ fontSize: '0.75rem' }}>${item.price.toFixed(2)} each</p>
                  )}
                </div>
              </div>
            ))}

            {/* Subtotal bottom */}
            <div className="text-end mt-3">
              <span style={{ fontSize: '1rem' }}>
                Subtotal ({totalQty} {totalQty === 1 ? 'item' : 'items'}):
                <strong className="ms-2" style={{ fontSize: '1.1rem' }}>${subtotal.toFixed(2)}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="col-lg-3">
          <div className="cart-summary">
            <p className="text-success small mb-1">
              <i className="bi bi-shield-check me-1"></i>
              Your order qualifies for FREE Delivery
            </p>
            <p style={{ fontSize: '1rem' }}>
              Subtotal ({totalQty} {totalQty === 1 ? 'item' : 'items'}):
              <br />
              <strong style={{ fontSize: '1.2rem' }}>${subtotal.toFixed(2)}</strong>
            </p>
            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" id="giftCheck" />
              <label className="form-check-label small" htmlFor="giftCheck">
                This order contains a gift
              </label>
            </div>
            <button className="checkout-btn mb-2">Proceed to Checkout</button>
            <button
              className="btn btn-outline-secondary w-100 rounded-pill btn-sm"
              onClick={onContinueShopping}
            >
              ← Continue Shopping
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ShoppingCart;
