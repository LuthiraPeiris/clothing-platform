import {
  BrandSection,
} from "@/components/home/brand-section";

import {
  CategorySection,
} from "@/components/home/category-section";

import {
  FeaturedProducts,
} from "@/components/home/featured-products";

import {
  HeroSection,
} from "@/components/home/hero-section";

import {
  NewArrivals,
} from "@/components/home/new-arrivals";

import {
  PromoBanner,
} from "@/components/home/promo-banner";

import {
  getProducts,
} from "@/services/product-service";

export default async function HomePage() {
  const products =
    await getProducts();

  return (
    <>
      <HeroSection />

      <CategorySection />

      <FeaturedProducts
        products={products}
      />

      <NewArrivals
        products={products}
      />

      <PromoBanner />

      <BrandSection />
    </>
  );
}