export interface Product {
  id: number;
  name: string;
  price: number;
  desc: string;
  rating: number;
  reviews: number;
  image: string;
  tag: string;
  isPriceDepends?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
