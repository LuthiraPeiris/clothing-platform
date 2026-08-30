"use client";

import {
  Heart,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";

import {
  useWishlist,
} from "@/hooks/use-wishlist";

import {
  formatCurrency,
} from "@/lib/formatters";

import type {
  Product,
} from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({
  product,
}: ProductCardProps) {
  const {
    toggleWishlist,
    isWishlisted,
  } = useWishlist();

  const wishlisted =
    isWishlisted(product.id);

  return (
    <article className="group">
      <div className="relative overflow-hidden bg-neutral-100">
        <Link
          href={`/product/${product.slug}`}
          className="block"
        >
          <div className="relative aspect-[4/5]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          </div>
        </Link>

        {product.badge && (
          <span className="absolute left-3 top-3 bg-white px-3 py-1 text-xs font-medium text-neutral-900">
            {product.badge}
          </span>
        )}

        <button
          type="button"
          onClick={() =>
            toggleWishlist(
              product
            )
          }
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-105"
          aria-label={
            wishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
        >
          <Heart
            size={18}
            fill={
              wishlisted
                ? "currentColor"
                : "none"
            }
          />
        </button>
      </div>

      <div className="pt-4">
        <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">
          {product.category}
        </p>

        <Link
          href={`/product/${product.slug}`}
        >
          <h3 className="mt-1 font-medium text-neutral-950 transition hover:text-neutral-600">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm font-semibold text-neutral-950">
            {formatCurrency(
              product.price
            )}
          </span>

          {product.oldPrice && (
            <span className="text-sm text-neutral-400 line-through">
              {formatCurrency(
                product.oldPrice
              )}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}