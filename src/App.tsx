import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';

// Layout
import { Layout } from './components/layout/Layout';

// Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import Gallery from './pages/Gallery';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import AuthPage from './pages/AuthPage';

// Types
import { Product, CartItem } from './types';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState<any>(null);

  // Authentication sync
  useEffect(() => {
    const checkSession = () => {
      const session = localStorage.getItem('fifibakes_session');
      if (session) {
        setUser(JSON.parse(session));
      } else {
        setUser(null);
      }
    };

    checkSession();
    window.addEventListener('authChange', checkSession);
    return () => window.removeEventListener('authChange', checkSession);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('fifibakes_session');
    window.dispatchEvent(new Event('authChange'));
  };

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
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Auth Routes - No Layout */}
          <Route path="/login" element={user ? <Navigate to="/" /> : <AuthPage />} />
          <Route path="/signup" element={user ? <Navigate to="/" /> : <AuthPage />} />

          {/* App Routes - With Layout */}
          <Route element={
            <Layout 
              cartCount={cartCount} 
              user={user} 
              onLogout={handleLogout} 
            />
          }>
            <Route index element={<Home onAddToCart={handleAddToCart} />} />
            <Route path="menu" element={<Menu onAddToCart={handleAddToCart} />} />
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
