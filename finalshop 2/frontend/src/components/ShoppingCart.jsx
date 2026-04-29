import React from 'react';

function ShoppingCart({ cartItems, onUpdateQty, onRemove, onBack }) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <p>Your cart is empty.</p>
        <button className="back-btn" style={{ maxWidth: '260px', margin: '20px auto', display: 'block' }} onClick={onBack}>
          BACK TO SHOPPING
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row g-3">

        <div className="col-md-8">
          <div className="cart-window">
            <div className="window-titlebar">
              <span>Shopping Cart</span>
              <div className="win-btns">
                <span>_</span>
                <span>[]</span>
                <span>X</span>
              </div>
            </div>
            <div className="cart-body">
              {cartItems.map(item => (
                <div key={item.id} className="cart-row">
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/70?text=IMG'; }}
                  />
                  <div className="flex-grow-1">
                    <p className="item-name">{item.title}</p>
                    <p className="item-price">${item.price} each</p>
                    <div className="qty-controls">
                      <button onClick={() => onUpdateQty(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => onUpdateQty(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                    <span style={{ fontFamily: 'VT323, monospace', fontSize: '1.2rem', color: '#cc0000', fontWeight: 'bold' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button className="delete-btn" onClick={() => onRemove(item.id)}>DELETE</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="summary-box">
            <div className="window-titlebar">
              <span>Order Summary</span>
              <div className="win-btns">
                <span>_</span>
                <span>[]</span>
                <span>X</span>
              </div>
            </div>
            <div className="summary-body">
              <p>Items: {totalItems}</p>
              <p>Subtotal: ${subtotal.toFixed(2)}</p>
              <p style={{ color: 'green' }}>Shipping: FREE</p>
              <hr style={{ borderColor: '#888' }} />
              <p style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>Total: ${subtotal.toFixed(2)}</p>
              <button className="checkout-btn">CHECKOUT</button>
              <button className="back-btn" onClick={onBack}>BACK TO SHOPPING</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ShoppingCart;
