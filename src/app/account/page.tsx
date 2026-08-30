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
          const Icon = card.icon;

          return (
            <Link
              key={card.href}
              href={card.href}
              className="group border border-neutral-200 bg-white p-6 transition hover:border-neutral-400"
            >
              <div className="flex h-11 w-11 items-center justify-center bg-neutral-100 transition group-hover:bg-neutral-950 group-hover:text-white">
                <Icon size={20} />
              </div>

              <h3 className="font-display mt-5 text-xl font-semibold">
                {card.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-neutral-500">
                {card.description}
              </p>

              <span className="mt-5 inline-block text-sm font-medium underline underline-offset-4">
                Manage
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}