import {
  ChevronRight,
  Package,
} from "lucide-react";

import Link from "next/link";

import {
  formatCurrency,
} from "@/lib/formatters";

import type {
  OrderResponse,
  OrderStatus,
} from "@/services/order-service";

type OrderCardProps = {
  order: OrderResponse;
};

export function OrderCard({
  order,
}: OrderCardProps) {
  const totalItems =
    order.items.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  return (
    <div className="border border-neutral-200 bg-white p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-neutral-100">
            <Package
              size={20}
            />
          </div>

          <div>
            <p className="text-sm font-semibold">
              {order.orderNumber}
            </p>

            <p className="mt-1 text-sm text-neutral-500">
              {formatOrderDate(
                order.createdAt
              )}
            </p>

            <p className="mt-2 text-sm text-neutral-500">
              {totalItems}{" "}
              {totalItems === 1
                ? "item"
                : "items"}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-5 sm:justify-end">
          <div className="text-right">
            <OrderStatusBadge
              status={order.status}
            />

            <p className="mt-2 font-semibold">
              {formatCurrency(
                order.total
              )}
            </p>
          </div>

          <Link
            href={`/account/orders/${order.id}`}
            className="flex h-10 w-10 items-center justify-center border border-neutral-200 transition hover:border-neutral-950"
            aria-label={`View order ${order.orderNumber}`}
          >
            <ChevronRight
              size={18}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

function formatOrderDate(
  date: string
) {
  return new Intl.DateTimeFormat(
    "en-LK",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  ).format(
    new Date(date)
  );
}

function OrderStatusBadge({
  status,
}: {
  status: OrderStatus;
}) {
  const styles: Record<
    OrderStatus,
    string
  > = {
    PENDING:
      "bg-neutral-100 text-neutral-700",

    CONFIRMED:
      "bg-blue-50 text-blue-700",

    PROCESSING:
      "bg-amber-50 text-amber-700",

    SHIPPED:
      "bg-purple-50 text-purple-700",

    DELIVERED:
      "bg-green-50 text-green-700",

    CANCELLED:
      "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`inline-flex px-3 py-1 text-xs font-medium capitalize ${styles[status]}`}
    >
      {status
        .toLowerCase()
        .replaceAll(
          "_",
          " "
        )}
    </span>
  );
}