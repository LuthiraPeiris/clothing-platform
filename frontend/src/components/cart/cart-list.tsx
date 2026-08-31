import {
  CartItem,
} from "@/components/cart/cart-item";

import type {
  CartItem as CartItemType,
} from "@/types/cart";

type CartListProps = {
  items: CartItemType[];
};

export function CartList({
  items,
}: CartListProps) {
  return (
    <div>
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
        />
      ))}
    </div>
  );
}