import Link from "next/link";

import {
  formatCurrency,
} from "@/lib/formatters";

type CartSummaryProps = {
  subtotal: number;
};

export function CartSummary({
  subtotal,
}: CartSummaryProps) {
  const shipping = 0;

  const total =
    subtotal + shipping;

  return (
    <aside className="bg-[#faf9f7] p-6 lg:p-8">
      <h2 className="font-display text-2xl font-semibold">
        Order Summary
      </h2>

      <div className="mt-6 space-y-4 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-neutral-500">
            Subtotal
          </span>

          <span>
            {formatCurrency(subtotal)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-neutral-500">
            Shipping
          </span>

          <span>
            {shipping === 0
              ? "Free"
              : formatCurrency(shipping)}
          </span>
        </div>
      </div>

      <div className="mt-6 border-t border-neutral-300 pt-5">
        <div className="flex items-center justify-between">
          <span className="font-medium">
            Total
          </span>

          <span className="text-xl font-semibold">
            {formatCurrency(total)}
          </span>
        </div>

        <p className="mt-2 text-xs text-neutral-500">
          Taxes and final shipping costs
          will be confirmed at checkout.
        </p>
      </div>

      <Link
        href="/checkout"
        className="mt-7 flex h-13 w-full items-center justify-center bg-neutral-950 px-6 text-sm font-medium text-white transition hover:bg-neutral-800"
      >
        Proceed to Checkout
      </Link>

      <Link
        href="/shop"
        className="mt-3 flex h-12 w-full items-center justify-center border border-neutral-300 text-sm font-medium transition hover:border-neutral-950"
      >
        Continue Shopping
      </Link>
    </aside>
  );
}