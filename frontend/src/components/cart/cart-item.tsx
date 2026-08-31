"use client";

import {
  Minus,
  Plus,
  Trash2,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";

import {
  useCart,
} from "@/hooks/use-cart";

import {
  formatCurrency,
} from "@/lib/formatters";

import type {
  CartItem as CartItemType,
} from "@/types/cart";

type CartItemProps = {
  item: CartItemType;
};

export function CartItem({
  item,
}: CartItemProps) {
  const {
    removeFromCart,
    updateQuantity,
  } = useCart();

  const {
    product,
    quantity,
    selectedSize,
    selectedColor,
  } = item;

  return (
    <div className="flex gap-4 border-b border-neutral-200 py-6 sm:gap-6">
      <Link
        href={`/product/${product.slug}`}
        className="relative h-36 w-28 shrink-0 overflow-hidden bg-neutral-100 sm:h-44 sm:w-36"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">
                {product.category}
              </p>

              <Link
                href={`/product/${product.slug}`}
                className="mt-1 block font-medium text-neutral-950 hover:text-neutral-600"
              >
                {product.name}
              </Link>
            </div>

            <button
              type="button"
              onClick={() =>
                removeFromCart(item.id)
              }
              className="text-neutral-400 transition hover:text-red-600"
              aria-label="Remove item"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div className="mt-3 space-y-1 text-sm text-neutral-500">
            {selectedColor && (
              <p>
                Color:{" "}
                <span className="text-neutral-700">
                  {selectedColor}
                </span>
              </p>
            )}

            {selectedSize && (
              <p>
                Size:{" "}
                <span className="text-neutral-700">
                  {selectedSize}
                </span>
              </p>
            )}
          </div>
        </div>

        <div className="mt-5 flex items-end justify-between gap-4">
          <div className="inline-flex items-center border border-neutral-300">
            <button
              type="button"
              onClick={() =>
                updateQuantity(
                  item.id,
                  quantity - 1
                )
              }
              className="flex h-9 w-9 items-center justify-center transition hover:bg-neutral-100"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>

            <span className="flex h-9 min-w-10 items-center justify-center border-x border-neutral-300 text-sm">
              {quantity}
            </span>

            <button
              type="button"
              onClick={() =>
                updateQuantity(
                  item.id,
                  quantity + 1
                )
              }
              className="flex h-9 w-9 items-center justify-center transition hover:bg-neutral-100"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>

          <p className="font-semibold text-neutral-950">
            {formatCurrency(
              product.price * quantity
            )}
          </p>
        </div>
      </div>
    </div>
  );
}