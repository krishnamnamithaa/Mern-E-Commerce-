import React from 'react';

export default function ProductCard({ product, onSelect, onAddToCart }) {
  const imageUrl = (product.images && product.images[0] && product.images[0].url) 
    ? product.images[0].url 
    : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="glass-panel animate-fade-in" style={{
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      position: 'relative'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-6px)';
      e.currentTarget.style.borderColor = 'var(--glass-border-hover)';
      e.currentTarget.style.boxShadow = '0 15px 35px -5px rgba(0, 0, 0, 0.6), 0 0 20px var(--primary-glow)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.borderColor = 'var(--glass-border)';
      e.currentTarget.style.boxShadow = 'var(--shadow-card)';
    }}
    >
      {/* Badges */}
      <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2, display: 'flex', gap: '6px' }}>
        {product.discount > 0 && (
          <span className="badge badge-accent">
            -{product.discount}% OFF
          </span>
        )}
        {product.isFeatured && (
          <span className="badge badge-primary">
            ★ FEATURED
          </span>
        )}
      </div>

      {/* Image Container */}
      <div 
        onClick={() => onSelect(product)}
        style={{
          width: '100%',
          height: '220px',
          overflow: 'hidden',
          position: 'relative',
          background: '#0f172a'
        }}
      >
        <img
          src={imageUrl}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
        />
      </div>

      {/* Card Info */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.5px' }}>
              {product.brand || product.category}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', color: '#fbbf24', fontWeight: '600' }}>
              ★ {product.rating ? product.rating.toFixed(1) : '4.5'}
              <span style={{ color: 'var(--text-subtle)', fontSize: '0.75rem' }}>({product.numReviews || 0})</span>
            </div>
          </div>

          <h3 
            onClick={() => onSelect(product)}
            style={{
              fontSize: '1.05rem',
              fontWeight: '700',
              lineHeight: '1.3',
              marginBottom: '10px',
              color: 'var(--text-main)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              height: '2.6em'
            }}
          >
            {product.name}
          </h3>
        </div>

        <div>
          {/* Price & Action */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '14px', pt: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#fff' }}>
                ${product.price}
              </div>
              {product.originalPrice && (
                <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', textDecoration: 'line-through' }}>
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              style={{
                padding: '8px 16px',
                fontSize: '0.85rem',
                borderRadius: 'var(--radius-full)'
              }}
            >
              + Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
