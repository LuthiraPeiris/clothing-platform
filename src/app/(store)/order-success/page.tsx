"use client";

import {
  Check,
  PackageCheck,
} from "lucide-react";

import Link from "next/link";
import { useState } from "react";

export default function OrderSuccessPage() {
  const [orderNumber] = useState(
    () =>
      "MOD-" +
      Math.floor(
        100000 +
          Math.random() * 900000
      )
  );

  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <section className="mx-auto flex min-h-[680px] max-w-3xl items-center justify-center px-4 py-16 sm:px-6">
        <div className="w-full bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white">
              <Check size={28} />
            </div>
          </div>

          <p className="mt-7 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            Order Confirmed
          </p>

          <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
            Thank you for your order.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-neutral-600">
            Your order has been successfully placed.
            We&apos;ll send you an update when your
            items are ready for delivery.
          </p>

          <div className="mx-auto mt-8 max-w-md border border-neutral-200 bg-[#faf9f7] p-5">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
              Order Number
            </p>

            <p className="mt-2 text-lg font-semibold text-neutral-950">
              {orderNumber}
            </p>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3 text-sm text-neutral-600">
            <PackageCheck size={18} />

            <span>
              Estimated delivery: 3–5 business days
            </span>
          </div>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/account/orders"
              className="inline-flex h-12 items-center justify-center bg-neutral-950 px-7 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              View My Orders
            </Link>

            <Link
              href="/shop"
              className="inline-flex h-12 items-center justify-center border border-neutral-300 bg-white px-7 text-sm font-medium text-neutral-950 transition hover:border-neutral-950"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}