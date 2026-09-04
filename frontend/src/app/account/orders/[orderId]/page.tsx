"use client";

import Image from "next/image";
import Link from "next/link";

import {
  useParams,
} from "next/navigation";

import {
  useEffect,
  useState,
} from "react";

import {
  OrderTracker,
} from "@/components/account/order-tracker";

import {
  Spinner,
} from "@/components/ui/spinner";

import {
  formatCurrency,
} from "@/lib/formatters";

import {
  getAccessToken,
} from "@/services/auth-service";

import {
  getOrderById,
} from "@/services/order-service";

import type {
  OrderResponse,
} from "@/services/order-service";

export default function OrderDetailsPage() {
  const params =
    useParams<{
      orderId: string;
    }>();

  const orderId =
    params.orderId;

  const [
    order,
    setOrder,
  ] = useState<
    OrderResponse | null
  >(null);

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

    async function loadOrder() {
      if (
        !orderId
      ) {
        return;
      }

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
          await getOrderById(
            orderId,
            accessToken
          );

        if (
          active
        ) {
          setOrder(
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
              : "Failed to load order."
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

    loadOrder();

    return () => {
      active =
        false;
    };
  }, [
    orderId,
  ]);

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
            Loading order...
          </p>
        </div>
      </div>
    );
  }

  if (
    error ||
    !order
  ) {
    return (
      <div className="border border-neutral-200 bg-white p-8 text-center">
        <h2 className="font-display text-2xl font-semibold">
          Order not found
        </h2>

        <p className="mt-3 text-sm text-neutral-500">
          {error ??
            "We could not find this order."}
        </p>

        <Link
          href="/account/orders"
          className="mt-6 inline-flex h-11 items-center justify-center bg-[#a26b42] px-5 text-sm font-medium text-white transition hover:bg-[#8d5c39]"
        >
          Back to orders
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link
            href="/account/orders"
            className="text-sm text-neutral-500 underline underline-offset-4"
          >
            Back to orders
          </Link>

          <p className="mt-5 text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
            Order Details
          </p>

          <h2 className="font-display mt-2 text-3xl font-semibold">
            {
              order.orderNumber
            }
          </h2>

          <p className="mt-2 text-sm text-neutral-500">
            Ordered on{" "}
            {formatOrderDate(
              order.createdAt
            )}
          </p>
        </div>

        <span className="w-fit bg-neutral-950 px-4 py-2 text-xs font-medium capitalize text-white">
          {order.status
            .toLowerCase()
            .replaceAll(
              "_",
              " "
            )}
        </span>
      </div>

      <div className="mt-8 border border-neutral-200 bg-white p-6 sm:p-8">
        <h3 className="font-display text-xl font-semibold">
          Order tracking
        </h3>

        <div className="mt-8">
          <OrderTracker
            status={
              order.status
            }
          />
        </div>
      </div>

      <div className="mt-6 border border-neutral-200 bg-white p-6 sm:p-8">
        <h3 className="font-display text-xl font-semibold">
          Items
        </h3>

        <div className="mt-6 divide-y divide-neutral-200">
          {order.items.map(
            (item) => {
              const image =
                item.productImage ||
                "/images/products/placeholder.jpg";

              return (
                <div
                  key={
                    item.id
                  }
                  className="flex gap-4 py-5 first:pt-0 last:pb-0"
                >
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-neutral-100">
                    <Image
                      src={
                        image
                      }
                      alt={
                        item.productName
                      }
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 justify-between gap-5">
                    <div>
                      <p className="font-medium">
                        {
                          item.productName
                        }
                      </p>

                      <p className="mt-2 text-sm text-neutral-500">
                        Quantity:{" "}
                        {
                          item.quantity
                        }
                      </p>

                      {item.selectedSize && (
                        <p className="text-sm text-neutral-500">
                          Size:{" "}
                          {
                            item.selectedSize
                          }
                        </p>
                      )}

                      {item.selectedColor && (
                        <p className="text-sm text-neutral-500">
                          Color:{" "}
                          {
                            item.selectedColor
                          }
                        </p>
                      )}
                    </div>

                    <p className="shrink-0 font-semibold">
                      {formatCurrency(
                        item.price *
                          item.quantity
                      )}
                    </p>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="border border-neutral-200 bg-white p-6">
          <h3 className="font-display text-lg font-semibold">
            Shipping address
          </h3>

          <div className="mt-4 text-sm leading-6 text-neutral-500">
            <p className="font-medium text-neutral-950">
              {
                order.customerName
              }
            </p>

            <p className="mt-1">
              {
                order.shippingAddress
              }
            </p>

            <p>
              {
                order.city
              }

              {order.postalCode &&
                `, ${order.postalCode}`}
            </p>

            <p className="mt-2">
              {
                order.phone
              }
            </p>

            <p className="mt-1">
              {
                order.email
              }
            </p>
          </div>
        </div>

        <div className="border border-neutral-200 bg-white p-6">
          <h3 className="font-display text-lg font-semibold">
            Order summary
          </h3>

          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-500">
                Subtotal
              </span>

              <span>
                {formatCurrency(
                  order.subtotal
                )}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-neutral-500">
                Shipping
              </span>

              <span>
                {formatCurrency(
                  order.shippingFee
                )}
              </span>
            </div>
          </div>

          <div className="mt-5 border-t border-neutral-200 pt-5">
            <div className="flex items-center justify-between">
              <span className="font-semibold">
                Total
              </span>

              <span className="text-xl font-semibold">
                {formatCurrency(
                  order.total
                )}
              </span>
            </div>
          </div>
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
      year:
        "numeric",

      month:
        "long",

      day:
        "numeric",

      hour:
        "2-digit",

      minute:
        "2-digit",
    }
  ).format(
    new Date(
      date
    )
  );
}