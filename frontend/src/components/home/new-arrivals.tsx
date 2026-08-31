import Link from "next/link";

import {
  ProductCard,
} from "@/components/product/product-card";

import type {
  Product,
} from "@/types/product";

type NewArrivalsProps = {
  products: Product[];
};

export function NewArrivals({
  products,
}: NewArrivalsProps) {
  const newArrivals =
    products
      .filter(
        (product) =>
          product.isNewArrival
      )
      .slice(0, 4);

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
              Just Dropped
            </p>

            <h2 className="font-display mt-2 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
              New arrivals
            </h2>
          </div>

          <Link
            href="/shop?sort=newest"
            className="hidden text-sm font-medium underline underline-offset-4 sm:inline"
          >
            Shop new arrivals
          </Link>
        </div>

        {newArrivals.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
            {newArrivals.map(
              (product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              )
            )}
          </div>
        ) : (
          <p className="text-sm text-neutral-500">
            No new arrivals available.
          </p>
        )}

        <Link
          href="/shop?sort=newest"
          className="mt-8 inline-block text-sm font-medium underline underline-offset-4 sm:hidden"
        >
          Shop new arrivals
        </Link>
      </div>
    </section>
  );
}