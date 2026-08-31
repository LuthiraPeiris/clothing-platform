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

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <NewArrivals />
      <PromoBanner />
      <BrandSection />
    </>
  );
}