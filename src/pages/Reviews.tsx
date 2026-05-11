import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

const reviews = [
  { name: "Rishitha", role: "Loyal Fan", msg: "Every slice tells a story of passion and perfection. It's not just a dessert; it's a memory made sweet. ❤️", color: "bg-primary-fixed" },
  { name: "Hema", role: "Brownie Addict", msg: "So fudgy I accidentally bit my own finger once. Worth the tears—these brownies are literally dangerous! 😂", color: "bg-secondary-fixed" },
  { name: "Sharanya", role: "Family Patron", msg: "FIFIBAKES has become a tradition in our home. Your treats bring so much warmth to our little celebrations. ✨", color: "bg-tertiary-fixed" },
  { name: "Jahnavi", role: "Connoisseur", msg: "The love and care put into these treats is evident in every bite. Truly the best comfort food I've ever had. 🌸", color: "bg-primary-fixed-dim" },
  { name: "Anshu", role: "Gift Giver", msg: "From the beautiful packaging to the very last crumb, everything is handled with so much grace and heart. 🎀", color: "bg-secondary-fixed-dim" }
];

export default function Reviews() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-4 mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-5xl md:text-7xl font-bold text-on-surface"
        >
          Sweet Love
        </motion.h1>
        <p className="text-on-surface-variant max-w-2xl mx-auto text-lg italic">
          Short & sweet stories from our lovely community.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card p-8 rounded-[40px] shadow-soft-cocoa border border-white/40 relative group hover:-translate-y-1 transition-all duration-300 ${i % 2 !== 0 ? 'md:translate-y-6' : ''}`}
            >
              <Heart className="absolute -top-3 -right-3 text-primary fill-primary p-2 w-10 h-10 bg-white rounded-full shadow-lg transform group-hover:scale-110 transition-transform" />
              <p className="text-lg italic text-on-surface mb-8 leading-relaxed font-medium">"{rev.msg}"</p>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${rev.color} flex items-center justify-center font-bold text-primary text-lg shadow-inner border-2 border-white/50`}>
                  {rev.name[0]}
                </div>
                <div>
                  <p className="font-bold text-base text-on-surface leading-tight">{rev.name}</p>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60">{rev.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
