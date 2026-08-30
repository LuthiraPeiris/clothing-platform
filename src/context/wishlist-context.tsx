"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import type {
  Product,
} from "@/types/product";

type WishlistContextValue = {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  clearWishlist: () => void;
};

const WishlistContext =
  createContext<WishlistContextValue | null>(null);

export function WishlistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] =
    useState<Product[]>([]);

  function addToWishlist(
    product: Product
  ) {
    setItems((currentItems) => {
      const exists =
        currentItems.some(
          (item) =>
            item.id === product.id
        );

      if (exists) {
        return currentItems;
      }

      return [
        ...currentItems,
        product,
      ];
    });
  }

  function removeFromWishlist(
    productId: string
  ) {
    setItems((currentItems) =>
      currentItems.filter(
        (item) =>
          item.id !== productId
      )
    );
  }

  function toggleWishlist(
    product: Product
  ) {
    setItems((currentItems) => {
      const exists =
        currentItems.some(
          (item) =>
            item.id === product.id
        );

      if (exists) {
        return currentItems.filter(
          (item) =>
            item.id !== product.id
        );
      }

      return [
        ...currentItems,
        product,
      ];
    });
  }

  function isWishlisted(
    productId: string
  ) {
    return items.some(
      (item) =>
        item.id === productId
    );
  }

  function clearWishlist() {
    setItems([]);
  }

  const value = useMemo(
    () => ({
      items,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      isWishlisted,
      clearWishlist,
    }),
    [items]
  );

  return (
    <WishlistContext.Provider
      value={value}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlistContext() {
  const context =
    useContext(
      WishlistContext
    );

  if (!context) {
    throw new Error(
      "useWishlistContext must be used inside WishlistProvider"
    );
  }

  return context;
}