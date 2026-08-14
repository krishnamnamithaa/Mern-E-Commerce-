import React, { useState } from 'react';

export default function AdminPanel({ isOpen, onClose, products, token, onRefreshProducts, onSeedDB }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('10');
  const [imageUrl, setImageUrl] = useState('');
  const [brand, setBrand] = useState('');
  const [msg, setMsg] = useState('');

  if (!isOpen) return null;

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          price: Number(price),
          category,
          description,
          stock: Number(stock),
          brand,
          images: [{ public_id: 'prod_' + Date.now(), url: imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80' }]
        })
      });

      const data = await res.json();
      if (res.ok) {
        setMsg('Product created successfully!');
        setName(''); setPrice(''); setDescription(''); setImageUrl(''); setBrand('');
        setShowAddForm(false);
        onRefreshProducts();
      } else {
        setMsg(data.message || 'Error adding product');
      }
    } catch (err) {
      setMsg(err.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      onRefreshProducts();
    } catch (err) {
      console.error(err);
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

        <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer' }}>
          ✕
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px' }}>
            ⚙️ Store Admin Dashboard
          </h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-secondary" onClick={onSeedDB} style={{ fontSize: '0.82rem' }}>
              🌱 Seed Database
            </button>
            <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)} style={{ fontSize: '0.85rem' }}>
              {showAddForm ? 'Close Form' : '+ Add New Product'}
            </button>
          </div>
        </div>

        {msg && <div style={{ color: 'var(--success)', marginBottom: '16px', fontSize: '0.9rem' }}>{msg}</div>}

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Products</span>
            <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--primary)' }}>{products.length}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Categories</span>
            <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--accent)' }}>
              {new Set(products.map(p => p.category)).size}
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Store Status</span>
            <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--success)' }}>Active • Live</div>
          </div>
        </div>

        {/* Add Product Form */}
        {showAddForm && (
          <form onSubmit={handleAddProduct} style={{ background: 'rgba(255,255,255,0.04)', padding: '20px', borderRadius: 'var(--radius-md)', marginBottom: '24px', border: '1px solid var(--glass-border)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <h3 style={{ gridColumn: 'span 2', fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px' }}>Add Product Details</h3>
            <input className="input-field" placeholder="Product Name *" value={name} onChange={e => setName(e.target.value)} required />
            <input className="input-field" placeholder="Price ($) *" type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} required />
            <select className="input-field" value={category} onChange={e => setCategory(e.target.value)}>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
              <option value="Home & Garden">Home & Garden</option>
              <option value="Sports">Sports</option>
              <option value="Beauty">Beauty</option>
            </select>
            <input className="input-field" placeholder="Brand Name" value={brand} onChange={e => setBrand(e.target.value)} />
            <input className="input-field" placeholder="Stock Quantity" type="number" value={stock} onChange={e => setStock(e.target.value)} />
            <input className="input-field" placeholder="Image URL (Unsplash/Direct)" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
            <textarea className="input-field" placeholder="Description *" rows={2} style={{ gridColumn: 'span 2' }} value={description} onChange={e => setDescription(e.target.value)} required />
            
            <button className="btn btn-primary" type="submit" style={{ gridColumn: 'span 2', padding: '10px' }}>
              Create Product
            </button>
          </form>
        )}

        {/* Product Inventory Table */}
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '12px' }}>Inventory List</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {products.map(p => (
            <div key={p._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={(p.images && p.images[0]) ? p.images[0].url : ''} alt={p.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>{p.name}</div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.category} • ${p.price} • Stock: {p.stock}</span>
                </div>
              </div>
              <button onClick={() => handleDeleteProduct(p._id)} style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: '1.1rem' }} title="Delete">
                🗑️
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
