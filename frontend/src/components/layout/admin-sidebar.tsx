"use client";

import {
  Boxes,
  LayoutDashboard,
  LogOut,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

const adminLinks = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    label: "Inventory",
    href: "/admin/inventory",
    icon: Boxes,
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    label: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full flex-col bg-neutral-950 text-white">
      <div className="border-b border-neutral-800 px-6 py-6">
        <Link
          href="/admin"
          className="font-display text-2xl font-bold tracking-[0.15em]"
        >
          MODEVA
        </Link>

        <p className="mt-2 text-xs uppercase tracking-[0.18em] text-neutral-500">
          Admin Panel
        </p>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-6">
        {adminLinks.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            (
              item.href !== "/admin" &&
              pathname.startsWith(`${item.href}/`)
            );

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-white text-neutral-950"
                  : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-neutral-800 p-4">
        <button
          type="button"
          className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-400 transition hover:bg-red-950/30 hover:text-red-400"
        >
          <LogOut size={18} />
          Sign out
        </button>
      </div>
    </aside>
  );
}