"use client";

import {
  ShoppingBag,
  Trash2,
} from "lucide-react";

import Link from "next/link";

import {
  CartList,
} from "@/components/cart/cart-list";

import {
  CartSummary,
} from "@/components/cart/cart-summary";

import {
  useCart,
} from "@/hooks/use-cart";

export default function CartPage() {
  const {
    items,
    subtotal,
    totalItems,
    clearCart,
  } = useCart();

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-neutral-200 bg-[#faf9f7]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            Your Selection
          </p>

          <div className="mt-3 flex items-end justify-between gap-6">
            <div>
              <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                Shopping Cart
              </h1>

              <p className="mt-4 text-neutral-600">
                {totalItems}{" "}
                {totalItems === 1
                  ? "item"
                  : "items"}{" "}
                in your cart
              </p>
            </div>

            {items.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="hidden items-center gap-2 text-sm font-medium text-neutral-500 transition hover:text-red-600 sm:flex"
              >
                <Trash2 size={16} />
                Clear cart
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {items.length > 0 ? (
          <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
            <div>
              <CartList
                items={items}
              />

              <button
                type="button"
                onClick={clearCart}
                className="mt-7 flex items-center gap-2 text-sm font-medium text-neutral-500 sm:hidden"
              >
                <Trash2 size={16} />
                Clear cart
              </button>
            </div>

            <div className="lg:sticky lg:top-28">
              <CartSummary
                subtotal={subtotal}
              />
            </div>
          </div>
        ) : (
          <div className="flex min-h-[460px] flex-col items-center justify-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
              <ShoppingBag
                size={26}
                className="text-neutral-400"
              />
            </div>

            <h2 className="font-display mt-6 text-2xl font-semibold">
              Your cart is empty
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-500">
              Add something you love and
              it will appear here.
            </p>

            <Link
              href="/shop"
              className="mt-7 inline-flex h-12 items-center justify-center bg-neutral-950 px-7 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}