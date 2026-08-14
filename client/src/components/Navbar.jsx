import React from 'react';

export default function Navbar({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
  cartCount,
  onOpenCart,
  user,
  onOpenAuth,
  onLogout,
  onOpenOrders,
  onOpenAdmin,
  onSeedDB
}) {
  return (
    <header className="glass-panel" style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '14px 28px',
      borderRadius: '0 0 20px 20px',
      marginBottom: '24px'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        flexWrap: 'wrap'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setSelectedCategory('All')}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '800',
            fontSize: '1.4rem',
            color: '#fff',
            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)'
          }}>
            ⚡
          </div>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: '800', letterSpacing: '-0.5px', background: 'linear-gradient(90deg, #fff 0%, #a5b4fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              AURA
            </h1>
            <span style={{ fontSize: '0.7rem', color: '#9ca3af', display: 'block', marginTop: '-4px', fontWeight: '600', letterSpacing: '1px' }}>
              NEXT-GEN MARKETPLACE
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{ flex: '1 1 320px', maxWidth: '500px', position: 'relative' }}>
          <input
            type="text"
            className="input-field"
            placeholder="Search premium tech, apparel, audio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              paddingLeft: '44px',
              borderRadius: 'var(--radius-full)',
              borderColor: searchTerm ? 'var(--primary)' : 'var(--glass-border)'
            }}
          />
          <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            🔍
          </span>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              style={{
                position: 'absolute',
                right: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Seed DB quick button */}
          <button className="btn btn-secondary" onClick={onSeedDB} title="Reset & Seed Database" style={{ fontSize: '0.82rem', padding: '8px 14px' }}>
            🌱 Seed DB
          </button>

          {/* Admin Panel */}
          {user && user.role === 'admin' && (
            <button className="btn btn-secondary" onClick={onOpenAdmin} style={{ fontSize: '0.82rem', padding: '8px 14px', borderColor: 'var(--primary)' }}>
              ⚙️ Admin
            </button>
          )}

          {/* Cart Button */}
          <button className="btn btn-primary" onClick={onOpenCart} style={{ position: 'relative', borderRadius: 'var(--radius-full)' }}>
            🛒 Cart
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                background: 'var(--accent)',
                color: '#fff',
                borderRadius: '50%',
                width: '22px',
                height: '22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: '800',
                boxShadow: '0 2px 8px var(--accent-glow)'
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* User Profile / Auth */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button className="btn btn-secondary" onClick={onOpenOrders} style={{ fontSize: '0.85rem' }}>
                📦 My Orders
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 10px', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-full)', border: '1px solid var(--glass-border)' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: '700', color: '#a5b4fc' }}>
                  👤 {user.name}
                </span>
                <button
                  onClick={onLogout}
                  style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: '0.8rem', paddingLeft: '4px' }}
                  title="Logout"
                >
                  🚪
                </button>
              </div>
            </div>
          ) : (
            <button className="btn btn-accent" onClick={onOpenAuth} style={{ borderRadius: 'var(--radius-full)' }}>
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Bar */}
      <div style={{
        maxWidth: '1280px',
        margin: '14px auto 0',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '4px'
      }}>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.82rem',
                fontWeight: isActive ? '700' : '500',
                background: isActive ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' : 'rgba(255,255,255,0.04)',
                color: isActive ? '#fff' : 'var(--text-muted)',
                border: isActive ? '1px solid #818cf8' : '1px solid var(--glass-border)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'var(--transition)'
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </header>
  );
}
