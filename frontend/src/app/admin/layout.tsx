import {
  Bell,
  Search,
  UserRound,
} from "lucide-react";

import {
  AdminSidebar,
} from "@/components/layout/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f7f7f5] lg:grid lg:grid-cols-[260px_1fr]">
      <div className="hidden lg:block">
        <div className="fixed inset-y-0 left-0 w-[260px]">
          <AdminSidebar />
        </div>
      </div>

      <div className="min-w-0">
        <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur">
          <div className="flex h-18 items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
            <div className="relative hidden max-w-md flex-1 md:block">
              <Search
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              />

              <input
                type="search"
                placeholder="Search products, orders, customers..."
                className="h-11 w-full border border-neutral-200 bg-neutral-50 pl-11 pr-4 text-sm outline-none transition focus:border-neutral-950 focus:bg-white"
              />
            </div>

            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                className="relative flex h-10 w-10 items-center justify-center border border-neutral-200 bg-white transition hover:bg-neutral-50"
                aria-label="Notifications"
              >
                <Bell size={18} />

                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
              </button>

              <div className="flex items-center gap-3 border border-neutral-200 bg-white px-3 py-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-950 text-white">
                  <UserRound size={16} />
                </div>

                <div className="hidden sm:block">
                  <p className="text-xs font-semibold">
                    Admin
                  </p>

                  <p className="text-[11px] text-neutral-500">
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