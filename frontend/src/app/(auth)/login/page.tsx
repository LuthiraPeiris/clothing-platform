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

  if (
    !initialized
  ) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#faf9f7]">
        <p className="text-sm text-neutral-500">
          Loading...
        </p>
      </main>
    );
  }

  if (
    authenticated
  ) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#faf9f7] px-4 py-16">
        <div className="w-full max-w-md border border-neutral-200 bg-white p-8 text-center shadow-sm sm:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center bg-[#f8f3ef] text-[#a26b42]">
            <LogIn
              size={22}
            />
          </div>

          <p className="mt-6 text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
            Account
          </p>

          <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight text-neutral-950">
            You&apos;re signed in
          </h1>

          <p className="mt-3 text-sm leading-6 text-neutral-500">
            Signed in as{" "}
            <span className="font-medium text-neutral-950">
              {
                username
              }
            </span>
          </p>

          <div className="mt-8 space-y-3">
            <Link
              href="/account"
              className="flex h-12 w-full items-center justify-center bg-[#a26b42] px-5 text-sm font-medium text-white transition hover:bg-[#8d5c39]"
            >
              Go to My Account
            </Link>

            <button
              type="button"
              onClick={
                logout
              }
              className="flex h-12 w-full items-center justify-center border border-neutral-300 bg-white px-5 text-sm font-medium text-neutral-950 transition hover:border-[#a26b42] hover:text-[#a26b42]"
            >
              Sign Out
            </button>
          </div>

          <Link
            href="/"
            className="mt-6 block text-sm font-medium text-neutral-500 transition hover:text-[#a26b42]"
          >
            Back to store
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#faf9f7] px-4 py-16">
      <div className="w-full max-w-md border border-neutral-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="flex h-12 w-12 items-center justify-center bg-[#f8f3ef] text-[#a26b42]">
          <LogIn
            size={20}
          />
        </div>

        <p className="mt-7 text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
          Welcome Back
        </p>

        <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight text-neutral-950">
          Sign in to MODEVA
        </h1>

        <p className="mt-3 text-sm leading-6 text-neutral-500">
          Sign in to view your orders,
          manage your profile, and access
          your account.
        </p>

        <button
          type="button"
          onClick={
            login
          }
          className="mt-8 flex h-12 w-full items-center justify-center gap-2 bg-[#a26b42] px-5 text-sm font-medium text-white transition hover:bg-[#8d5c39]"
        >
          <LogIn
            size={17}
          />

          Continue to Sign In
        </button>

        <div className="mt-6 border-t border-neutral-200 pt-6">
          <p className="text-center text-sm text-neutral-500">
            Don&apos;t have an account?{" "}

            <Link
              href="/register"
              className="font-medium text-[#a26b42] underline decoration-[#a26b42]/40 underline-offset-4 transition hover:text-[#8d5c39]"
            >
              Create one
            </Link>
          </p>
        </div>

        <Link
          href="/"
          className="mt-6 block text-center text-sm font-medium text-neutral-500 transition hover:text-[#a26b42]"
        >
          Back to store
        </Link>
      </div>
    </main>
  );
}