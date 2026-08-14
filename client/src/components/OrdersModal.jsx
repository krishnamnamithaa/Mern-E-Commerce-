import React, { useEffect, useState } from 'react';

export default function OrdersModal({ isOpen, onClose, token }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && token) {
      fetch('/api/orders/myorders', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          setOrders(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [isOpen, token]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="glass-panel animate-fade-in" style={{
        maxWidth: '700px',
        width: '100%',
        maxHeight: '85vh',
        overflowY: 'auto',
        borderRadius: 'var(--radius-lg)',
        padding: '32px',
        position: 'relative'
      }} onClick={(e) => e.stopPropagation()}>
        
        <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer' }}>
          ✕
        </button>

        <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          📦 My Order History
        </h2>

        {loading ? (
          <p style={{ color: 'var(--text-muted)' }}>Loading your orders...</p>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '8px' }}>📦</span>
            <p>You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {orders.map((ord) => (
              <div key={ord._id} style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', pb: '8px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Order ID: #{ord._id.slice(-8)}</span>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>
                      {new Date(ord.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span className={`badge ${ord.isPaid ? 'badge-success' : 'badge-accent'}`}>
                      {ord.isPaid ? 'PAID' : 'UNPAID'}
                    </span>
                    <span className="badge badge-primary">
                      {ord.orderStatus || 'Processing'}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                  {ord.orderItems.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {item.image && <img src={item.image} alt={item.name} style={{ width: '36px', height: '36px', borderRadius: '4px', objectFit: 'cover' }} />}
                        <span>{item.name} × {item.quantity}</span>
                      </div>
                      <span style={{ fontWeight: '700' }}>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', pt: '8px', borderTop: '1px solid rgba(255,255,255,0.06)', fontWeight: '800', color: 'var(--primary)' }}>
                  <span>Total Amount</span>
                  <span>${ord.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
