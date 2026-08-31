import Link from "next/link";

import {
  ProductCard,
} from "@/components/product/product-card";

import {
  products,
} from "@/data/products";

export function FeaturedProducts() {
  const featuredProducts =
    products
      .filter(
        (product) =>
          product.isFeatured
      )
      .slice(0, 4);

  return (
    <section className="bg-[#faf9f7] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
              Curated For You
            </p>

            <h2 className="font-display mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Featured products
            </h2>
          </div>

          <Link
            href="/shop"
            className="hidden text-sm font-medium underline underline-offset-4 sm:inline"
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
          {featuredProducts.map(
            (product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            )
          )}
        </div>

        <Link
          href="/shop"
          className="mt-8 inline-block text-sm font-medium underline underline-offset-4 sm:hidden"
        >
          View all products
        </Link>
      </div>
    </section>
  );
}