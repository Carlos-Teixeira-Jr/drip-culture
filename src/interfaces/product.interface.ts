type Review = {
  author: string,
  text: string
}

type Image = {
  color: string,
  images: string[]
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  images: Image[];
  colors: string[];
  sizes: string[];
  reviews: Review[]
}