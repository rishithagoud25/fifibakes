import { motion } from 'motion/react';
import { Phone, Mail, ChevronRight } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';

export default function Contact() {
  return (
    <div className="py-12 md:py-20">
      <section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-10">
          <div className="space-y-4 text-center lg:text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-5xl md:text-7xl font-bold text-on-surface"
            >
              Contact Us
            </motion.h1>
            <p className="text-xl text-on-surface-variant leading-relaxed max-w-lg mx-auto lg:mx-0">
              Ordering your bliss is just a few clicks away. We deliver across Hyderabad with care and love.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-4">
            <a href= "https://instagram.com/fiascookedfr" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-3 p-6 glass-card rounded-3xl group transition-all hover:bg-primary/5">
              <FaInstagram size={32} className="text-primary" />
              <span className="font-bold text-sm tracking-tight">Instagram</span>
            </a>
            <a href="tel:+919440823496" className="flex flex-col items-center gap-3 p-6 glass-card rounded-3xl group transition-all hover:bg-primary/5">
              <Phone size={32} className="text-primary" />
              <span className="font-bold text-sm tracking-tight">Call Us</span>
            </a>
            <button className="flex flex-col items-center gap-3 p-6 glass-card rounded-3xl group transition-all hover:bg-primary/5">
              <Mail size={32} className="text-primary" />
              <span className="font-bold text-sm tracking-tight">Email</span>
            </button>
          </div>

          <div className="space-y-8 pt-6 border-t border-outline-variant/20">
            <h3 className="font-display text-3xl font-bold text-secondary">How to Order</h3>
            {[
              { n: 1, t: "Pick Your Treats", d: "Browse our menu and add your favorites to the cart." },
              { n: 2, t: "Choose Delivery", d: "We offer same-day delivery for orders before 2 PM." },
              { n: 3, t: "Enjoy Bliss", d: "Unbox the happiness and dive in!" }
            ].map((step) => (
              <div key={step.n} className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold shrink-0 shadow-lg text-lg">
                  {step.n}
                </div>
                <div className="space-y-1">
                  <h4 className="font-display text-2xl font-bold text-on-surface leading-tight">{step.t}</h4>
                  <p className="text-on-surface-variant leading-relaxed text-lg">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-10 md:p-14 rounded-[50px] shadow-2xl border border-white/60 mt-12 lg:mt-0"
        >
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="font-display text-4xl font-bold text-primary">Ordering Info</h2>
              <p className="text-on-surface-variant font-medium">Send us a message for queries or custom cakes.</p>
            </div>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest flex items-center gap-2 ml-1">
                  Your Name
                </label>
                <input 
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl p-4 focus:ring-2 focus:ring-primary focus:outline-none transition-all placeholder:text-on-surface-variant/40" 
                  placeholder="Tell us who you are" 
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest flex items-center gap-2 ml-1">
                  Your Message
                </label>
                <textarea 
                  rows={4}
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl p-4 focus:ring-2 focus:ring-primary focus:outline-none transition-all placeholder:text-on-surface-variant/40 resize-none" 
                  placeholder="What's on your mind? Custom cake designs, special requests..." 
                />
              </div>
              <div className="pt-4">
                <button 
                  onClick={() => window.open('https://wa.me/919440823496', '_blank')}
                  className="w-full py-5 bg-primary text-on-primary rounded-full font-bold shadow-soft-cocoa active:scale-95 transition-all hover:bg-primary-container flex items-center justify-center gap-3 text-lg"
                >
                  Message on WhatsApp <ChevronRight size={20} />
                </button>
              </div>
              <div className="text-center space-y-2 bg-primary/5 p-6 rounded-3xl border border-primary/10">
                <p className="text-sm font-bold text-primary italic">"Quality takes time. We bake everything fresh just for you!"</p>
                <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest">Delivering in Hyderabad City Only</p>
              </div>
            </form>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
