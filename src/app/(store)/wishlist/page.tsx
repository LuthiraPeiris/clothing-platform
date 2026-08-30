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

export default function WishlistPage() {
  const {
    items,
    clearWishlist,
  } = useWishlist();

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-neutral-200 bg-[#faf9f7]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            Saved For Later
          </p>

          <div className="mt-3 flex items-end justify-between gap-6">
            <div>
              <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                Wishlist
              </h1>

              <p className="mt-4 text-neutral-600">
                {items.length}{" "}
                {items.length === 1
                  ? "item"
                  : "items"}{" "}
                saved
              </p>
            </div>

            {items.length > 0 && (
              <button
                type="button"
                onClick={
                  clearWishlist
                }
                className="hidden items-center gap-2 text-sm font-medium text-neutral-500 transition hover:text-red-600 sm:flex"
              >
                <Trash2
                  size={16}
                />

                Clear wishlist
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {items.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
              {items.map(
                (product) => (
                  <ProductCard
                    key={
                      product.id
                    }
                    product={
                      product
                    }
                  />
                )
              )}
            </div>

            <button
              type="button"
              onClick={
                clearWishlist
              }
              className="mt-10 flex items-center gap-2 text-sm font-medium text-neutral-500 sm:hidden"
            >
              <Trash2
                size={16}
              />

              Clear wishlist
            </button>
          </>
        ) : (
          <div className="flex min-h-[460px] flex-col items-center justify-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
              <Heart
                size={26}
                className="text-neutral-400"
              />
            </div>

            <h2 className="font-display mt-6 text-2xl font-semibold">
              Your wishlist is empty
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-500">
              Save products you love
              and come back to them
              whenever you&apos;re
              ready.
            </p>

            <Link
              href="/shop"
              className="mt-7 inline-flex h-12 items-center justify-center bg-neutral-950 px-7 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              Explore Products
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}