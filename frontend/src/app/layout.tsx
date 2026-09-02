import type {
  Metadata,
} from "next";

import {
  DM_Sans,
  Inter,
} from "next/font/google";

import "./globals.css";

import {
  AuthProvider,
} from "@/components/providers/auth-provider";

import {
  CartProvider,
} from "@/context/cart-context";

import {
  WishlistProvider,
} from "@/context/wishlist-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: {
    default: "MODEVA",
    template: "%s | MODEVA",
  },

  description:
    "Discover modern clothing, new arrivals, and everyday fashion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSans.variable}`}
    >
      <body>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}