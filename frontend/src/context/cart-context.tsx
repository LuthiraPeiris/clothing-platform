"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

import type {
  CartItem,
} from "@/types/cart";

import type {
  Product,
} from "@/types/product";

type AddToCartInput = {
  product: Product;
  quantity?: number;
  selectedSize?: string;
  selectedColor?: string;
};

type CartContextValue = {
  items: CartItem[];

  addToCart: (
    input: AddToCartInput
  ) => void;

  removeFromCart: (
    cartItemId: string
  ) => void;

  updateQuantity: (
    cartItemId: string,
    quantity: number
  ) => void;

  clearCart: () => void;

  totalItems: number;

  subtotal: number;
};

const CartContext =
  createContext<
    CartContextValue | null
  >(null);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    items,
    setItems,
  ] = useState<
    CartItem[]
  >([]);

  function addToCart({
    product,
    quantity = 1,
    selectedSize,
    selectedColor,
  }: AddToCartInput) {
    const stock =
      product.stock ??
      0;

    if (
      stock <= 0
    ) {
      return;
    }

    const cartItemId = [
      product.id,
      selectedSize ??
        "no-size",
      selectedColor ??
        "no-color",
    ].join("-");

    setItems(
      (currentItems) => {
        const existingItem =
          currentItems.find(
            (item) =>
              item.id ===
              cartItemId
          );

        if (
          existingItem
        ) {
          const newQuantity =
            Math.min(
              stock,
              existingItem.quantity +
                quantity
            );

          return currentItems.map(
            (item) =>
              item.id ===
              cartItemId
                ? {
                    ...item,
                    quantity:
                      newQuantity,
                  }
                : item
          );
        }

        const safeQuantity =
          Math.min(
            stock,
            Math.max(
              1,
              quantity
            )
          );

        return [
          ...currentItems,

          {
            id:
              cartItemId,

            product,

            quantity:
              safeQuantity,

            selectedSize,

            selectedColor,
          },
        ];
      }
    );
  }

  function removeFromCart(
    cartItemId: string
  ) {
    setItems(
      (currentItems) =>
        currentItems.filter(
          (item) =>
            item.id !==
            cartItemId
        )
    );
  }

  function updateQuantity(
    cartItemId: string,
    quantity: number
  ) {
    if (
      quantity < 1
    ) {
      removeFromCart(
        cartItemId
      );

      return;
    }

    setItems(
      (currentItems) =>
        currentItems.map(
          (item) => {
            if (
              item.id !==
              cartItemId
            ) {
              return item;
            }

            const stock =
              item.product
                .stock ??
              0;

            /*
             * If the product is out
             * of stock, keep quantity
             * at 0 protection-wise.
             */
            if (
              stock <= 0
            ) {
              return {
                ...item,
                quantity:
                  0,
              };
            }

            const safeQuantity =
              Math.min(
                quantity,
                stock
              );

            return {
              ...item,

              quantity:
                safeQuantity,
            };
          }
        )
    );
  }

  function clearCart() {
    setItems(
      []
    );
  }

  const totalItems =
    items.reduce(
      (
        total,
        item
      ) =>
        total +
        item.quantity,
      0
    );

  const subtotal =
    items.reduce(
      (
        total,
        item
      ) =>
        total +
        item.product.price *
          item.quantity,
      0
    );

  const value:
    CartContextValue = {
      items,

      addToCart,

      removeFromCart,

      updateQuantity,

      clearCart,

      totalItems,

      subtotal,
    };

  return (
    <CartContext.Provider
      value={
        value
      }
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context =
    useContext(
      CartContext
    );

  if (
    !context
  ) {
    throw new Error(
      "useCartContext must be used inside CartProvider"
    );
  }

  return context;
}