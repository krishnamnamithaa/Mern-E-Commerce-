import React from 'react';

export default function HeroBanner({ onExplore }) {
  return (
    <div className="glass-panel" style={{
      maxWidth: '1280px',
      margin: '0 auto 36px',
      borderRadius: 'var(--radius-lg)',
      padding: '48px 40px',
      background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8) 0%, rgba(17, 24, 39, 0.9) 50%, rgba(88, 28, 135, 0.4) 100%)',
      position: 'relative',
      overflow: 'hidden',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '30px',
      alignItems: 'center'
    }}>
      {/* Decorative Glow Orbs */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div>
        <span className="badge badge-accent" style={{ marginBottom: '16px' }}>
          🔥 Summer Tech & Fashion Sale • Up to 20% OFF
        </span>
        <h2 style={{
          fontSize: '2.8rem',
          fontWeight: '800',
          lineHeight: 1.15,
          marginBottom: '16px',
          background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #818cf8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Elevate Your Everyday Essentials
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '28px', maxWidth: '520px' }}>
          Discover handpicked premium electronics, high-grade audio gear, urban apparel, and barista home tools engineered for perfection.
        </p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={onExplore} style={{ padding: '14px 28px', fontSize: '1rem', borderRadius: 'var(--radius-full)' }}>
            ⚡ Explore Catalog
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '8px' }}>
            <span style={{ fontSize: '1.2rem' }}>⭐ 4.9/5</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Over 10,000+ satisfied buyers</span>
          </div>
        </div>
      </div>

      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <img
          src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
          alt="Featured Laptop"
          style={{
            width: '100%',
            maxWidth: '440px',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.6), 0 0 30px rgba(99, 102, 241, 0.3)',
            border: '1px solid rgba(255,255,255,0.15)',
            transform: 'perspective(1000px) rotateY(-8deg) rotateX(4deg)',
            transition: 'var(--transition)'
          }}
        />
      </div>
    </div>
  );
}
