import {
  DollarSign,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

import {
  formatCurrency,
} from "@/lib/formatters";

const stats = [
  {
    label: "Total Revenue",
    value: formatCurrency(428500),
    change: "+12.4%",
    icon: DollarSign,
  },
  {
    label: "Orders",
    value: "184",
    change: "+8.1%",
    icon: ShoppingCart,
  },
  {
    label: "Products",
    value: "68",
    change: "+4",
    icon: Package,
  },
  {
    label: "Customers",
    value: "1,248",
    change: "+14.7%",
    icon: Users,
  },
];

export function DashboardStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="border border-neutral-200 bg-white p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-10 w-10 items-center justify-center bg-neutral-100">
                <Icon size={19} />
              </div>

              <span className="text-xs font-medium text-green-600">
                {stat.change}
              </span>
            </div>

            <p className="mt-5 text-sm text-neutral-500">
              {stat.label}
            </p>

            <p className="font-display mt-2 text-2xl font-semibold">
              {stat.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}