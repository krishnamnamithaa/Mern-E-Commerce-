import React, { useState } from 'react';

export default function CheckoutModal({ isOpen, onClose, cart, user, onPlaceOrder }) {
  const [fullName, setFullName] = useState(user ? user.name : '');
  const [address, setAddress] = useState(user && user.address ? user.address.street || '' : '');
  const [city, setCity] = useState(user && user.address ? user.address.city || '' : '');
  const [postalCode, setPostalCode] = useState(user && user.address ? user.address.zipCode || '' : '');
  const [country, setCountry] = useState('United States');
  const [phoneNumber, setPhoneNumber] = useState(user ? user.phoneNumber || '' : '');
  const [paymentMethod, setPaymentMethod] = useState('Stripe');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingPrice = subtotal > 150 ? 0 : 15;
  const taxPrice = subtotal * 0.08;
  const totalPrice = subtotal + shippingPrice + taxPrice;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !address || !city || !postalCode || !phoneNumber) {
      setErrorMsg('Please complete all shipping address fields');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    const orderData = {
      orderItems: cart.map(item => ({
        product: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image || (item.images && item.images[0] ? item.images[0].url : '')
      })),
      shippingAddress: {
        fullName,
        address,
        city,
        postalCode,
        country,
        phoneNumber
      },
      paymentMethod,
      itemsPrice: subtotal,
      taxPrice,
      shippingPrice,
      totalPrice
    };

    const result = await onPlaceOrder(orderData);
    setLoading(false);
    if (result.error) {
      setErrorMsg(result.error);
    } else {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="glass-panel animate-fade-in" style={{
        maxWidth: '650px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        borderRadius: 'var(--radius-lg)',
        padding: '32px',
        position: 'relative'
      }} onClick={(e) => e.stopPropagation()}>

        <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer' }}>
          ✕
        </button>

        <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          💳 Checkout & Delivery
        </h2>

        {errorMsg && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid var(--danger)', color: '#fca5a5', padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '16px', fontSize: '0.9rem' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Shipping Info */}
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '12px', color: 'var(--primary)' }}>1. Shipping Address</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <input
                className="input-field"
                placeholder="Full Name *"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <input
                className="input-field"
                placeholder="Phone Number *"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <input
                className="input-field"
                placeholder="Street Address *"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ gridColumn: 'span 2' }}
                required
              />
              <input
                className="input-field"
                placeholder="City *"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
              <input
                className="input-field"
                placeholder="Postal / Zip Code *"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '12px', color: 'var(--primary)' }}>2. Payment Method</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {['Stripe', 'PayPal', 'Cash on Delivery'].map((pm) => (
                <button
                  type="button"
                  key={pm}
                  onClick={() => setPaymentMethod(pm)}
                  style={{
                    padding: '12px 8px',
                    borderRadius: 'var(--radius-md)',
                    border: paymentMethod === pm ? '2px solid var(--primary)' : '1px solid var(--glass-border)',
                    background: paymentMethod === pm ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255,255,255,0.03)',
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  {pm === 'Stripe' ? '💳 Credit Card' : pm === 'PayPal' ? '🅿️ PayPal' : '💵 Cash'}
                </button>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '12px' }}>3. Order Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Items ({cart.length})</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Shipping</span>
                <span>{shippingPrice === 0 ? 'FREE' : `$${shippingPrice.toFixed(2)}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Est. Tax (8%)</span>
                <span>${taxPrice.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: '800', color: '#fff', borderTop: '1px solid var(--glass-border)', paddingTop: '8px', marginTop: '4px' }}>
                <span>Total Amount</span>
                <span style={{ color: 'var(--primary)' }}>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ padding: '14px', fontSize: '1.05rem', borderRadius: 'var(--radius-full)' }}
          >
            {loading ? 'Processing Order...' : `Pay & Place Order • $${totalPrice.toFixed(2)}`}
          </button>
        </form>
      </div>
    </div>
  );
}
