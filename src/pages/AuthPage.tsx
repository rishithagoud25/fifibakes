import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  ArrowLeft, 
  Chrome, 
  User, 
  ChevronRight,
  Eye,
  EyeOff
} from 'lucide-react';

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.pathname === '/login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    setIsLogin(location.pathname === '/login');
    setError(null);
  }, [location.pathname]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('fifibakes_users') || '[]');

      if (isLogin) {
        const user = users.find((u: any) => u.email === email && u.password === password);
        if (user) {
          localStorage.setItem('fifibakes_session', JSON.stringify({ email: user.email, name: user.fullName }));
          window.dispatchEvent(new Event('authChange'));
          setIsLoading(false);
          navigate('/');
        } else {
          setError('Invalid email or password. Please try again.');
          setIsLoading(false);
        }
      } else {
        if (password !== confirmPassword) {
          setError('Passwords do not match.');
          setIsLoading(false);
          return;
        }
        if (users.some((u: any) => u.email === email)) {
          setError('An account with this email already exists.');
          setIsLoading(false);
          return;
        }

        const newUser = { fullName, email, password };
        users.push(newUser);
        localStorage.setItem('fifibakes_users', JSON.stringify(users));
        localStorage.setItem('fifibakes_session', JSON.stringify({ email: newUser.email, name: newUser.fullName }));
        
        window.dispatchEvent(new Event('authChange'));
        setIsLoading(false);
        navigate('/');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen py-12 px-4 flex items-center justify-center bg-gradient-to-br from-surface to-primary-fixed/5">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-5xl bg-surface rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[650px] border border-white/40"
      >
        {/* Visual Sidebar */}
        <div className="hidden md:block w-5/12 relative bg-primary-fixed overflow-hidden">
          <img 
            src="https://lh3.googleusercontent.com/aida/ADBb0ujO1owDIAMfkRhBXVhYX6sng8c31we6EjXwN1PpXKlFxL41C2uza4BsDpjdFccTCNBsG-8crLok8qG6g3qSM1aUVLvdd-CC7z0i4PBiuXRcUPyvKQMigQlGeoFD5CZUKm-kVrz_4By4L5uTOBUByCNkBOjFMKTbjGRSNNKDLYFTbwDWjdBzZ4_6AKe6wtyRUkYhdSv8XrXMxplRy4nkEwHDX_Np8eijwhs0i70av41rXReCJCiULJSeP1SRjaiiR3Q63V8N8jhB1A"
            className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay"
            alt="Bakery Visual"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent flex flex-col justify-end p-12 text-on-primary">
            <h2 className="font-display text-5xl font-bold leading-tight">Welcome <br/>to FIFIBAKES</h2>
            <p className="mt-4 text-on-primary/80 text-xl font-medium">Baking moments of pure sweetness for you.</p>
          </div>
          
          <Link 
            to="/"
            className="absolute top-8 left-8 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
        </div>

        {/* Form Content */}
        <div className="flex-1 p-8 md:p-16 flex flex-col bg-surface overflow-y-auto">
          <div className="md:hidden flex justify-between items-center mb-8">
            <Link to="/" className="p-2 text-on-surface-variant"><ArrowLeft size={24} /></Link>
            <span className="font-display font-bold text-primary uppercase tracking-tighter text-xl">FIFIBAKES</span>
          </div>

          <div className="mb-6">
            <h1 className="font-display text-4xl font-bold text-on-surface mb-2">
              {isLogin ? 'Log In' : 'Create Account'}
            </h1>
            <p className="text-on-surface-variant font-medium">
              {isLogin ? 'Enter your credentials to access your bliss' : 'Join our sweet community for exclusive treats'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mb-8 p-5 bg-error/10 border border-error/20 rounded-3xl flex items-center gap-3 text-error text-sm font-bold"
              >
                <Lock size={18} />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface-variant ml-1 uppercase tracking-widest">Full Name</label>
                <div className="relative group">
                  <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors" />
                  <input 
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="E.g. Jane Doe"
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl py-4 pl-14 pr-6 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface-variant ml-1 uppercase tracking-widest">Email Address</label>
              <div className="relative group">
                <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors" />
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hello@bakery.com"
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl py-4 pl-14 pr-6 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Password</label>
                {isLogin && (
                  <button type="button" className="text-[10px] text-primary font-black uppercase tracking-[0.2em] hover:underline">Forgot password?</button>
                )}
              </div>
              <div className="relative group">
                <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors" />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl py-4 pl-14 pr-14 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface-variant ml-1 uppercase tracking-widest">Confirm Password</label>
                <div className="relative group">
                  <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors" />
                  <input 
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl py-4 pl-14 pr-6 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                  />
                </div>
              </div>
            )}

            <button 
              disabled={isLoading}
              className="w-full py-5 bg-primary text-on-primary rounded-2xl font-bold shadow-soft-cocoa hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 mt-4 text-lg"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Log In' : 'Create Account'}
                  <ChevronRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="relative my-8 flex items-center">
            <div className="flex-grow border-t border-outline-variant/30"></div>
            <span className="px-6 text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.3em] bg-surface">Or continue with</span>
            <div className="flex-grow border-t border-outline-variant/30"></div>
          </div>

          <button className="w-full py-4 bg-surface-container-high border border-outline-variant/30 rounded-2xl font-bold flex items-center justify-center gap-4 hover:bg-surface-container-highest transition-colors active:scale-[0.98] text-sm">
            <Chrome size={22} className="text-[#4285F4]" />
            Continue with Google
          </button>

          <p className="mt-auto pt-10 text-center text-sm font-medium text-on-surface-variant">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <Link 
              to={isLogin ? '/signup' : '/login'}
              className="text-primary font-black uppercase tracking-widest text-xs hover:underline ml-1"
            >
              {isLogin ? 'Join FIFIBAKES' : 'Log in here'}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
