import {
  Footer,
} from "@/components/layout/footer";

import {
  Navbar,
} from "@/components/layout/navbar";

import {
  WishlistProvider,
} from "@/context/wishlist-context";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WishlistProvider>
      <div className="min-h-screen">
        <Navbar />

        <main>
          {children}
        </main>

        <Footer />
      </div>
    </WishlistProvider>
  );
}