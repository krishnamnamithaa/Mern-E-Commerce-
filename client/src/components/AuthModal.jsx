import React, { useState } from 'react';

export default function AuthModal({ isOpen, onClose, onLogin, onRegister }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    let res;
    if (isRegister) {
      if (!name || !email || !password) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }
      res = await onRegister({ name, email, password, role });
    } else {
      if (!email || !password) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }
      res = await onLogin({ email, password });
    }

    setLoading(false);
    if (res && res.error) {
      setError(res.error);
    } else {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="glass-panel animate-fade-in" style={{
        maxWidth: '420px',
        width: '100%',
        borderRadius: 'var(--radius-lg)',
        padding: '32px',
        position: 'relative'
      }} onClick={(e) => e.stopPropagation()}>
        
        <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer' }}>
          ✕
        </button>

        {/* Tab Header */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', background: 'rgba(255,255,255,0.04)', padding: '4px', borderRadius: 'var(--radius-full)' }}>
          <button
            onClick={() => { setIsRegister(false); setError(''); }}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background: !isRegister ? 'var(--primary)' : 'transparent',
              color: '#fff',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '0.9rem',
              transition: 'var(--transition)'
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => { setIsRegister(true); setError(''); }}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background: isRegister ? 'var(--primary)' : 'transparent',
              color: '#fff',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '0.9rem',
              transition: 'var(--transition)'
            }}
          >
            Register
          </button>
        </div>

        <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '16px', textAlign: 'center' }}>
          {isRegister ? 'Create Your Account' : 'Welcome Back'}
        </h3>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid var(--danger)', color: '#fca5a5', padding: '10px', borderRadius: 'var(--radius-md)', marginBottom: '16px', fontSize: '0.85rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {isRegister && (
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Full Name</label>
              <input
                className="input-field"
                type="text"
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Email Address</label>
            <input
              className="input-field"
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Password</label>
            <input
              className="input-field"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {isRegister && (
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Account Type</label>
              <select
                className="input-field"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">Customer (Standard)</option>
                <option value="admin">Administrator (Store Owner)</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ padding: '12px', fontSize: '0.95rem', borderRadius: 'var(--radius-full)', marginTop: '8px' }}
          >
            {loading ? 'Please wait...' : (isRegister ? 'Create Account' : 'Sign In')}
          </button>
        </form>
      </div>
    </div>
  );
}
