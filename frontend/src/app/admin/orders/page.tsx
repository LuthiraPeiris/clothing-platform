"use client";

import {
  PackageCheck,
  PackageOpen,
  ShoppingCart,
  Truck,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  OrdersTable,
} from "@/components/admin/orders-table";

import {
  Spinner,
} from "@/components/ui/spinner";

import {
  getAccessToken,
} from "@/services/auth-service";

import {
  getOrders,
} from "@/services/order-service";

import type {
  OrderResponse,
} from "@/services/order-service";

export default function AdminOrdersPage() {
  const [
    orders,
    setOrders,
  ] = useState<
    OrderResponse[]
  >([]);

  const [
    loading,
    setLoading,
  ] = useState(
    true
  );

  const [
    error,
    setError,
  ] = useState<
    string | null
  >(null);

  useEffect(() => {
    let active =
      true;

    async function loadOrders() {
      try {
        setLoading(
          true
        );

        setError(
          null
        );

        /*
         * Get current ADMIN
         * Keycloak token.
         */
        const accessToken =
          await getAccessToken();

        /*
         * ADMIN-only endpoint:
         *
         * GET /api/orders
         */
        const data =
          await getOrders(
            accessToken
          );

        if (
          active
        ) {
          setOrders(
            data
          );
        }
      } catch (error) {
        if (
          active
        ) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to load orders."
          );
        }
      } finally {
        if (
          active
        ) {
          setLoading(
            false
          );
        }
      }
    }

    loadOrders();

    return () => {
      active =
        false;
    };
  }, []);

  if (
    loading
  ) {
    return (
      <div className="flex min-h-[450px] items-center justify-center">
        <div className="flex flex-col items-center">
          <Spinner
            size="lg"
          />

          <p className="mt-4 text-sm text-neutral-500">
            Loading orders...
          </p>
        </div>
      </div>
    );
  }

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
      label:
        "Total Orders",

      value:
        totalOrders,

      icon:
        ShoppingCart,
    },
    {
      label:
        "Processing",

      value:
        processing,

      icon:
        PackageOpen,
    },
    {
      label:
        "Shipped",

      value:
        shipped,

      icon:
        Truck,
    },
    {
      label:
        "Delivered",

      value:
        delivered,

      icon:
        PackageCheck,
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

      {error && (
        <div className="mt-8 border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {!error && (
        <>
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
                    <div className="flex h-10 w-10 items-center justify-center bg-[#f8f3ef] text-[#a26b42]">
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
        </>
      )}
    </div>
  );
}