import {
  PackageCheck,
  PackageOpen,
  ShoppingCart,
  Truck,
} from "lucide-react";

import {
  OrdersTable,
} from "@/components/admin/orders-table";

import {
  getOrders,
} from "@/services/order-service";

export default async function AdminOrdersPage() {
  const orders =
    await getOrders();

  const totalOrders =
    orders.length;

  const processing =
    orders.filter(
      (order) =>
        order.status ===
          "PENDING" ||
        order.status ===
          "PROCESSING" ||
        order.status ===
          "CONFIRMED"
    ).length;

  const shipped =
    orders.filter(
      (order) =>
        order.status ===
        "SHIPPED"
    ).length;

  const delivered =
    orders.filter(
      (order) =>
        order.status ===
        "DELIVERED"
    ).length;

  const stats = [
    {
      label: "Total Orders",
      value: totalOrders,
      icon: ShoppingCart,
    },
    {
      label: "Processing",
      value: processing,
      icon: PackageOpen,
    },
    {
      label: "Shipped",
      value: shipped,
      icon: Truck,
    },
    {
      label: "Delivered",
      value: delivered,
      icon: PackageCheck,
    },
  ];

  return (
    <div>
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
          Order Management
        </p>

        <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Orders
        </h1>

        <p className="mt-2 text-sm leading-6 text-neutral-500">
          Review customer purchases,
          shipping information, and
          order progress.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(
          (stat) => {
            const Icon =
              stat.icon;

            return (
              <div
                key={
                  stat.label
                }
                className="border border-neutral-200 bg-white p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center bg-neutral-100">
                  <Icon
                    size={19}
                  />
                </div>

                <p className="mt-5 text-sm text-neutral-500">
                  {
                    stat.label
                  }
                </p>

                <p className="font-display mt-2 text-2xl font-semibold">
                  {
                    stat.value
                  }
                </p>
              </div>
            );
          }
        )}
      </div>

      <div className="mt-6">
        <OrdersTable
          initialOrders={
            orders
          }
        />
      </div>
    </div>
  );
}