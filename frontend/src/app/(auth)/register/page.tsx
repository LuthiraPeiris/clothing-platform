"use client";

import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  User,
} from "lucide-react";

import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
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
              Join MODEVA
            </p>

            <h1 className="font-display mt-4 text-5xl font-semibold leading-tight">
              Create your
              <span className="block">
                personal wardrobe.
              </span>
            </h1>

            <p className="mt-5 leading-7 text-neutral-400">
              Save your favorite pieces,
              track orders, manage addresses,
              and enjoy a faster checkout.
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
              Create Account
            </p>

            <h2 className="font-display mt-3 text-4xl font-semibold tracking-tight">
              Register
            </h2>

            <p className="mt-3 text-sm leading-6 text-neutral-500">
              Create your account to start
              shopping.
            </p>

            <form className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium"
                >
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  />

                  <input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    className="h-12 w-full border border-neutral-300 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-neutral-950"
                  />
                </div>
              </div>

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
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium"
                >
                  Password
                </label>

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
                    placeholder="Create password"
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

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium"
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  />

                  <input
                    id="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm password"
                    className="h-12 w-full border border-neutral-300 bg-white pl-11 pr-12 text-sm outline-none transition focus:border-neutral-950"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (value) => !value
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400"
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <label className="flex items-start gap-2 text-sm leading-6 text-neutral-600">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4"
                />

                <span>
                  I agree to the Terms and
                  Privacy Policy.
                </span>
              </label>

              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center bg-neutral-950 text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                Create Account
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-neutral-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-neutral-950 underline underline-offset-4"
              >
                Sign in
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