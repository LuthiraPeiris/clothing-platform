"use client";

import {
  useWishlistContext,
} from "@/context/wishlist-context";

export function useWishlist() {
  return useWishlistContext();
}