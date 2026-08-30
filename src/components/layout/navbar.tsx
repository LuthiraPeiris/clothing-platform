"use client";

import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-neutral-950 px-4 py-2 text-center text-xs text-white sm:text-sm">
        Free shipping on orders over Rs. 10,000
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() =>
              setMobileMenuOpen(true)
            }
            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-neutral-100 lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={21} />
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="font-display text-xl font-bold tracking-[0.15em] sm:text-2xl"
          >
            MODEVA
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            <Link
              href="/"
              className="text-sm font-medium text-neutral-700 transition hover:text-black"
            >
              Home
            </Link>

            <Link
              href="/shop"
              className="text-sm font-medium text-neutral-700 transition hover:text-black"
            >
              Shop
            </Link>

            <Link
              href="/shop?category=men"
              className="text-sm font-medium text-neutral-700 transition hover:text-black"
            >
              Men
            </Link>

            <Link
              href="/shop?category=women"
              className="text-sm font-medium text-neutral-700 transition hover:text-black"
            >
              Women
            </Link>

            <Link
              href="/shop?sort=newest"
              className="text-sm font-medium text-neutral-700 transition hover:text-black"
            >
              New Arrivals
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/search"
              className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-neutral-100"
              aria-label="Search"
            >
              <Search size={20} />
            </Link>

            <Link
              href="/wishlist"
              className="hidden h-10 w-10 items-center justify-center rounded-full transition hover:bg-neutral-100 sm:flex"
              aria-label="Wishlist"
            >
              <Heart size={20} />
            </Link>

            <Link
              href="/account"
              className="hidden h-10 w-10 items-center justify-center rounded-full transition hover:bg-neutral-100 sm:flex"
              aria-label="Account"
            >
              <User size={20} />
            </Link>

            <Link
              href="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-neutral-100"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />

              <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] font-semibold text-white">
                0
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          {/* Overlay */}
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            onClick={() =>
              setMobileMenuOpen(false)
            }
            aria-label="Close menu"
          />

          {/* Drawer */}
          <div className="relative h-full w-[85%] max-w-sm bg-white px-6 py-6 shadow-xl">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
                className="font-display text-xl font-bold tracking-[0.15em]"
              >
                MODEVA
              </Link>

              <button
                type="button"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
                className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-neutral-100"
                aria-label="Close menu"
              >
                <X size={21} />
              </button>
            </div>

            <nav className="mt-10 flex flex-col">
              <MobileNavLink
                href="/"
                label="Home"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
              />

              <MobileNavLink
                href="/shop"
                label="Shop"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
              />

              <MobileNavLink
                href="/shop?category=men"
                label="Men"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
              />

              <MobileNavLink
                href="/shop?category=women"
                label="Women"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
              />

              <MobileNavLink
                href="/shop?sort=newest"
                label="New Arrivals"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
              />
            </nav>

            <div className="mt-8 border-t border-neutral-200 pt-6">
              <Link
                href="/account"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
                className="flex items-center gap-3 py-3 text-sm font-medium"
              >
                <User size={19} />
                My Account
              </Link>

              <Link
                href="/wishlist"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
                className="flex items-center gap-3 py-3 text-sm font-medium"
              >
                <Heart size={19} />
                Wishlist
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
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
      className="border-b border-neutral-100 py-4 text-lg font-medium"
    >
      {label}
    </Link>
  );
}