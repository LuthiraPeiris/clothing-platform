import {
  Heart,
  MapPin,
  Package,
  UserRound,
} from "lucide-react";

import Link from "next/link";

const cards = [
  {
    title: "Profile",
    description:
      "Manage your personal details and account information.",
    href: "/account/profile",
    icon: UserRound,
  },
  {
    title: "Orders",
    description:
      "View your order history and track current purchases.",
    href: "/account/orders",
    icon: Package,
  },
  {
    title: "Addresses",
    description:
      "Manage your saved shipping and billing addresses.",
    href: "/account/addresses",
    icon: MapPin,
  },
  {
    title: "Wishlist",
    description:
      "View the products you saved for later.",
    href: "/account/wishlist",
    icon: Heart,
  },
];

export default function AccountPage() {
  return (
    <div>
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
          Overview
        </p>

        <h2 className="font-display mt-2 text-3xl font-semibold">
          Account dashboard
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-500">
          Manage your profile, orders,
          addresses, and saved products
          from one place.
        </p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {cards.map((card) => {
          const Icon =
            card.icon;

          return (
            <Link
              key={
                card.href
              }
              href={
                card.href
              }
              className="group border border-neutral-200 bg-white p-6 transition duration-200 hover:border-[#a26b42] hover:shadow-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center bg-[#f5eee8] text-[#a26b42] transition duration-200 group-hover:bg-[#a26b42] group-hover:text-white">
                <Icon
                  size={20}
                />
              </div>

              <h3 className="font-display mt-5 text-xl font-semibold text-neutral-950">
                {
                  card.title
                }
              </h3>

              <p className="mt-2 text-sm leading-6 text-neutral-500">
                {
                  card.description
                }
              </p>

              <span className="mt-5 inline-block text-sm font-medium text-[#a26b42] underline underline-offset-4 transition group-hover:text-[#8f5d39]">
                Manage
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}