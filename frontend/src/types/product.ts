export type Product = {
  id: string;
  name: string;
  slug: string;
  category:
    | "men"
    | "women"
    | "accessories";
  price: number;
  oldPrice?: number;
  image: string;
  badge?: string;
  colors?: string[];
  sizes?: string[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
};