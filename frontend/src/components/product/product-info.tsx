"use client";

import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
} from "lucide-react";

import { useState } from "react";

import {
  useCart,
} from "@/hooks/use-cart";

import {
  useWishlist,
} from "@/hooks/use-wishlist";

import {
  formatCurrency,
} from "@/lib/formatters";

import type {
  Product,
} from "@/types/product";

import {
  ProductColorSelector,
} from "./product-color-selector";

import {
  ProductSizeSelector,
} from "./product-size-selector";

type ProductInfoProps = {
  product: Product;
};

export function ProductInfo({
  product,
}: ProductInfoProps) {
  const [selectedSize, setSelectedSize] =
    useState(
      product.sizes?.[0] ?? ""
    );

  const [
    selectedColor,
    setSelectedColor,
  ] = useState(
    product.colors?.[0] ?? ""
  );

  const [quantity, setQuantity] =
    useState(1);

  const {
    addToCart,
  } = useCart();

  const {
    toggleWishlist,
    isWishlisted,
  } = useWishlist();

  const wishlisted =
    isWishlisted(product.id);

  function handleAddToCart() {
    addToCart({
      product,
      quantity,
      selectedSize:
        selectedSize || undefined,
      selectedColor:
        selectedColor || undefined,
    });
  }

  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
        {product.category}
      </p>

      <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
        {product.name}
      </h1>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="text-xl font-semibold">
          {formatCurrency(
            product.price
          )}
        </span>

        {product.oldPrice && (
          <span className="text-base text-neutral-400 line-through">
            {formatCurrency(
              product.oldPrice
            )}
          </span>
        )}

        {product.badge && (
          <span className="bg-neutral-100 px-3 py-1 text-xs font-medium">
            {product.badge}
          </span>
        )}
      </div>

      <p className="mt-6 leading-7 text-neutral-600">
        A versatile wardrobe essential
        designed for everyday comfort,
        effortless styling, and a clean
        modern look.
      </p>

      <div className="mt-8 space-y-7">
        {product.colors &&
          product.colors.length > 0 && (
            <ProductColorSelector
              colors={
                product.colors
              }
              selectedColor={
                selectedColor
              }
              onChange={
                setSelectedColor
              }
            />
          )}

        {product.sizes &&
          product.sizes.length > 0 && (
            <ProductSizeSelector
              sizes={
                product.sizes
              }
              selectedSize={
                selectedSize
              }
              onChange={
                setSelectedSize
              }
            />
          )}

        <div>
          <p className="mb-3 text-sm font-medium">
            Quantity
          </p>

          <div className="inline-flex items-center border border-neutral-300">
            <button
              type="button"
              onClick={() =>
                setQuantity(
                  (value) =>
                    Math.max(
                      1,
                      value - 1
                    )
                )
              }
              className="flex h-11 w-11 items-center justify-center transition hover:bg-neutral-100"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>

            <span className="flex h-11 min-w-12 items-center justify-center border-x border-neutral-300 text-sm font-medium">
              {quantity}
            </span>

            <button
              type="button"
              onClick={() =>
                setQuantity(
                  (value) =>
                    value + 1
                )
              }
              className="flex h-11 w-11 items-center justify-center transition hover:bg-neutral-100"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={
            handleAddToCart
          }
          className="flex h-14 flex-1 items-center justify-center gap-2 bg-neutral-950 px-6 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          <ShoppingBag
            size={18}
          />

          Add to Cart
        </button>

        <button
          type="button"
          onClick={() =>
            toggleWishlist(
              product
            )
          }
          className={`flex h-14 w-14 shrink-0 items-center justify-center border transition ${
            wishlisted
              ? "border-neutral-950 bg-neutral-950 text-white"
              : "border-neutral-300 bg-white text-neutral-950 hover:border-neutral-950"
          }`}
          aria-label={
            wishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
        >
          <Heart
            size={19}
            fill={
              wishlisted
                ? "currentColor"
                : "none"
            }
          />
        </button>
      </div>

      <div className="mt-8 divide-y divide-neutral-200 border-y border-neutral-200">
        <div className="py-4">
          <p className="text-sm font-medium">
            Free delivery
          </p>

          <p className="mt-1 text-xs leading-5 text-neutral-500">
            Free standard delivery on
            qualifying orders.
          </p>
        </div>

        <div className="py-4">
          <p className="text-sm font-medium">
            Easy returns
          </p>

          <p className="mt-1 text-xs leading-5 text-neutral-500">
            Return eligible items within
            14 days of delivery.
          </p>
        </div>
      </div>
    </div>
  );
}