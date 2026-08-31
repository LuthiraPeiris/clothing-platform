"use client";

import {
  ChevronRight,
  Search,
} from "lucide-react";

import Link from "next/link";
import { useMemo, useState } from "react";

import {
  orders,
} from "@/data/orders";

import {
  formatCurrency,
} from "@/lib/formatters";

export function OrdersTable() {
  const [query, setQuery] =
    useState("");

  const [status, setStatus] =
    useState("all");

  const filteredOrders = useMemo(() => {
    const normalizedQuery =
      query.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesQuery =
        !normalizedQuery ||
        order.orderNumber
          .toLowerCase()
          .includes(normalizedQuery) ||
        order.shippingAddress.name
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesStatus =
        status === "all" ||
        order.status === status;

      return (
        matchesQuery &&
        matchesStatus
      );
    });
  }, [query, status]);

  return (
    <div className="border border-neutral-200 bg-white">
      <div className="flex flex-col gap-4 border-b border-neutral-200 p-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold">
            Orders
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Review and manage customer
            orders.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
            />

            <input
              type="search"
              value={query}
              onChange={(event) =>
                setQuery(
                  event.target.value
                )
              }
              placeholder="Search orders..."
              className="h-10 w-full border border-neutral-300 pl-9 pr-3 text-sm outline-none focus:border-neutral-950 sm:w-64"
            />
          </div>

          <select
            value={status}
            onChange={(event) =>
              setStatus(
                event.target.value
              )
            }
            className="h-10 border border-neutral-300 bg-white px-3 text-sm outline-none focus:border-neutral-950"
          >
            <option value="all">
              All statuses
            </option>

            <option value="confirmed">
              Confirmed
            </option>

            <option value="processing">
              Processing
            </option>

            <option value="shipped">
              Shipped
            </option>

            <option value="delivered">
              Delivered
            </option>

            <option value="cancelled">
              Cancelled
            </option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left">
          <thead className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
            <tr>
              <th className="px-5 py-3 font-medium">
                Order
              </th>

              <th className="px-5 py-3 font-medium">
                Customer
              </th>

              <th className="px-5 py-3 font-medium">
                Date
              </th>

              <th className="px-5 py-3 font-medium">
                Status
              </th>

              <th className="px-5 py-3 font-medium">
                Items
              </th>

              <th className="px-5 py-3 text-right font-medium">
                Total
              </th>

              <th className="px-5 py-3 text-right font-medium">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-100">
            {filteredOrders.map(
              (order) => (
                <tr
                  key={order.id}
                  className="text-sm"
                >
                  <td className="px-5 py-4 font-medium">
                    {order.orderNumber}
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-medium text-neutral-950">
                      {
                        order
                          .shippingAddress
                          .name
                      }
                    </p>

                    <p className="mt-1 text-xs text-neutral-500">
                      {
                        order
                          .shippingAddress
                          .city
                      }
                    </p>
                  </td>

                  <td className="px-5 py-4 text-neutral-500">
                    {order.date}
                  </td>

                  <td className="px-5 py-4">
                    <OrderStatusBadge
                      status={
                        order.status
                      }
                    />
                  </td>

                  <td className="px-5 py-4 text-neutral-600">
                    {
                      order.items
                        .length
                    }
                  </td>

                  <td className="px-5 py-4 text-right font-semibold">
                    {formatCurrency(
                      order.total
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="flex h-9 w-9 items-center justify-center border border-neutral-200 transition hover:border-neutral-950"
                        aria-label="View order"
                      >
                        <ChevronRight
                          size={17}
                        />
                      </Link>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        {filteredOrders.length ===
          0 && (
          <div className="py-16 text-center">
            <p className="text-sm font-medium">
              No orders found
            </p>

            <p className="mt-1 text-xs text-neutral-500">
              Try another search or
              status.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function OrderStatusBadge({
  status,
}: {
  status:
    | "processing"
    | "confirmed"
    | "shipped"
    | "delivered"
    | "cancelled";
}) {
  const styles = {
    confirmed:
      "bg-blue-50 text-blue-700",
    processing:
      "bg-amber-50 text-amber-700",
    shipped:
      "bg-purple-50 text-purple-700",
    delivered:
      "bg-green-50 text-green-700",
    cancelled:
      "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`inline-flex px-3 py-1 text-xs font-medium capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
}