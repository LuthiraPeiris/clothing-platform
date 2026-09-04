import {
  DollarSign,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

import {
  formatCurrency,
} from "@/lib/formatters";

type DashboardStatsProps = {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
};

export function DashboardStats({
  totalRevenue,
  totalOrders,
  totalProducts,
  totalCustomers,
}: DashboardStatsProps) {
  const stats = [
    {
      label:
        "Total Revenue",

      value:
        formatCurrency(
          totalRevenue
        ),

      icon:
        DollarSign,
    },
    {
      label:
        "Orders",

      value:
        totalOrders
          .toString(),

      icon:
        ShoppingCart,
    },
    {
      label:
        "Products",

      value:
        totalProducts
          .toString(),

      icon:
        Package,
    },
    {
      label:
        "Customers",

      value:
        totalCustomers
          .toString(),

      icon:
        Users,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
  );
}