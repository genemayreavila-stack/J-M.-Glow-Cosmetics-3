export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  category: string;
  description: string;
  longDescription: string;
  benefits: string[];
  img: string;
  shades?: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedShade?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string; // lucide icon name
  img: string;
}
