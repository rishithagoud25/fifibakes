import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';

// Layout
import { Layout } from './components/layout/Layout';

// Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import Gallery from './pages/Gallery';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import Cart from './pages/Cart';


// Types
import { Product, CartItem } from './types';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);



  // Cart logic
  useEffect(() => {
    // Load cart from localStorage if exists
    const savedCart = localStorage.getItem('fifibakes_cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    setCartCount(cartItems.reduce((sum, item) => sum + item.quantity, 0));
    localStorage.setItem('fifibakes_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <Router>
      <ScrollToTop />

      <AnimatePresence mode="wait">
        <Routes>

          {/* App Routes - With Layout */}
          <Route element={
            <Layout
              cartCount={cartCount}

            />
          }>
            <Route
              index
              element={
                <Home
                  onAddToCart={handleAddToCart}
                  cartItems={cartItems}
                  onUpdateQuantity={updateQuantity}
                />
              }
            />
            <Route
              path="menu"
              element={
                <Menu
                  onAddToCart={handleAddToCart}
                  cartItems={cartItems}
                  onUpdateQuantity={updateQuantity}
                />
              }
            />
            <Route path="gallery" element={<Gallery />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="contact" element={<Contact />} />
            <Route path="cart" element={
              <Cart
                items={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            } />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}
