import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Clock,
  Minus,
  Plus
} from 'lucide-react';
import { IMAGES } from '../constants';
import { StarRating } from '../components/StarRating';

export default function Home({
  onAddToCart,
  cartItems,
  onUpdateQuantity
}: {
  onAddToCart: (product: any) => void;
  cartItems: any[];
  onUpdateQuantity: (id: number, delta: number) => void;
}) {
  const featuredProducts = IMAGES.products.slice(0, 3);

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-surface via-primary-fixed/30 to-tertiary-fixed/30">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 items-center gap-12 relative z-10 w-full h-full py-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6 md:space-y-8 text-center lg:text-left"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-fixed-dim text-on-primary-fixed font-bold text-xs uppercase tracking-widest">
              ESTD 2024
            </span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-[84px] leading-[0.95] text-on-surface font-bold">
              Bite Into <span className="text-primary italic">Bliss</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-lg mx-auto lg:mx-0">
              Experience the magic of premium desserts, crafted with the finest ingredients and a touch of love. Happiness in every bite.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link to="/menu" className="px-8 py-4 bg-primary text-on-primary rounded-full font-bold shadow-soft-cocoa active:scale-95 transition-all hover:bg-primary-container">
                Order Now
              </Link>
              <Link to="/menu" className="px-8 py-4 bg-surface-container-low text-on-secondary-container border border-outline-variant/30 rounded-full font-bold active:scale-95 transition-all hover:bg-surface-container">
                Explore Menu
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 2 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[350px] md:h-[500px] flex items-center justify-center mt-12 lg:mt-0"
          >
            <div className="absolute inset-0 bg-white/30 backdrop-blur-md rounded-[40px] -rotate-6 border border-white/40 shadow-2xl"></div>
            <img 
              alt="FIFIBAKES Signature Treat" 
              className="relative z-10 w-full h-full object-cover rounded-[32px] shadow-soft-cocoa" 
              src={IMAGES.hero} 
              referrerPolicy="no-referrer"
            />
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 md:top-10 md:-right-4 bg-white/90 backdrop-blur px-5 py-4 rounded-3xl shadow-2xl border border-white z-20 flex flex-col items-center gap-1"
            >
              <Heart className="fill-primary text-primary" size={24} />
              <span className="text-[10px] font-bold text-on-surface uppercase tracking-tighter">Bestseller</span>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-primary-fixed opacity-30 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-tertiary-fixed opacity-30 rounded-full blur-[100px] pointer-events-none"></div>
      </section>

      {/* Featured Section */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-4">
              <h2 className="font-display text-4xl font-bold text-on-surface">Weekly Favorites</h2>
              <p className="text-on-surface-variant max-w-md">Our most loved treats this week. Handpicked for you to indulge.</p>
            </div>
            <Link to="/menu" className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all group">
              View Full Menu <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-4 rounded-3xl shadow-soft-cocoa border border-white/40 group hover:-translate-y-2 transition-all duration-300"
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-5">
                  <img 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    src={product.image} 
                    referrerPolicy="no-referrer"
                  />
                  {product.tag && (
                    <span className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                      {product.tag}
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-display text-xl font-bold text-on-surface leading-tight">{product.name}</h3>
                  <span className="font-display text-xl font-bold text-primary">₹{product.price}</span>
                </div>
                <div className="flex items-center gap-2 mb-6">
                  <StarRating rating={product.rating} />
                  <span className="text-xs font-bold text-on-surface-variant">({product.reviews})</span>
                </div>
                {(() => {
  const cartItem = cartItems.find(
    item => item.id === product.id
  );

  const quantity = cartItem?.quantity || 0;

  return quantity === 0 ? (
    <button
      onClick={() => onAddToCart(product)}
      className="w-full py-4 bg-[#4d3b3b] text-white rounded-2xl font-bold active:scale-95 transition-all hover:bg-[#3d2f2f] flex items-center justify-center gap-2"
    >
      <ShoppingBag size={18} />
      Add to Cart
    </button>
  ) : (
    <div className="w-full py-2 bg-[#4d3b3b] text-white rounded-2xl flex items-center justify-between px-3">

      <button
        onClick={() => onUpdateQuantity(product.id, -1)}
        className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-90 transition-all"
      >
        <Minus size={18} />
      </button>

      <span className="text-lg font-bold min-w-[30px] text-center">
        {quantity}
      </span>

      <button
        onClick={() => onUpdateQuantity(product.id, 1)}
        className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-90 transition-all"
      >
        <Plus size={18} />
      </button>

    </div>
  );
})()}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro/About Preview */}
      <section className="py-24 bg-background overflow-hidden border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <motion.div 
              whileInView={{ opacity: 1, y: 0, rotate: -4 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              className="pt-12"
            >
              <div className="bg-white p-4 rounded-2xl shadow-soft-cocoa">
                <img 
                  alt="Baker in action" 
                  className="w-full aspect-square object-cover rounded-xl" 
                  src={IMAGES.about1} 
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
            <motion.div 
              whileInView={{ opacity: 1, y: 0, rotate: 6 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
            >
              <div className="bg-white p-4 rounded-2xl shadow-soft-cocoa">
                <img 
                  alt="Ingredients" 
                  className="w-full aspect-square object-cover rounded-xl" 
                  src={IMAGES.about2} 
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="font-display text-4xl leading-tight text-primary font-bold">Crafted with love... <br/>happiness in every bite.</h2>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              At FIFIBAKES, we believe that a dessert is more than just food—it's a ritual. Born from a passion for delicate textures and rich flavors, every brownie and cake is baked in small batches to ensure perfection.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container">
                <Sparkles className="text-primary shrink-0" size={28} />
                <p className="text-sm font-medium text-on-surface">Artisanal small-batch baking</p>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container">
                <CheckCircle2 className="text-primary shrink-0" size={28} />
                <p className="text-sm font-medium text-on-surface">100% Vegetarian & Premium Ingredients</p>
              </div>
            </div>
            <Link to="/contact" className="inline-block px-8 py-4 bg-primary text-on-primary rounded-full font-bold shadow-soft-cocoa active:scale-95 transition-all">
              Our Story
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-primary-fixed-dim rounded-[50px] p-12 md:p-24 text-center space-y-8 relative overflow-hidden"
          >
            <div className="relative z-10 space-y-6">
              <h2 className="font-display text-4xl md:text-6xl font-bold text-on-primary-fixed leading-tight">Ready to satisfy <br/>your cravings?</h2>
              <p className="text-xl text-on-primary-fixed-variant max-w-xl mx-auto">Order now and experience the taste of handmade perfection delivered to your doorstep.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/menu" className="px-10 py-5 bg-primary text-on-primary rounded-full font-bold shadow-2xl active:scale-95 transition-all text-lg">
                  Order Now
                </Link>
                <Link to="/contact" className="px-10 py-5 bg-white text-primary rounded-full font-bold shadow-2xl active:scale-95 transition-all text-lg border border-primary/10">
                  Contact Us
                </Link>
              </div>
            </div>
            <Sparkles className="absolute top-10 right-10 text-primary opacity-20" size={120} />
            <Heart className="absolute bottom-10 left-10 text-primary opacity-20" size={80} />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
