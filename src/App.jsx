import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import products from './data/products';
import categories from './data/categories';
import './styles.css';

export default function App() {
  const [cart, setCart] = useState(() =>
    JSON.parse(localStorage.getItem('zm_cart') || '[]')
  );
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  function saveCart(next) {
    setCart(next);
    localStorage.setItem('zm_cart', JSON.stringify(next));
  }

  function addToCart(product, qty = 1) {
    const found = cart.find((i) => i.id === product.id);
    if (found) {
      saveCart(
        cart.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + qty } : i
        )
      );
    } else {
      saveCart([...cart, { ...product, qty }]);
    }
  }

  function updateQty(id, qty) {
    saveCart(cart.map((i) => (i.id === id ? { ...i, qty } : i)));
  }

  function removeItem(id) {
    saveCart(cart.filter((i) => i.id !== id));
  }

  function clearCart() {
    saveCart([]);
  }

  function handleSearch(e) {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/category/${searchTerm.toLowerCase()}`);
    }
  }

  return (
    <div>
      <div className="container">
        <header className="header">
          <div className="logo">
            <img src="/images/logo.png" alt="Zebra Mart" />
            <div style={{ fontWeight: 800 }}>Zebra Mart</div>
          </div>

          <form className="search" onSubmit={handleSearch}>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for vegetables, snacks..."
            />
          </form>

          <div>
            <button className="btn" onClick={() => navigate('/cart')}>
              Cart ({cart.reduce((s, i) => s + i.qty, 0)})
            </button>
          </div>
        </header>

        {/* Categories Section */}
        <div className="categories-wrapper">
          <div className="categories">
            {categories.map((c) => (
              <div key={c.id} className="cat">
                <Link to={`/category/${c.slug}`}>{c.name}</Link>
              </div>
            ))}
          </div>
        </div>

        <Routes>
          <Route
            path="/"
            element={<Home products={products} addToCart={addToCart} />}
          />
          <Route
            path="/category/:slug"
            element={
              <CategoryPage products={products} addToCart={addToCart} />
            }
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
        </Routes>
      </div>

      <button
        className="cart-btn"
        onClick={() => (window.location = '/cart')}
      >
        Cart ({cart.reduce((s, i) => s + i.qty, 0)})
      </button>
    </div>
  );
}
