import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import AuthModal from './components/AuthModal';
import OrdersModal from './components/OrdersModal';
import AdminPanel from './components/AdminPanel';

const CATEGORIES = [
  'All',
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Books',
  'Sports',
  'Beauty'
];

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // User & Auth State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('aura_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('aura_token') || '');

  // Modals & Drawers State
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  // Cart State
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('aura_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Save cart to local storage
  useEffect(() => {
    localStorage.setItem('aura_cart', JSON.stringify(cart));
  }, [cart]);

  // Fetch Products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = '/api/products?';
      if (searchTerm) url += `keyword=${encodeURIComponent(searchTerm)}&`;
      if (selectedCategory && selectedCategory !== 'All') url += `category=${encodeURIComponent(selectedCategory)}&`;

      const res = await fetch(url);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, selectedCategory]);

  // Seed DB handler
  const handleSeedDB = async () => {
    try {
      const res = await fetch('/api/products/seed', { method: 'POST' });
      const data = await res.json();
      alert(`Database successfully seeded with ${data.count || 8} demo products!`);
      fetchProducts();
    } catch (err) {
      alert('Error seeding database: ' + err.message);
    }
  };

  // Auth Handlers
  const handleLogin = async (credentials) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      const data = await res.json();
      if (!res.ok) return { error: data.message || 'Login failed' };

      setUser(data);
      setToken(data.token);
      localStorage.setItem('aura_user', JSON.stringify(data));
      localStorage.setItem('aura_token', data.token);
      return { success: true };
    } catch (err) {
      return { error: err.message };
    }
  };

  const handleRegister = async (userData) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await res.json();
      if (!res.ok) return { error: data.message || 'Registration failed' };

      setUser(data);
      setToken(data.token);
      localStorage.setItem('aura_user', JSON.stringify(data));
      localStorage.setItem('aura_token', data.token);
      return { success: true };
    } catch (err) {
      return { error: err.message };
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('aura_user');
    localStorage.removeItem('aura_token');
  };

  // Cart Operations
  const handleAddToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item._id === product._id);
      if (existing) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    setCartOpen(true);
  };

  const handleUpdateCartQty = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    setCart(cart.map(item => item._id === id ? { ...item, quantity: newQty } : item));
  };

  const handleRemoveCartItem = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  // Place Order Handler
  const handlePlaceOrder = async (orderData) => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });
      const data = await res.json();
      if (!res.ok) return { error: data.message || 'Failed to place order' };

      // Success
      setCart([]);
      localStorage.removeItem('aura_cart');
      alert(`🎉 Order Placed Successfully!\nOrder ID: #${data._id.slice(-8)}\nWe have sent details to your shipping address.`);
      fetchProducts();
      return { success: true };
    } catch (err) {
      return { error: err.message };
    }
  };

  // Review Handler
  const handleAddReview = async (productId, reviewData) => {
    try {
      const res = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(reviewData)
      });
      const data = await res.json();
      if (!res.ok) return { error: data.message || 'Failed to submit review' };

      fetchProducts();
      if (selectedProduct && selectedProduct._id === productId) {
        setSelectedProduct(data.product);
      }
      return { success: true };
    } catch (err) {
      return { error: err.message };
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation Header */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={CATEGORIES}
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        onOpenCart={() => setCartOpen(true)}
        user={user}
        onOpenAuth={() => setAuthOpen(true)}
        onLogout={handleLogout}
        onOpenOrders={() => setOrdersOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
        onSeedDB={handleSeedDB}
      />

      {/* Main Container */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '0 20px 60px', flex: 1 }}>
        
        {/* Hero Section */}
        {!searchTerm && selectedCategory === 'All' && (
          <HeroBanner onExplore={() => {
            const el = document.getElementById('catalog-grid');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }} />
        )}

        {/* Section Header */}
        <div id="catalog-grid" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', letterSpacing: '-0.5px' }}>
              {selectedCategory === 'All' ? 'Curated Products' : selectedCategory}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              {products.length} premium item{products.length === 1 ? '' : 's'} available
            </p>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
              <div key={n} className="glass-panel" style={{ height: '340px', borderRadius: 'var(--radius-lg)', opacity: 0.5 }} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="glass-panel" style={{ padding: '60px', textAlign: 'center', borderRadius: 'var(--radius-lg)' }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '12px' }}>🔍</span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '8px' }}>No Products Found</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Try clearing your search term or filtering by a different category.</p>
            <button className="btn btn-secondary" onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}>
              Reset Filters
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '28px' }}>
            {products.map(prod => (
              <ProductCard
                key={prod._id}
                product={prod}
                onSelect={(p) => setSelectedProduct(p)}
                onAddToCart={(p) => handleAddToCart(p, 1)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="glass-panel" style={{ borderRadius: '20px 20px 0 0', padding: '30px 20px', textAlign: 'center', marginTop: 'auto', borderTop: '1px solid var(--glass-border)' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
          © {new Date().getFullYear()} AURA E-Commerce Marketplace. Built with React & Node.js Express.
        </p>
      </footer>

      {/* Modals & Drawers */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        user={user}
        onAddReview={handleAddReview}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setCartOpen(false);
          if (!user) {
            setAuthOpen(true);
          } else {
            setCheckoutOpen(true);
          }
        }}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cart={cart}
        user={user}
        onPlaceOrder={handlePlaceOrder}
      />

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />

      <OrdersModal
        isOpen={ordersOpen}
        onClose={() => setOrdersOpen(false)}
        token={token}
      />

      <AdminPanel
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        products={products}
        token={token}
        onRefreshProducts={fetchProducts}
        onSeedDB={handleSeedDB}
      />
    </div>
  );
}
