"use client";

import {
  Bell,
  Search,
  UserRound,
} from "lucide-react";

import {
  useRouter,
} from "next/navigation";

import {
  useEffect,
} from "react";

import {
  AdminSidebar,
} from "@/components/layout/admin-sidebar";

import {
  useAuth,
} from "@/components/providers/auth-provider";

import {
  Input,
} from "@/components/ui/input";

import {
  Spinner,
} from "@/components/ui/spinner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router =
    useRouter();

  const {
    initialized,
    authenticated,
    isAdmin,
    username,
  } = useAuth();

  useEffect(() => {
    if (!initialized) {
      return;
    }

    /*
     * Not logged in.
     */
    if (!authenticated) {
      router.replace(
        "/login"
      );

      return;
    }

    /*
     * Logged in but does not
     * have the ADMIN role.
     */
    if (!isAdmin) {
      router.replace(
        "/account"
      );
    }
  }, [
    initialized,
    authenticated,
    isAdmin,
    router,
  ]);

  /*
   * Wait until Keycloak finishes
   * checking the current session.
   */
  if (!initialized) {
    return (
      <AdminLoadingScreen
        message="Checking your account..."
      />
    );
  }

  /*
   * Prevent admin content from
   * flashing before redirect.
   */
  if (
    !authenticated ||
    !isAdmin
  ) {
    return (
      <AdminLoadingScreen
        message="Redirecting..."
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f5] lg:grid lg:grid-cols-[260px_1fr]">
      {/* Sidebar */}
      <div className="hidden lg:block">
        <div className="fixed inset-y-0 left-0 w-[260px]">
          <AdminSidebar />
        </div>
      </div>

      {/* Main area */}
      <div className="min-w-0">
        <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur">
          <div className="flex h-18 items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
            {/* Search */}
            <div className="relative hidden max-w-md flex-1 md:block">
              <Search
                size={17}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-neutral-400"
              />

              <Input
                type="search"
                placeholder="Search products, orders, customers..."
                className="h-11 bg-neutral-50 pl-11 focus:bg-white"
              />
            </div>

            {/* Admin actions */}
            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                className="relative flex h-10 w-10 items-center justify-center border border-neutral-200 bg-white text-neutral-600 transition hover:border-[#a26b42] hover:bg-[#f8f3ef] hover:text-[#a26b42]"
                aria-label="Notifications"
              >
                <Bell
                  size={18}
                />

                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
              </button>

              {/* Admin identity */}
              <div className="flex items-center gap-3 border border-neutral-200 bg-white px-3 py-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#a26b42] text-white">
                  <UserRound
                    size={16}
                  />
                </div>

                <div className="hidden sm:block">
                  <p className="text-xs font-semibold text-neutral-950">
                    {username ||
                      "Admin"}
                  </p>

                  <p className="text-[11px] text-[#a26b42]">
                    Administrator
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}

function AdminLoadingScreen({
  message,
}: {
  message: string;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f7f5]">
      <div className="flex flex-col items-center">
        <Spinner
          size="lg"
        />

        <p className="mt-4 text-sm text-neutral-500">
          {message}
        </p>
      </div>
    </div>
  );
}