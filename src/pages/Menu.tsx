import { motion } from 'motion/react';
import { ShoppingBag, Instagram, Star, Minus, Plus } from 'lucide-react';
import { IMAGES } from '../constants';

export default function Menu({
  onAddToCart,
  cartItems,
  onUpdateQuantity
}: {
  onAddToCart: (product: any) => void;
  cartItems: any[];
  onUpdateQuantity: (id: number, delta: number) => void;
}) {
  return (
    <div className="py-12 md:py-20 space-y-16">

      {/* Page Heading */}
      <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-5xl md:text-7xl font-bold text-on-surface"
        >
          Our Menu
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto"
        >
          Explore our collection of handcrafted desserts. Each piece is baked
          with precision and premium ingredients.
        </motion.p>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">

          {IMAGES.products.map((product, idx) => {

            // Find this product in the cart
            const cartItem = cartItems.find(
              item => item.id === product.id
            );

            const quantity = cartItem?.quantity || 0;

            {
              quantity === 0 ? (
                <button onClick={() => onAddToCart(product)}>
                  Add to Cart
                </button>
              ) : (
              <div>
                <button onClick={() => onUpdateQuantity(product.id, -1)}>
                  <Minus size={20} />
                </button>

                <span>{quantity}</span>

                <button onClick={() => onUpdateQuantity(product.id, 1)}>
                  <Plus size={20} />
                </button>
              </div>
            )
            }

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="glass-card p-4 rounded-[40px] shadow-soft-cocoa border border-white/40 group hover:-translate-y-2 transition-all duration-300 flex flex-col h-full bg-white/50 backdrop-blur-sm"
              >

                {/* Product Image */}
                <div className="relative overflow-hidden rounded-[32px] aspect-[4/3] mb-6">
                  <img
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src={product.image}
                    referrerPolicy="no-referrer"
                  />

                  {product.tag && (
                    <span className="absolute top-5 left-5 bg-primary text-on-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                      {product.tag}
                    </span>
                  )}
                </div>

                {/* Custom Cake Samples */}
                {product.id === 8 && IMAGES.customSamples && (
                  <div className="flex gap-2 mb-6 overflow-x-auto pb-2 px-1">
                    {IMAGES.customSamples.map((sample, sIdx) => (
                      <img
                        key={sIdx}
                        src={sample}
                        alt="Custom sample"
                        className="w-20 h-20 rounded-2xl object-cover border-2 border-primary/20 shrink-0 shadow-sm"
                        referrerPolicy="no-referrer"
                      />
                    ))}
                  </div>
                )}

                <div className="px-2 pb-2 flex flex-col flex-grow">

                  {/* Product Name + Price */}
                  <div className="flex justify-between items-start mb-3">

                    <h3 className="font-display text-2xl font-bold text-on-surface leading-tight">
                      {product.name}
                    </h3>

                    <div className="text-right">
                      <span className="font-display text-2xl font-bold text-primary block">
                        {product.isPriceDepends
                          ? "Depends"
                          : `₹${product.price}`}
                      </span>

                      {!product.isPriceDepends && (
                        <span className="text-[10px] text-on-surface-variant font-bold uppercase block -mt-1 opacity-60 px-1">
                          + Delivery
                        </span>
                      )}
                    </div>

                  </div>

                  {/* Description */}
                  {product.desc && (
                    <p className="text-sm text-on-surface-variant mb-6 leading-relaxed flex-grow">
                      {product.desc}
                    </p>
                  )}

                  {/* Rating */}
                  <div className="flex items-center gap-3 mb-8">

                    <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
                      <Star
                        size={14}
                        className="fill-primary text-primary"
                      />

                      <span className="text-xs font-bold text-primary">
                        {product.rating}
                      </span>
                    </div>

                    <span className="text-xs font-bold text-on-surface-variant/60">
                      {product.reviews} Sweet Reviews
                    </span>

                  </div>

                  {/* ORDER BUTTON */}
                  {product.isPriceDepends ? (

                    /* Custom / Price Depends Product */
                    <a
                      href="https://instagram.com/fiascookedfr"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-5 bg-primary text-on-primary rounded-[24px] font-bold active:scale-95 transition-all hover:bg-primary-container flex items-center justify-center gap-3 shadow-soft-cocoa"
                    >
                      <Instagram size={20} />
                      DM to Order
                    </a>

                  ) : quantity === 0 ? (

                    /* ADD TO CART */
                    <button
                      onClick={() => onAddToCart(product)}
                      className="w-full py-5 bg-[#4d3b3b] text-white rounded-[24px] font-bold active:scale-95 transition-all hover:bg-[#3d2f2f] flex items-center justify-center gap-3 shadow-soft-cocoa"
                    >
                      <ShoppingBag size={20} />
                      Add to Cart
                    </button>

                  ) : (

                    /* QUANTITY CONTROLS */
                    <div className="w-full py-2 bg-[#4d3b3b] text-white rounded-[24px] flex items-center justify-between px-4 shadow-soft-cocoa">

                      <button
                        onClick={() => onUpdateQuantity(product.id, -1)}
                        className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-90 transition-all"
                      >
                        <Minus size={20} />
                      </button>

                      <span className="text-xl font-bold min-w-[30px] text-center">
                        {quantity}
                      </span>

                      <button
                        onClick={() => onUpdateQuantity(product.id, 1)}
                        className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-90 transition-all"
                      >
                        <Plus size={20} />
                      </button>

                    </div>

                  )}

                </div>
              </motion.div>
            );
          })}

        </div>
      </div>
    </div>
  );
}