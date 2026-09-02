"use client";

import {
  UserPlus,
} from "lucide-react";

import Link from "next/link";

import {
  useAuth,
} from "@/components/providers/auth-provider";

export default function RegisterPage() {
  const {
    initialized,
    authenticated,
    username,
    register,
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
            Account ready
          </h1>

          <p className="mt-3 text-sm text-neutral-500">
            You&apos;re signed in as{" "}
            <span className="font-medium text-neutral-950">
              {username}
            </span>
          </p>

          <Link
            href="/account"
            className="mt-7 flex h-12 w-full items-center justify-center bg-neutral-950 px-5 text-sm font-medium text-white"
          >
            Go to My Account
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#faf9f7] px-4 py-16">
      <div className="w-full max-w-md border border-neutral-200 bg-white p-8 sm:p-10">
        <div className="flex h-12 w-12 items-center justify-center bg-neutral-950 text-white">
          <UserPlus
            size={20}
          />
        </div>

        <p className="mt-7 text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
          Join MODEVA
        </p>

        <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight">
          Create your account
        </h1>

        <p className="mt-3 text-sm leading-6 text-neutral-500">
          Create an account to track
          orders, manage your profile,
          and access your purchases.
        </p>

        <button
          type="button"
          onClick={register}
          className="mt-8 flex h-12 w-full items-center justify-center bg-neutral-950 px-5 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          Continue to Registration
        </button>

        <p className="mt-6 text-center text-sm text-neutral-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-neutral-950 underline underline-offset-4"
          >
            Sign in
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