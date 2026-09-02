"use client";

import {
  Heart,
  LogOut,
  MapPin,
  Package,
  UserRound,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  useAuth,
} from "@/components/providers/auth-provider";

const accountLinks = [
  {
    label: "Overview",
    href: "/account",
    icon: UserRound,
  },
  {
    label: "Profile",
    href: "/account/profile",
    icon: UserRound,
  },
  {
    label: "Orders",
    href: "/account/orders",
    icon: Package,
  },
  {
    label: "Addresses",
    href: "/account/addresses",
    icon: MapPin,
  },
  {
    label: "Wishlist",
    href: "/account/wishlist",
    icon: Heart,
  },
];

export function AccountSidebar() {
  const pathname =
    usePathname();

  const {
    logout,
    username,
  } = useAuth();

  return (
    <aside className="border border-neutral-200 bg-white p-5">
      <div className="border-b border-neutral-200 pb-5">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
          My Account
        </p>

        <h2 className="font-display mt-2 text-xl font-semibold">
          Welcome back
          {username
            ? `, ${username}`
            : ""}
        </h2>
      </div>

      <nav className="mt-5 flex flex-col gap-1">
        {accountLinks.map(
          (item) => {
            const Icon =
              item.icon;

            const active =
              pathname ===
                item.href ||
              (
                item.href !==
                  "/account" &&
                pathname.startsWith(
                  `${item.href}/`
                )
              );

            return (
              <Link
                key={
                  item.href
                }
                href={
                  item.href
                }
                className={`flex items-center gap-3 px-3 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-[#a26b42] text-white"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950"
                }`}
              >
                <Icon
                  size={18}
                />

                {
                  item.label
                }
              </Link>
            );
          }
        )}
      </nav>

      <div className="mt-6 border-t border-neutral-200 pt-5">
        <button
          type="button"
          onClick={
            logout
          }
          className="flex w-full items-center gap-3 px-3 py-3 text-sm font-medium text-neutral-500 transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut
            size={18}
          />

          Sign out
        </button>
      </div>
    </aside>
  );
}