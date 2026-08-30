import {
  AccountSidebar,
} from "@/components/layout/account-sidebar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            Customer Area
          </p>

          <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight">
            My Account
          </h1>
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