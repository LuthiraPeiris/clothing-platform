export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  brand: string;
  category: string;

  price: number;
  discountPrice?: number;

  images: string[];

  variants: ProductVariant[];

  rating: number;
  reviewCount: number;

  isFeatured?: boolean;
  isNew?: boolean;
}

export interface ProductVariant {
  id: string;
  sku: string;

  color: string;
  colorHex?: string;

  size: string;

  stock: number;
}