import { Star } from 'lucide-react';

export const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        size={14} 
        className={i < rating ? "fill-primary text-primary" : "text-primary/20"} 
      />
    ))}
  </div>
);
