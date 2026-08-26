import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from './Navigation';
import { motion } from 'motion/react';

export const Layout = ({ 
  cartCount
}: { 
  cartCount: number 
}) => {
  return (
    <div className="min-h-screen flex flex-col paper-texture">
      <Navbar 
        cartCount={cartCount}  
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
