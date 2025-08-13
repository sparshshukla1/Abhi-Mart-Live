import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import Home from './pages/Home.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import CartPage from './pages/CartPage.jsx';
import Checkout from './pages/Checkout.jsx';
import OrderSuccess from './pages/OrderSuccess.jsx';
import products from './data/products.js';
import categories from './data/categories.js';
import './styles.css';

function SearchResults({ addToCart }) {
  const { query } = useParams();
  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="products">
      <h2>Search Results for "{query}"</h2>
      {filtered.length > 0 ? (
        <div className="product-grid">
          {filtered.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} />
              <h4>{product.title}</h4>
              <p>₹{product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState(() =>
    JSON.parse(localStorage.getItem('zm_cart') || '[]')
  );
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  function saveCart(next) {
    setCart(next);
    localStorage.setItem('zm_cart', JSON.stringify(next));
  }
  function addToCart(product, qty = 1) {
    const found = cart.find(i => i.id === product.id);
    if (found) {
      saveCart(
        cart.map(i =>
          i.id === product.id ? { ...i, qty: i.qty + qty } : i
        )
      );
    } else {
      saveCart([...cart, { ...product, qty }]);
    }
  }
  function updateQty(id, qty) {
    saveCart(cart.map(i => (i.id === id ? { ...i, qty } : i)));
  }
  function removeItem(id) {
    saveCart(cart.filter(i => i.id !== id));
  }
  function clearCart() {
    saveCart([]);
  }

  function handleSearch(e) {
    if (e.key === 'Enter' && searchTerm.trim() !== '') {
      navigate(`/search/${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  }

  return (
    <div>
      <div className="container">
        <header className="header">
          <div className="logo">
            <img src="/images/logo.png" alt="Abhi Mart" />
            <div style={{ fontWeight: 800 }}>Abhi Mart</div>
          </div>

          {/* Search Bar */}
          <div className="search">
            <input
              placeholder="Search for vegetables, snacks..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>

          <div className="cart-header-btn">
            <button className="btn" onClick={() => navigate('/cart')}>
              Cart ({cart.reduce((s, i) => s + i.qty, 0)})
            </button>
          </div>
        </header>

        {/* Categories */}
        <div className="categories">
          {categories.map(c => (
            <div key={c.id} className="cat">
              <Link to={`/category/${c.slug}`}>{c.name}</Link>
            </div>
          ))}
        </div>

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={<Home products={products} addToCart={addToCart} />}
          />
          <Route
            path="/category/:slug"
            element={<CategoryPage products={products} addToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                updateQty={updateQty}
                removeItem={removeItem}
              />
            }
          />
          <Route
            path="/checkout"
            element={<Checkout cart={cart} clearCart={clearCart} />}
          />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route
            path="/search/:query"
            element={<SearchResults addToCart={addToCart} />}
          />
        </Routes>
      </div>

      {/* Floating Cart Button for Mobile */}
      <button
        className="cart-btn"
        onClick={() => window.location.assign('/cart')}
      >
        Cart ({cart.reduce((s, i) => s + i.qty, 0)})
      </button>
    </div>
  );
}
