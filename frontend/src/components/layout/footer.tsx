import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              className="font-display text-2xl font-bold tracking-[0.15em]"
            >
              MODEVA
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-neutral-400">
              Modern clothing, everyday essentials, and timeless pieces made
              for effortless style.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">
              Shop
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-neutral-400">
              <Link href="/shop">
                All Products
              </Link>

              <Link href="/shop?category=women">
                Women
              </Link>

              <Link href="/shop?category=men">
                Men
              </Link>

              <Link href="/shop?category=accessories">
                Accessories
              </Link>

              <Link href="/shop?sort=newest">
                New Arrivals
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold">
              Customer
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-neutral-400">
              <Link href="/account">
                My Account
              </Link>

              <Link href="/account/orders">
                Orders
              </Link>

              <Link href="/wishlist">
                Wishlist
              </Link>

              <Link href="/cart">
                Cart
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold">
              Stay Updated
            </h3>

            <p className="mt-4 text-sm leading-6 text-neutral-400">
              Get updates on new collections and offers.
            </p>

            <div className="mt-5 flex">
              <input
                type="email"
                placeholder="Email address"
                className="min-w-0 flex-1 border border-neutral-700 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-neutral-500"
              />

              <button
                type="button"
                className="bg-white px-5 text-sm font-medium text-black transition hover:bg-neutral-200"
              >
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-neutral-800 pt-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 MODEVA. All rights reserved.
          </p>

          <div className="flex gap-5">
            <Link href="#">
              Privacy
            </Link>

            <Link href="#">
              Terms
            </Link>

            <Link href="#">
              Shipping
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}