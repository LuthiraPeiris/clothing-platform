"use client";

import {
  ArrowRight,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

import Link from "next/link";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  DashboardStats,
} from "@/components/admin/dashboard-stats";

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
  getCustomers,
} from "@/services/customer-service";

import type {
  CustomerResponse,
} from "@/services/customer-service";

import {
  getInventory,
} from "@/services/inventory-service";

import type {
  InventoryItem,
} from "@/services/inventory-service";

import {
  getOrders,
} from "@/services/order-service";

import type {
  OrderResponse,
} from "@/services/order-service";

import {
  getProducts,
} from "@/services/product-service";

import type {
  Product,
} from "@/types/product";

export default function AdminDashboardPage() {
  const [
    products,
    setProducts,
  ] = useState<
    Product[]
  >([]);

  const [
    orders,
    setOrders,
  ] = useState<
    OrderResponse[]
  >([]);

  const [
    inventory,
    setInventory,
  ] = useState<
    InventoryItem[]
  >([]);

  const [
    customers,
    setCustomers,
  ] = useState<
    CustomerResponse[]
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

    async function loadDashboard() {
      try {
        setLoading(
          true
        );

        setError(
          null
        );

        const accessToken =
          await getAccessToken();

        /*
         * Products are public GETs,
         * while the other admin data
         * requires the ADMIN JWT.
         */
        const [
          productsData,
          ordersData,
          inventoryData,
          customersData,
        ] =
          await Promise.all([
            getProducts(),

            getOrders(
              accessToken
            ),

            getInventory(
              accessToken
            ),

            getCustomers(
              accessToken
            ),
          ]);

        if (
          !active
        ) {
          return;
        }

        setProducts(
          productsData
        );

        setOrders(
          ordersData
        );

        setInventory(
          inventoryData
        );

        setCustomers(
          customersData
        );

      } catch (error) {

        if (
          active
        ) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to load dashboard."
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

    loadDashboard();

    return () => {
      active =
        false;
    };
  }, []);

  const totalRevenue =
    orders.reduce(
      (
        total,
        order
      ) =>
        total +
        order.total,
      0
    );

  const recentOrders =
    useMemo(
      () =>
        [...orders]
          .sort(
            (
              first,
              second
            ) =>
              new Date(
                second.createdAt
              ).getTime() -
              new Date(
                first.createdAt
              ).getTime()
          )
          .slice(
            0,
            5
          ),
      [
        orders,
      ]
    );

  const lowStockItems =
    inventory.filter(
      (item) =>
        item.status ===
          "LOW_STOCK" ||
        item.status ===
          "OUT_OF_STOCK"
    );

  const newestCustomer =
    useMemo(
      () =>
        [...customers]
          .sort(
            (
              first,
              second
            ) =>
              new Date(
                second.joinedAt
              ).getTime() -
              new Date(
                first.joinedAt
              ).getTime()
          )[0],
      [
        customers,
      ]
    );

  const latestOrder =
    recentOrders[0];

  if (
    loading
  ) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="flex flex-col items-center">
          <Spinner
            size="lg"
          />

          <p className="mt-4 text-sm text-neutral-500">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (
    error
  ) {
    return (
      <div>
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
            Overview
          </p>

          <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Dashboard
          </h1>
        </div>

        <div className="mt-8 border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
          Overview
        </p>

        <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Dashboard
        </h1>

        <p className="mt-2 text-sm leading-6 text-neutral-500">
          Monitor store performance,
          orders, inventory, and
          customers.
        </p>
      </div>

      {/* Real Stats */}
      <div className="mt-8">
        <DashboardStats
          totalRevenue={
            totalRevenue
          }
          totalOrders={
            orders.length
          }
          totalProducts={
            products.length
          }
          totalCustomers={
            customers.length
          }
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_0.8fr]">

        {/* Recent Orders */}
        <section className="border border-neutral-200 bg-white">
          <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
            <div>
              <h2 className="font-display text-xl font-semibold">
                Recent orders
              </h2>

              <p className="mt-1 text-xs text-neutral-500">
                Latest orders placed
                in the store
              </p>
            </div>

            <Link
              href="/admin/orders"
              className="flex items-center gap-1 text-sm font-medium text-[#a26b42] transition hover:text-[#8d5c39]"
            >
              View all

              <ArrowRight
                size={15}
              />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left">
              <thead className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
                <tr>
                  <th className="px-5 py-3 font-medium">
                    Order
                  </th>

                  <th className="px-5 py-3 font-medium">
                    Customer
                  </th>

                  <th className="px-5 py-3 font-medium">
                    Status
                  </th>

                  <th className="px-5 py-3 text-right font-medium">
                    Total
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-100">
                {recentOrders.map(
                  (order) => (
                    <tr
                      key={
                        order.id
                      }
                      className="text-sm"
                    >
                      <td className="px-5 py-4 font-medium">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="transition hover:text-[#a26b42]"
                        >
                          {
                            order.orderNumber
                          }
                        </Link>
                      </td>

                      <td className="px-5 py-4 text-neutral-600">
                        {
                          order.customerName
                        }
                      </td>

                      <td className="px-5 py-4">
                        <span className="bg-neutral-100 px-2.5 py-1 text-xs font-medium capitalize">
                          {formatStatus(
                            order.status
                          )}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right font-medium">
                        {formatCurrency(
                          order.total
                        )}
                      </td>
                    </tr>
                  )
                )}

                {recentOrders.length ===
                  0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-5 py-12 text-center text-sm text-neutral-500"
                    >
                      No orders have
                      been placed yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Real Activity */}
        <section className="border border-neutral-200 bg-white">
          <div className="border-b border-neutral-200 px-5 py-4">
            <h2 className="font-display text-xl font-semibold">
              Store activity
            </h2>

            <p className="mt-1 text-xs text-neutral-500">
              Current store updates
              and alerts
            </p>
          </div>

          <div className="divide-y divide-neutral-100">

            {latestOrder && (
              <ActivityItem
                icon={
                  ShoppingCart
                }
                title="Latest order"
                description={`${latestOrder.orderNumber} was placed by ${latestOrder.customerName}`}
              />
            )}

            {lowStockItems.length >
              0 && (
              <ActivityItem
                icon={
                  Package
                }
                title="Stock alert"
                description={
                  lowStockItems.length ===
                  1
                    ? `${lowStockItems[0].productName} has ${lowStockItems[0].stock} units remaining`
                    : `${lowStockItems.length} products need stock attention`
                }
              />
            )}

            {newestCustomer && (
              <ActivityItem
                icon={
                  Users
                }
                title="Latest customer"
                description={`${newestCustomer.name} joined the store`}
              />
            )}

            {!latestOrder &&
              lowStockItems.length ===
                0 &&
              !newestCustomer && (
                <div className="p-8 text-center">
                  <p className="text-sm text-neutral-500">
                    No recent store
                    activity.
                  </p>
                </div>
              )}
          </div>
        </section>
      </div>
    </div>
  );
}

type ActivityItemProps = {
  icon:
    typeof ShoppingCart;

  title: string;

  description: string;
};

function ActivityItem({
  icon: Icon,
  title,
  description,
}: ActivityItemProps) {
  return (
    <div className="flex gap-4 p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#f8f3ef] text-[#a26b42]">
        <Icon
          size={18}
        />
      </div>

      <div>
        <p className="text-sm font-medium">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-neutral-500">
          {description}
        </p>
      </div>
    </div>
  );
}

function formatStatus(
  status: string
) {
  return status
    .toLowerCase()
    .replaceAll(
      "_",
      " "
    )
    .replace(
      /\b\w/g,
      (character) =>
        character.toUpperCase()
    );
}