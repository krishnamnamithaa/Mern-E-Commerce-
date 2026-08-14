import React, { useState } from 'react';

export default function ProductModal({ product, onClose, onAddToCart, user, onAddReview }) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewMsg, setReviewMsg] = useState('');

  if (!product) return null;

  const imageUrl = (product.images && product.images[0] && product.images[0].url)
    ? product.images[0].url
    : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80';

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!comment) return;
    const res = await onAddReview(product._id, { rating, comment });
    if (res.error) {
      setReviewMsg(res.error);
    } else {
      setReviewMsg('Review submitted successfully!');
      setComment('');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="glass-panel animate-fade-in" style={{
        maxWidth: '850px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        borderRadius: 'var(--radius-lg)',
        padding: '32px',
        position: 'relative'
      }} onClick={(e) => e.stopPropagation()}>
        
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255,255,255,0.08)',
            border: 'none',
            color: 'var(--text-main)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '1.1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ✕
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginBottom: '32px' }}>
          {/* Image */}
          <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#020617', border: '1px solid var(--glass-border)' }}>
            <img src={imageUrl} alt={product.name} style={{ width: '100%', height: '340px', objectFit: 'cover' }} />
          </div>

          {/* Product Details */}
          <div>
            <span className="badge badge-primary" style={{ marginBottom: '8px' }}>
              {product.category} {product.brand ? `• ${product.brand}` : ''}
            </span>

            <h2 style={{ fontSize: '1.6rem', fontWeight: '800', lineHeight: 1.2, marginBottom: '12px' }}>
              {product.name}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontSize: '1.6rem', fontWeight: '800', color: '#fff' }}>
                ${product.price}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: '1rem', color: 'var(--text-subtle)', textDecoration: 'line-through' }}>
                  ${product.originalPrice}
                </span>
              )}
              <span className="badge badge-success">
                {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
              </span>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px', lineHeight: '1.6' }}>
              {product.description}
            </p>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Highlights</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {product.features.map((feat, idx) => (
                    <li key={idx} style={{ fontSize: '0.88rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: 'var(--primary)' }}>✓</span> {feat}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity Selector & Add to Cart */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', pt: '16px', borderTop: '1px solid var(--glass-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  style={{ width: '36px', height: '36px', background: 'none', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer' }}
                >
                  -
                </button>
                <span style={{ width: '36px', textAlign: 'center', fontWeight: '700' }}>{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  style={{ width: '36px', height: '36px', background: 'none', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer' }}
                >
                  +
                </button>
              </div>

              <button
                className="btn btn-primary"
                onClick={() => {
                  onAddToCart(product, qty);
                  onClose();
                }}
                style={{ flex: 1, padding: '12px 24px', fontSize: '0.95rem' }}
              >
                Add {qty} to Cart • ${(product.price * qty).toFixed(2)}
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '16px' }}>
            Customer Reviews ({product.reviews ? product.reviews.length : 0})
          </h3>

          {/* Add Review Form */}
          {user ? (
            <form onSubmit={handleReviewSubmit} style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '20px', border: '1px solid var(--glass-border)' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '10px' }}>Write a Review</h4>
              {reviewMsg && <div style={{ color: 'var(--success)', fontSize: '0.85rem', marginBottom: '10px' }}>{reviewMsg}</div>}
              
              <div style={{ display: 'flex', gap: '12px', marginBottom: '10px', alignItems: 'center' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Rating:</label>
                <select
                  className="input-field"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  style={{ width: '120px', padding: '6px 12px' }}
                >
                  <option value={5}>5 Stars ★★★★★</option>
                  <option value={4}>4 Stars ★★★★☆</option>
                  <option value={3}>3 Stars ★★★☆☆</option>
                  <option value={2}>2 Stars ★★☆☆☆</option>
                  <option value={1}>1 Star ★☆☆☆☆</option>
                </select>
              </div>

              <textarea
                className="input-field"
                rows={3}
                placeholder="Share your experience with this product..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{ marginBottom: '12px', resize: 'vertical' }}
              />

              <button className="btn btn-secondary" type="submit" style={{ fontSize: '0.85rem' }}>
                Submit Review
              </button>
            </form>
          ) : (
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Please sign in to write a product review.
            </p>
          )}

          {/* Reviews List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((rev, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>{rev.name}</span>
                    <span style={{ color: '#fbbf24', fontSize: '0.85rem' }}>{'★'.repeat(rev.rating)}</span>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>{rev.comment}</p>
                </div>
              ))
            ) : (
              <p style={{ color: 'var(--text-subtle)', fontSize: '0.88rem' }}>No reviews yet. Be the first to review!</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
