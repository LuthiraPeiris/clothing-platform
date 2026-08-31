"use client";

import {
  Heart,
  Trash2,
} from "lucide-react";

import Link from "next/link";

import {
  ProductCard,
} from "@/components/product/product-card";

import {
  useWishlist,
} from "@/hooks/use-wishlist";

export default function AccountWishlistPage() {
  const {
    items,
    clearWishlist,
  } = useWishlist();

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
            Saved Products
          </p>

          <h2 className="font-display mt-2 text-3xl font-semibold">
            My wishlist
          </h2>

          <p className="mt-2 text-sm leading-6 text-neutral-500">
            Products you&apos;ve saved for later.
          </p>
        </div>

        {items.length > 0 && (
          <button
            type="button"
            onClick={clearWishlist}
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition hover:text-red-600"
          >
            <Trash2 size={16} />
            Clear wishlist
          </button>
        )}
      </div>

      {items.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-3 xl:grid-cols-4 xl:gap-x-6">
          {items.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="mt-8 flex min-h-[420px] flex-col items-center justify-center border border-neutral-200 bg-white px-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
            <Heart
              size={26}
              className="text-neutral-400"
            />
          </div>

          <h3 className="font-display mt-6 text-2xl font-semibold">
            Your wishlist is empty
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-500">
            Save products you like and they will appear here.
          </p>

          <Link
            href="/shop"
            className="mt-7 inline-flex h-12 items-center justify-center bg-neutral-950 px-7 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            Explore Products
          </Link>
        </div>
      )}
    </div>
  );
}