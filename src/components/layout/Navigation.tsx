import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Instagram, 
  Mail, 
  Phone
} from 'lucide-react';
import { IMAGES } from '../../constants';

export const Navbar = ({ 
  cartCount, 
  user,
  onLogout,
  onAuthClick
}: { 
  cartCount: number; 
  user: any;
  onLogout: () => void;
  onAuthClick: (mode: 'login' | 'signup') => void;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Menu', href: '/menu' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Contact', href: '/contact' }
  ];

  const isLinkActive = (path: string) => location.pathname === path;

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'h-16 bg-surface/80 backdrop-blur-xl border-b border-white/20 shadow-soft-cocoa' : 'h-20 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary-fixed shrink-0 bg-primary-fixed-dim/20">
            <img alt="FIFIBAKES Logo" className="w-full h-full object-contain" src={IMAGES.logo} referrerPolicy="no-referrer" />
          </div>
          <span className="font-display text-xl md:text-2xl font-bold tracking-tighter text-primary">FIFIBAKES</span>
        </Link>

        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map(link => (
            <Link 
              key={link.name} 
              to={link.href} 
              className={`font-medium transition-colors ${isLinkActive(link.href) ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link 
            to="/cart"
            className={`relative p-2 active:scale-95 transition-transform ${isLinkActive('/cart') ? 'text-primary' : 'text-primary'}`}
          >
            <ShoppingBag size={24} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-on-primary text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          
          {user ? (
            <div className="hidden sm:flex items-center gap-4">
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-primary uppercase tracking-tighter opacity-70">Member</span>
                <span className="text-sm font-bold text-on-surface leading-tight">{user.name}</span>
              </div>
              <button 
                onClick={onLogout}
                className="px-5 py-2 bg-surface-container border border-outline-variant/30 text-on-surface-variant font-bold rounded-full hover:bg-surface-container-high active:scale-95 transition-all text-xs uppercase tracking-widest"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-4">
              <Link 
                to="/login"
                className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors"
              >
                Log In
              </Link>
              
              <Link 
                to="/signup"
                className="flex items-center gap-2 px-6 py-2.5 bg-primary text-on-primary font-bold rounded-full shadow-soft-cocoa hover:bg-primary/90 active:scale-95 transition-all text-sm shrink-0"
              >
                Sign Up
              </Link>
            </div>
          )}

          <button 
            className="md:hidden text-primary active:scale-95 transition-transform"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-surface border-b border-outline-variant/30 p-6 md:hidden shadow-xl"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map(link => (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  className={`text-lg font-medium transition-colors py-2 ${isLinkActive(link.href) ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="mt-4 pt-6 border-t border-outline-variant/30 flex flex-col gap-4">
                {user ? (
                  <>
                    <div className="flex flex-col px-1">
                      <span className="text-[10px] font-black text-primary uppercase tracking-tighter opacity-70">Member</span>
                      <span className="text-xl font-bold text-on-surface">{user.name}</span>
                    </div>
                    <button 
                      onClick={() => {
                        onLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full py-3.5 bg-surface-container border border-outline-variant/30 text-on-surface-variant font-bold rounded-2xl hover:bg-surface-container-high active:scale-95 transition-all text-sm uppercase tracking-widest"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full py-3 text-lg font-bold text-on-surface-variant hover:text-primary transition-colors text-left px-1"
                    >
                      Log In
                    </Link>
                    <Link 
                      to="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full py-4 bg-primary text-on-primary font-bold rounded-2xl shadow-soft-cocoa hover:bg-primary/90 active:scale-95 transition-all text-center"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/20 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-12 text-center">
        <div className="flex items-center gap-3">
          <img 
            src="https://i.ibb.co/1fKZNkTp/Whats-App-Image-2026-05-11-at-9-11-38-PM.jpg" 
            alt="FIFIBAKES Icon" 
            className="w-12 h-12 rounded-full object-cover shadow-soft-cocoa border-2 border-primary"
            referrerPolicy="no-referrer"
          />
          <span className="font-display text-3xl font-bold text-primary">FIFIBAKES</span>
        </div>
        
        <nav className="flex flex-wrap justify-center gap-x-12 gap-y-6">
          {[
            { name: 'Menu', href: '/menu' },
            { name: 'Gallery', href: '/gallery' },
            { name: 'Reviews', href: '/reviews' },
            { name: 'Contact', href: '/contact' }
          ].map(link => (
            <Link 
              key={link.name} 
              to={link.href} 
              className="text-on-surface-variant hover:text-primary font-bold uppercase tracking-widest text-sm transition-all"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-8">
            <a href="https://instagram.com/fifibakesss" target="_blank" rel="noreferrer" className="text-secondary hover:text-primary transition-colors transform hover:scale-110 duration-200">
              <Instagram size={28} />
            </a>
            <button className="text-secondary hover:text-primary transition-colors transform hover:scale-110 duration-200">
              <Mail size={28} />
            </button>
            <a href="tel:+919440823496" className="text-secondary hover:text-primary transition-colors transform hover:scale-110 duration-200">
              <Phone size={28} />
            </a>
          </div>
          <div className="flex items-center gap-2 bg-primary/5 px-4 py-1.5 rounded-full border border-primary/10">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Cash on Delivery Available</span>
          </div>
        </div>

        <div className="w-full max-w-lg h-px bg-outline-variant/30"></div>
        
        <p className="text-sm font-medium text-secondary/60 italic">
          © 2024 FIFIBAKES. Baked with love and a sprinkle of magic.
        </p>
      </div>
    </footer>
  );
};
