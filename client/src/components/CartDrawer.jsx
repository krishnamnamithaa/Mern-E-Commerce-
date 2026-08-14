import React from 'react';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onCheckout
}) {
  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 15;
  const tax = subtotal * 0.08;
  const grandTotal = subtotal + shipping + tax;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ justifyContent: 'flex-end', padding: 0 }}>
      <div className="glass-panel animate-fade-in" style={{
        maxWidth: '440px',
        width: '100%',
        height: '100vh',
        borderRadius: '24px 0 0 24px',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative'
      }} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', pb: '16px', borderBottom: '1px solid var(--glass-border)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
              🛒 Shopping Cart ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h2>
            <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer' }}>
              ✕
            </button>
          </div>

          {/* Cart Items List */}
          <div style={{ overflowY: 'auto', maxHeight: '55vh', paddingRight: '4px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                <span style={{ fontSize: '3rem', display: 'block', marginBottom: '12px' }}>🛍️</span>
                <p style={{ fontWeight: '600' }}>Your cart is empty</p>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-subtle)' }}>Add items to get started!</span>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item._id} style={{ display: 'flex', gap: '14px', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
                  <img
                    src={item.image || (item.images && item.images[0] ? item.images[0].url : '')}
                    alt={item.name}
                    style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                  />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '700', lineHeight: 1.2, marginBottom: '4px' }}>{item.name}</h4>
                    <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#fff' }}>${item.price}</div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                      <button
                        onClick={() => onUpdateQty(item._id, item.quantity - 1)}
                        style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.05)', color: '#fff', cursor: 'pointer' }}
                      >
                        -
                      </button>
                      <span style={{ fontSize: '0.85rem', fontWeight: '700' }}>{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQty(item._id, item.quantity + 1)}
                        style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.05)', color: '#fff', cursor: 'pointer' }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item._id)}
                    style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: '1rem', padding: '4px' }}
                    title="Remove item"
                  >
                    🗑️
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer & Checkout Summary */}
        {cart.length > 0 && (
          <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Estimated Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: '800', color: '#fff', borderTop: '1px dashed var(--glass-border)', paddingTop: '10px' }}>
                <span>Total</span>
                <span style={{ color: 'var(--primary)' }}>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={onCheckout}
              style={{ width: '100%', padding: '14px', fontSize: '1rem', borderRadius: 'var(--radius-full)' }}
            >
              Proceed to Checkout ➔
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
