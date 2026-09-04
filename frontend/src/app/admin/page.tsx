import {
  ArrowRight,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

import Link from "next/link";

import {
  DashboardStats,
} from "@/components/admin/dashboard-stats";

import {
  formatCurrency,
} from "@/lib/formatters";

const recentOrders = [
  {
    id: "MOD-284913",
    customer: "Nimal Perera",
    total: 15400,
    status: "Shipped",
  },
  {
    id: "MOD-731506",
    customer: "Amaya Silva",
    total: 9800,
    status: "Delivered",
  },
  {
    id: "MOD-420815",
    customer: "Kasun Fernando",
    total: 19600,
    status: "Processing",
  },
  {
    id: "MOD-190328",
    customer: "Dinithi Jayasuriya",
    total: 7200,
    status: "Confirmed",
  },
];

const activity = [
  {
    title: "New order received",
    description: "MOD-420815 was placed",
    icon: ShoppingCart,
  },
  {
    title: "Low stock",
    description:
      "Classic Linen Shirt has 4 units remaining",
    icon: Package,
  },
  {
    title: "New customer",
    description:
      "A new customer account was created",
    icon: Users,
  },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
            Overview
          </p>

          <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Dashboard
          </h1>

          <p className="mt-2 text-sm leading-6 text-neutral-500">
            Monitor store performance, orders,
            inventory, and customers.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex h-11 items-center justify-center bg-[#a26b42] px-5 text-sm font-medium text-white transition hover:bg-[#8d5c39]"
        >
          Add Product
        </Link>
      </div>

      <div className="mt-8">
        <DashboardStats />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_0.8fr]">
        <section className="border border-neutral-200 bg-white">
          <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
            <div>
              <h2 className="font-display text-xl font-semibold">
                Recent orders
              </h2>

              <p className="mt-1 text-xs text-neutral-500">
                Latest orders placed in the store
              </p>
            </div>

            <Link
              href="/admin/orders"
              className="flex items-center gap-1 text-sm font-medium text-[#a26b42] transition hover:text-[#8d5c39]"
            >
              View all
              <ArrowRight size={15} />
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
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="text-sm"
                  >
                    <td className="px-5 py-4 font-medium">
                      {order.id}
                    </td>

                    <td className="px-5 py-4 text-neutral-600">
                      {order.customer}
                    </td>

                    <td className="px-5 py-4">
                      <span className="bg-neutral-100 px-2.5 py-1 text-xs font-medium">
                        {order.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right font-medium">
                      {formatCurrency(order.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="border border-neutral-200 bg-white">
          <div className="border-b border-neutral-200 px-5 py-4">
            <h2 className="font-display text-xl font-semibold">
              Recent activity
            </h2>

            <p className="mt-1 text-xs text-neutral-500">
              Store updates and alerts
            </p>
          </div>

          <div className="divide-y divide-neutral-100">
            {activity.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex gap-4 p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#f8f3ef] text-[#a26b42]">
                    <Icon size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-medium">
                      {item.title}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-neutral-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}