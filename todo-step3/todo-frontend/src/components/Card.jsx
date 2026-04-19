import React from 'react';

// Card receives a product object and an onAddToCart callback via props
function Card({ product, onAddToCart }) {

  // Render star rating (filled, half, empty)
  const renderStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    for (let i = 0; i < full; i++) stars.push(<i key={`f${i}`} className="bi bi-star-fill"></i>);
    if (half) stars.push(<i key="h" className="bi bi-star-half"></i>);
    while (stars.length < 5) stars.push(<i key={`e${stars.length}`} className="bi bi-star"></i>);
    return stars;
  };

  // Format price into whole and decimal parts
  const formatPrice = (price) => {
    const parts = price.toFixed(2).split('.');
    return { whole: parts[0], cents: parts[1] };
  };

  const { whole, cents } = formatPrice(product.price);

  return (
    <div className="product-card">
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.title}
        onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'; }}
      />

      {/* Category */}
      <p className="card-category">{product.category}</p>

      {/* Title */}
      <p className="card-title">{product.title}</p>

      {/* Stars + Reviews */}
      <div className="d-flex align-items-center mb-1">
        <span className="stars">{renderStars(product.rating)}</span>
        <span className="review-count">{product.reviews.toLocaleString()}</span>
      </div>

      {/* Price */}
      <div className="mb-1">
        <span className="price-cents">$</span>
        <span className="price-whole">{whole}</span>
        <sup className="price-cents">{cents}</sup>
      </div>

      {/* Prime Badge */}
      {product.prime && (
        <p className="prime-badge mb-2">
          <i className="bi bi-lightning-charge-fill"></i> FREE Prime Delivery
        </p>
      )}

      {/* Add to Cart Button */}
      <button
        className="btn-add-cart mt-auto"
        onClick={(e) => {
          e.stopPropagation();
          onAddToCart(product);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default Card;
