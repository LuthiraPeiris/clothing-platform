"use client";

import {
  ShoppingBag,
} from "lucide-react";

import Link from "next/link";

import {
  CheckoutForm,
} from "@/components/checkout/checkout-form";

import {
  useCart,
} from "@/hooks/use-cart";

export default function CheckoutPage() {
  const {
    items,
  } = useCart();

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-neutral-200 bg-[#faf9f7]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            Secure Checkout
          </p>

          <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Checkout
          </h1>

          <p className="mt-4 text-neutral-600">
            Complete your shipping
            and payment details.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {items.length > 0 ? (
          <CheckoutForm />
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

            <p className="mt-2 text-sm text-neutral-500">
              Add products before
              proceeding to checkout.
            </p>

            <Link
              href="/shop"
              className="mt-7 inline-flex h-12 items-center justify-center bg-neutral-950 px-7 text-sm font-medium text-white"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}