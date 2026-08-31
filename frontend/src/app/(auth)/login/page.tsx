"use client";

import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <section className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-2">
        {/* Left Side */}
        <div className="hidden bg-neutral-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <Link
            href="/"
            className="font-display text-2xl font-bold tracking-[0.15em]"
          >
            MODEVA
          </Link>

          <div className="max-w-md">
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-400">
              Welcome Back
            </p>

            <h1 className="font-display mt-4 text-5xl font-semibold leading-tight">
              Your wardrobe,
              <span className="block">
                all in one place.
              </span>
            </h1>

            <p className="mt-5 leading-7 text-neutral-400">
              Sign in to manage your orders,
              wishlist, addresses, and account
              details.
            </p>
          </div>

          <p className="text-sm text-neutral-500">
            © 2026 MODEVA
          </p>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-12">
          <div className="w-full max-w-md">
            <Link
              href="/"
              className="font-display mb-10 block text-center text-2xl font-bold tracking-[0.15em] lg:hidden"
            >
              MODEVA
            </Link>

            <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
              Account
            </p>

            <h2 className="font-display mt-3 text-4xl font-semibold tracking-tight">
              Sign in
            </h2>

            <p className="mt-3 text-sm leading-6 text-neutral-500">
              Enter your account details to
              continue.
            </p>

            <form className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  />

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="h-12 w-full border border-neutral-300 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-neutral-950"
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-medium text-neutral-500 underline underline-offset-4"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  />

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter password"
                    className="h-12 w-full border border-neutral-300 bg-white pl-11 pr-12 text-sm outline-none transition focus:border-neutral-950"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (value) => !value
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-neutral-600">
                <input
                  type="checkbox"
                  className="h-4 w-4"
                />

                Remember me
              </label>

              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center bg-neutral-950 text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                Sign In
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-neutral-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-neutral-950 underline underline-offset-4"
              >
                Create account
              </Link>
            </p>

            <div className="mt-8 text-center">
              <Link
                href="/"
                className="text-sm text-neutral-500 underline underline-offset-4"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}