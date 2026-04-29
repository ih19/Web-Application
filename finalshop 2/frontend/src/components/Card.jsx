import React from 'react';

function Card({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.title}
        onError={(e) => { e.target.src = 'https://via.placeholder.com/200x160?text=No+Image'; }}
      />
      <p className="p-category">{product.category}</p>
      <p className="p-title">{product.title}</p>
      <p className="p-price">${product.price}</p>
      <p className="p-rating">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))} {product.rating}</p>
      <button className="add-btn" onClick={() => onAddToCart(product)}>
        ADD TO CART
      </button>
    </div>
  );
}

export default Card;
