import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, Minus, Plus, ChevronRight, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';

export default function Cart({ 
  items, 
  onUpdateQuantity, 
  onRemove 
}: { 
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}) {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-32 h-32 bg-surface-container rounded-full flex items-center justify-center text-on-surface-variant/20 shadow-inner"
        >
          <ShoppingBag size={64} />
        </motion.div>
        <div className="space-y-2">
          <h1 className="font-display text-4xl font-bold text-on-surface">Your cart is empty</h1>
          <p className="text-on-surface-variant max-w-xs mx-auto">Looks like you haven't added any sweetness to your cart yet.</p>
        </div>
        <Link 
          to="/menu" 
          className="px-10 py-4 bg-primary text-on-primary rounded-full font-bold shadow-soft-cocoa active:scale-95 transition-all text-lg"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-20 max-w-5xl mx-auto px-6">
      <div className="flex items-center gap-4 mb-12">
        <Link to="/menu" className="p-2 hover:bg-surface-container rounded-full transition-colors text-on-surface-variant">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-on-surface">Your Cart</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2 space-y-8">
          {items.map((item) => (
            <motion.div 
              layout
              key={item.id} 
              className="flex gap-6 p-6 glass-card rounded-[32px] border border-white/40 shadow-soft-cocoa group relative"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shrink-0 border border-outline-variant/10">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
              </div>
              <div className="flex-grow flex flex-col justify-between py-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-on-surface leading-tight">{item.name}</h3>
                    <p className="text-primary font-bold text-lg mt-1">₹{item.price}</p>
                  </div>
                  <button 
                    onClick={() => onRemove(item.id)}
                    className="p-2 text-on-surface-variant/40 hover:text-error hover:bg-error/5 rounded-full transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center bg-surface-container-high rounded-xl border border-outline-variant/20 p-1">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="p-1.5 hover:text-primary transition-colors disabled:opacity-20"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-10 text-center font-bold text-on-surface">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="p-1.5 hover:text-primary transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-50">Total</p>
                    <p className="font-display text-xl font-bold text-on-surface">₹{item.price * item.quantity}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="lg:sticky lg:top-32 space-y-6">
          <div className="p-8 glass-card rounded-[40px] border border-white/60 shadow-2xl space-y-8">
            <h2 className="font-display text-2xl font-bold text-on-surface">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-on-surface-variant font-medium">
                <span>Items Subtotal</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant font-medium">
                <span>Delivery</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/5 px-2 py-0.5 rounded-full border border-primary/10">Extra</span>
              </div>
              <div className="pt-4 border-t border-outline-variant/20 flex justify-between items-center text-on-surface">
                <span className="font-bold text-lg">Order Total</span>
                <span className="font-display text-3xl font-bold">₹{total}</span>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <div className="p-4 bg-primary/5 rounded-2xl border border-primary/20 flex items-center justify-between">
                <span className="text-xs font-bold text-primary uppercase tracking-widest">Payment Method</span>
                <span className="text-xs font-black text-on-surface">CASH ON DELIVERY</span>
              </div>
              
              <button 
                 onClick={() => {
                   const message = `FIFIBAKES Order:\n${items.map(i => `- ${i.name} x${i.quantity} (₹${i.price * i.quantity})`).join('\n')}\nTotal: ₹${total}\nPayment Method: Cash on Delivery\n\nI'd like to place this order!`;
                   window.open(`https://wa.me/919440823496?text=${encodeURIComponent(message)}`, '_blank');
                 }}
                 className="w-full py-5 bg-primary text-on-primary rounded-full font-bold shadow-soft-cocoa active:scale-95 transition-all hover:bg-primary-container flex items-center justify-center gap-3 text-lg"
              >
                Checkout on WhatsApp <ChevronRight size={20} />
              </button>
            </div>
            
            <p className="text-[10px] text-center font-bold text-on-surface-variant uppercase tracking-widest leading-relaxed">
              * Delivery charges will be added based on your location in Hyderabad
            </p>
          </div>
          
          <Link to="/menu" className="flex items-center justify-center gap-2 text-primary font-bold hover:gap-3 transition-all group">
            <ArrowLeft size={18} /> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
