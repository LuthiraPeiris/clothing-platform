import Image from "next/image";

import {
  formatCurrency,
} from "@/lib/formatters";

import type {
  CartItem,
} from "@/types/cart";

type OrderSummaryProps = {
  items: CartItem[];
  subtotal: number;
};

export function OrderSummary({
  items,
  subtotal,
}: OrderSummaryProps) {
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <aside className="bg-[#faf9f7] p-6 lg:p-8">
      <h2 className="font-display text-2xl font-semibold">
        Your Order
      </h2>

      <div className="mt-6 space-y-5">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-4"
          >
            <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-neutral-100">
              <Image
                src={item.product.image}
                alt={item.product.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">
                {item.product.name}
              </p>

              <p className="mt-1 text-xs text-neutral-500">
                Qty: {item.quantity}
              </p>

              {item.selectedSize && (
                <p className="text-xs text-neutral-500">
                  Size: {item.selectedSize}
                </p>
              )}

              {item.selectedColor && (
                <p className="text-xs text-neutral-500">
                  Color: {item.selectedColor}
                </p>
              )}
            </div>

            <p className="text-sm font-medium">
              {formatCurrency(
                item.product.price * item.quantity
              )}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-7 space-y-4 border-t border-neutral-300 pt-5 text-sm">
        <div className="flex justify-between">
          <span className="text-neutral-500">
            Subtotal
          </span>

          <span>
            {formatCurrency(subtotal)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-neutral-500">
            Shipping
          </span>

          <span>Free</span>
        </div>
      </div>

      <div className="mt-5 border-t border-neutral-300 pt-5">
        <div className="flex items-center justify-between">
          <span className="font-semibold">
            Total
          </span>

          <span className="text-xl font-semibold">
            {formatCurrency(total)}
          </span>
        </div>
      </div>
    </aside>
  );
}