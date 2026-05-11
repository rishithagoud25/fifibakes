import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from './Navigation';
import { motion } from 'motion/react';

export const Layout = ({ 
  cartCount, 
  user, 
  onLogout 
}: { 
  cartCount: number; 
  user: any; 
  onLogout: () => void 
}) => {
  return (
    <div className="min-h-screen flex flex-col paper-texture">
      <Navbar 
        cartCount={cartCount} 
        user={user} 
        onLogout={onLogout} 
        onAuthClick={() => {}} // Not strictly used for link-based navigation
      />
      <main className="flex-grow pt-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};
