import {
  MapPin,
  Package,
  Phone,
  UserRound,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";

import {
  notFound,
} from "next/navigation";

import {
  OrderStatusControl,
} from "@/components/admin/order-status-control";

import {
  formatCurrency,
} from "@/lib/formatters";

import {
  getOrderById,
} from "@/services/order-service";

type AdminOrderDetailsPageProps = {
  params: Promise<{
    orderId: string;
  }>;
};

export default async function AdminOrderDetailsPage({
  params,
}: AdminOrderDetailsPageProps) {
  const {
    orderId,
  } = await params;

  let order;

  try {
    order =
      await getOrderById(
        orderId
      );
  } catch {
    notFound();
  }

  return (
    <div>
      <Link
        href="/admin/orders"
        className="text-sm text-neutral-500 underline underline-offset-4"
      >
        Back to orders
      </Link>

      <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
            Order Details
          </p>

          <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            {
              order.orderNumber
            }
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            Placed on{" "}
            {formatOrderDate(
              order.createdAt
            )}
          </p>
        </div>

        <OrderStatusControl
          orderId={
            order.id
          }
          initialStatus={
            order.status
          }
        />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <section className="border border-neutral-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <Package
                size={19}
              />

              <h2 className="font-display text-xl font-semibold">
                Order items
              </h2>
            </div>

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
          </section>

          <section className="border border-neutral-200 bg-white p-6">
            <h2 className="font-display text-xl font-semibold">
              Payment
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="border border-neutral-200 p-4">
                <p className="text-xs uppercase tracking-[0.15em] text-neutral-500">
                  Payment Method
                </p>

                <p className="mt-2 text-sm font-medium">
                  Cash on Delivery
                </p>
              </div>

              <div className="border border-neutral-200 p-4">
                <p className="text-xs uppercase tracking-[0.15em] text-neutral-500">
                  Payment Status
                </p>

                <p className="mt-2 text-sm font-medium">
                  Pending
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="border border-neutral-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <UserRound
                size={18}
              />

              <h2 className="font-display text-lg font-semibold">
                Customer
              </h2>
            </div>

            <div className="mt-5 text-sm">
              <p className="font-medium">
                {
                  order.customerName
                }
              </p>

              <p className="mt-1 text-neutral-500">
                {
                  order.email
                }
              </p>

              <div className="mt-4 space-y-3 text-neutral-500">
                <div className="flex items-start gap-2">
                  <Phone
                    size={15}
                    className="mt-0.5 shrink-0"
                  />

                  <span>
                    {
                      order.phone
                    }
                  </span>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin
                    size={15}
                    className="mt-0.5 shrink-0"
                  />

                  <span className="leading-6">
                    {
                      order.shippingAddress
                    }
                    <br />

                    {
                      order.city
                    }

                    {order.postalCode &&
                      `, ${order.postalCode}`}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="border border-neutral-200 bg-white p-6">
            <h2 className="font-display text-lg font-semibold">
              Order summary
            </h2>

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
          </section>
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
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  ).format(
    new Date(date)
  );
}