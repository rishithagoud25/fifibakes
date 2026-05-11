import { motion } from 'motion/react';
import { IMAGES } from '../constants';

export default function Gallery() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-4 mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-5xl md:text-7xl font-bold text-on-surface"
        >
          Our Gallery
        </motion.h1>
        <p className="text-on-surface-variant max-w-2xl mx-auto text-lg italic">
          A glimpse into our kitchen and the sweet moments we create.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {IMAGES.gallery.map((img, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="break-inside-avoid relative group rounded-3xl overflow-hidden shadow-soft-cocoa border border-white/20"
            >
              <img 
                src={img} 
                alt={`Gallery ${idx}`} 
                className="w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
