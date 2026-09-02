"use client";

import {
  Heart,
  LogIn,
  Menu,
  Search,
  ShoppingBag,
  User,
  UserPlus,
  X,
} from "lucide-react";

import Link from "next/link";

import {
  useState,
} from "react";

import {
  useAuth,
} from "@/components/providers/auth-provider";

import {
  useCart,
} from "@/hooks/use-cart";

export function Navbar() {
  const [
    mobileMenuOpen,
    setMobileMenuOpen,
  ] = useState(false);

  const {
    totalItems,
  } = useCart();

  const {
    initialized,
    authenticated,
  } = useAuth();

  return (
    <>
      <div className="bg-neutral-950 px-4 py-2 text-center text-xs text-white sm:text-sm">
        Free shipping on orders over Rs. 10,000
      </div>

      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() =>
              setMobileMenuOpen(
                true
              )
            }
            className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-950 lg:hidden"
            aria-label="Open menu"
          >
            <Menu
              size={21}
            />
          </button>

          <Link
            href="/"
            className="font-display text-xl font-bold tracking-[0.15em] sm:text-2xl"
          >
            MODEVA
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            <DesktopNavLink
              href="/"
              label="Home"
            />

            <DesktopNavLink
              href="/shop"
              label="Shop"
            />

            <DesktopNavLink
              href="/shop?category=men"
              label="Men"
            />

            <DesktopNavLink
              href="/shop?category=women"
              label="Women"
            />

            <DesktopNavLink
              href="/shop?sort=newest"
              label="New Arrivals"
            />
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <IconLink
              href="/search"
              label="Search"
            >
              <Search
                size={20}
              />
            </IconLink>

            <div className="hidden sm:block">
              <IconLink
                href="/wishlist"
                label="Wishlist"
              >
                <Heart
                  size={20}
                />
              </IconLink>
            </div>

            {initialized &&
              authenticated && (
                <div className="hidden sm:block">
                  <IconLink
                    href="/account"
                    label="My Account"
                  >
                    <User
                      size={20}
                    />
                  </IconLink>
                </div>
              )}

            {initialized &&
              !authenticated && (
                <div className="hidden items-center gap-2 md:flex">
                  <Link
                    href="/login"
                    className="inline-flex h-10 items-center justify-center gap-2 px-3 text-sm font-medium text-neutral-700 transition hover:text-neutral-950"
                  >
                    <LogIn
                      size={17}
                    />

                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="inline-flex h-10 items-center justify-center bg-[#a26b42] px-4 text-sm font-medium text-white transition hover:bg-[#8f5d39] hover:text-white"
                  >
                    Register
                  </Link>
                </div>
              )}

            <Link
              href="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-950"
              aria-label={`Cart with ${totalItems} items`}
            >
              <ShoppingBag
                size={20}
              />

              {totalItems > 0 && (
                <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-neutral-950 px-1 text-[10px] font-semibold text-white">
                  {totalItems > 99
                    ? "99+"
                    : totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            onClick={() =>
              setMobileMenuOpen(
                false
              )
            }
            aria-label="Close menu"
          />

          <div className="relative h-full w-[85%] max-w-sm overflow-y-auto bg-white px-6 py-6 shadow-xl">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                onClick={() =>
                  setMobileMenuOpen(
                    false
                  )
                }
                className="font-display text-xl font-bold tracking-[0.15em]"
              >
                MODEVA
              </Link>

              <button
                type="button"
                onClick={() =>
                  setMobileMenuOpen(
                    false
                  )
                }
                className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-950"
                aria-label="Close menu"
              >
                <X
                  size={21}
                />
              </button>
            </div>

            <nav className="mt-10 flex flex-col">
              <MobileNavLink
                href="/"
                label="Home"
                onClick={() =>
                  setMobileMenuOpen(
                    false
                  )
                }
              />

              <MobileNavLink
                href="/shop"
                label="Shop"
                onClick={() =>
                  setMobileMenuOpen(
                    false
                  )
                }
              />

              <MobileNavLink
                href="/shop?category=men"
                label="Men"
                onClick={() =>
                  setMobileMenuOpen(
                    false
                  )
                }
              />

              <MobileNavLink
                href="/shop?category=women"
                label="Women"
                onClick={() =>
                  setMobileMenuOpen(
                    false
                  )
                }
              />

              <MobileNavLink
                href="/shop?sort=newest"
                label="New Arrivals"
                onClick={() =>
                  setMobileMenuOpen(
                    false
                  )
                }
              />
            </nav>

            <div className="mt-8 border-t border-neutral-200 pt-6">
              {initialized &&
                authenticated && (
                  <Link
                    href="/account"
                    onClick={() =>
                      setMobileMenuOpen(
                        false
                      )
                    }
                    className="flex items-center gap-3 py-3 text-sm font-medium text-neutral-700 transition hover:text-neutral-950"
                  >
                    <User
                      size={19}
                    />

                    My Account
                  </Link>
                )}

              {initialized &&
                !authenticated && (
                  <>
                    <Link
                      href="/login"
                      onClick={() =>
                        setMobileMenuOpen(
                          false
                        )
                      }
                      className="flex items-center gap-3 py-3 text-sm font-medium text-neutral-700 transition hover:text-neutral-950"
                    >
                      <LogIn
                        size={19}
                      />

                      Login
                    </Link>

                    <Link
                      href="/register"
                      onClick={() =>
                        setMobileMenuOpen(
                          false
                        )
                      }
                      className="flex items-center gap-3 py-3 text-sm font-medium text-neutral-700 transition hover:text-neutral-950"
                    >
                      <UserPlus
                        size={19}
                      />

                      Register
                    </Link>
                  </>
                )}

              <Link
                href="/wishlist"
                onClick={() =>
                  setMobileMenuOpen(
                    false
                  )
                }
                className="flex items-center gap-3 py-3 text-sm font-medium text-neutral-700 transition hover:text-neutral-950"
              >
                <Heart
                  size={19}
                />

                Wishlist
              </Link>

              <Link
                href="/cart"
                onClick={() =>
                  setMobileMenuOpen(
                    false
                  )
                }
                className="flex items-center justify-between py-3 text-sm font-medium text-neutral-700 transition hover:text-neutral-950"
              >
                <span className="flex items-center gap-3">
                  <ShoppingBag
                    size={19}
                  />

                  Shopping Cart
                </span>

                {totalItems >
                  0 && (
                  <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-neutral-950 px-1.5 text-xs font-semibold text-white">
                    {totalItems >
                    99
                      ? "99+"
                      : totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function DesktopNavLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-neutral-700 transition hover:text-neutral-950"
    >
      {label}
    </Link>
  );
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children:
    React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-950"
      aria-label={label}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="border-b border-neutral-100 py-4 text-lg font-medium text-neutral-700 transition hover:text-neutral-950"
    >
      {label}
    </Link>
  );
}