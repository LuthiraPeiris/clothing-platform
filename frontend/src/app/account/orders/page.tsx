import {
  Package,
} from "lucide-react";

import {
  OrderCard,
} from "@/components/account/order-card";

import {
  getOrders,
} from "@/services/order-service";

export default async function OrdersPage() {
  const orders =
    await getOrders();

  return (
    <div>
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
          Purchases
        </p>

        <h2 className="font-display mt-2 text-3xl font-semibold">
          My orders
        </h2>

        <p className="mt-2 text-sm leading-6 text-neutral-500">
          View your order history and
          track current purchases.
        </p>
      </div>

      {orders.length > 0 ? (
        <div className="mt-8 space-y-4">
          {orders.map(
            (order) => (
              <OrderCard
                key={
                  order.id
                }
                order={
                  order
                }
              />
            )
          )}
        </div>
      ) : (
        <div className="mt-8 flex min-h-[400px] flex-col items-center justify-center border border-neutral-200 bg-white text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
            <Package
              size={26}
              className="text-neutral-400"
            />
          </div>

          <h3 className="font-display mt-5 text-2xl font-semibold">
            No orders yet
          </h3>

          <p className="mt-2 text-sm text-neutral-500">
            Your orders will appear here.
          </p>
        </div>
      )}
    </div>
  );
}