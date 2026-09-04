"use client";

import type {
  ReactNode,
} from "react";

import {
  Home,
} from "lucide-react";

import Link from "next/link";

import {
  useEffect,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  AccountSidebar,
} from "@/components/layout/account-sidebar";

import {
  useAuth,
} from "@/components/providers/auth-provider";

export default function AccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router =
    useRouter();

  const {
    initialized,
    authenticated,
  } = useAuth();

  useEffect(() => {
    if (
      initialized &&
      !authenticated
    ) {
      router.replace(
        "/login"
      );
    }
  }, [
    initialized,
    authenticated,
    router,
  ]);

  if (!initialized) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#faf9f7]">
        <p className="text-sm text-neutral-500">
          Loading account...
        </p>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#faf9f7]">
        <p className="text-sm text-neutral-500">
          Redirecting to login...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
                Customer Area
              </p>

              <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight">
                My Account
              </h1>
            </div>

            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center gap-2 self-start border border-[#a26b42] px-5 text-sm font-medium text-[#a26b42] transition hover:bg-[#a26b42] hover:text-white sm:self-auto"
            >
              <Home
                size={17}
              />

              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
        <div>
          <AccountSidebar />
        </div>

        <div className="min-w-0">
          {children}
        </div>
      </section>
    </main>
  );
}