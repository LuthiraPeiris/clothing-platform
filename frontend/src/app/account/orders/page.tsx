"use client";

import {
  Package,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  OrderCard,
} from "@/components/account/order-card";

import {
  Spinner,
} from "@/components/ui/spinner";

import {
  getAccessToken,
} from "@/services/auth-service";

import {
  getMyOrders,
} from "@/services/order-service";

import type {
  OrderResponse,
} from "@/services/order-service";

export default function OrdersPage() {
  const [
    orders,
    setOrders,
  ] = useState<
    OrderResponse[]
  >([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

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

        const accessToken =
          await getAccessToken();

        const data =
          await getMyOrders(
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
              : "Failed to load your orders."
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
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center">
          <Spinner
            size="lg"
          />

          <p className="mt-4 text-sm text-neutral-500">
            Loading your orders...
          </p>
        </div>
      </div>
    );
  }

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

      {error && (
        <div className="mt-8 border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {!error &&
      orders.length > 0 ? (
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
      ) : null}

      {!error &&
      orders.length === 0 && (
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