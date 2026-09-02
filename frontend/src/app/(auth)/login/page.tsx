"use client";

import {
  LogIn,
} from "lucide-react";

import Link from "next/link";

import {
  useAuth,
} from "@/components/providers/auth-provider";

export default function LoginPage() {
  const {
    initialized,
    authenticated,
    username,
    login,
    logout,
  } = useAuth();

  if (!initialized) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#faf9f7]">
        <p className="text-sm text-neutral-500">
          Loading...
        </p>
      </main>
    );
  }

  if (authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#faf9f7] px-4">
        <div className="w-full max-w-md border border-neutral-200 bg-white p-8 text-center">
          <h1 className="font-display text-3xl font-semibold">
            You&apos;re signed in
          </h1>

          <p className="mt-3 text-sm text-neutral-500">
            Signed in as{" "}
            <span className="font-medium text-neutral-950">
              {username}
            </span>
          </p>

          <div className="mt-7 space-y-3">
            <Link
              href="/account"
              className="flex h-12 w-full items-center justify-center bg-neutral-950 px-5 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              Go to My Account
            </Link>

            <button
              type="button"
              onClick={logout}
              className="flex h-12 w-full items-center justify-center border border-neutral-300 bg-white px-5 text-sm font-medium transition hover:border-neutral-950"
            >
              Sign Out
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#faf9f7] px-4 py-16">
      <div className="w-full max-w-md border border-neutral-200 bg-white p-8 sm:p-10">
        <div className="flex h-12 w-12 items-center justify-center bg-neutral-950 text-white">
          <LogIn
            size={20}
          />
        </div>

        <p className="mt-7 text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
          Welcome Back
        </p>

        <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight">
          Sign in to MODEVA
        </h1>

        <p className="mt-3 text-sm leading-6 text-neutral-500">
          Sign in to view your orders,
          manage your profile, and access
          your account.
        </p>

        <button
          type="button"
          onClick={login}
          className="mt-8 flex h-12 w-full items-center justify-center bg-neutral-950 px-5 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          Continue to Sign In
        </button>

        <p className="mt-6 text-center text-sm text-neutral-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-neutral-950 underline underline-offset-4"
          >
            Create one
          </Link>
        </p>

        <Link
          href="/"
          className="mt-6 block text-center text-sm text-neutral-500 underline underline-offset-4"
        >
          Back to store
        </Link>
      </div>
    </main>
  );
}