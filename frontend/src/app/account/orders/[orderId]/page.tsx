import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  OrderTracker,
} from "@/components/account/order-tracker";

import {
  orders,
} from "@/data/orders";

import {
  formatCurrency,
} from "@/lib/formatters";

type OrderDetailsPageProps = {
  params: Promise<{
    orderId: string;
  }>;
};

export default async function OrderDetailsPage({
  params,
}: OrderDetailsPageProps) {
  const {
    orderId,
  } = await params;

  const order =
    orders.find(
      (item) =>
        item.id === orderId
    );

  if (!order) {
    notFound();
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
            {order.orderNumber}
          </h2>

          <p className="mt-2 text-sm text-neutral-500">
            Ordered on {order.date}
          </p>
        </div>

        <span className="w-fit bg-neutral-950 px-4 py-2 text-xs font-medium capitalize text-white">
          {order.status}
        </span>
      </div>

      <div className="mt-8 border border-neutral-200 bg-white p-6 sm:p-8">
        <h3 className="font-display text-xl font-semibold">
          Order tracking
        </h3>

        <div className="mt-8">
          <OrderTracker
            status={order.status}
          />
        </div>
      </div>

      <div className="mt-6 border border-neutral-200 bg-white p-6 sm:p-8">
        <h3 className="font-display text-xl font-semibold">
          Items
        </h3>

        <div className="mt-6 divide-y divide-neutral-200">
          {order.items.map(
            (item) => (
              <div
                key={item.id}
                className="flex gap-4 py-5 first:pt-0 last:pb-0"
              >
                <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-neutral-100">
                  <Image
                    src={
                      item.productImage
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
                      {item.quantity}
                    </p>

                    {item.size && (
                      <p className="text-sm text-neutral-500">
                        Size:{" "}
                        {item.size}
                      </p>
                    )}

                    {item.color && (
                      <p className="text-sm text-neutral-500">
                        Color:{" "}
                        {item.color}
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
            )
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
                order.shippingAddress
                  .name
              }
            </p>

            <p className="mt-1">
              {
                order.shippingAddress
                  .address
              }
            </p>

            <p>
              {
                order.shippingAddress
                  .city
              }
              ,{" "}
              {
                order.shippingAddress
                  .postalCode
              }
            </p>

            <p className="mt-2">
              {
                order.shippingAddress
                  .phone
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
                  order.total
                )}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-neutral-500">
                Shipping
              </span>

              <span>
                Free
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