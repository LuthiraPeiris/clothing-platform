"use client";

import {
  Search,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import {
  ProductCard,
} from "@/components/product/product-card";

import {
  products,
} from "@/data/products";

export default function SearchPage() {
  const [query, setQuery] =
    useState("");

  const results = useMemo(() => {
    const normalizedQuery =
      query.trim().toLowerCase();

    if (!normalizedQuery) {
      return [];
    }

    return products.filter(
      (product) =>
        product.name
          .toLowerCase()
          .includes(normalizedQuery) ||
        product.category
          .toLowerCase()
          .includes(normalizedQuery)
    );
  }, [query]);

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-neutral-200 bg-[#faf9f7]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            Find Products
          </p>

          <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Search
          </h1>

          <p className="mt-4 max-w-xl text-neutral-600">
            Search our collection by
            product name or category.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-3xl">
          <Search
            size={20}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400"
          />

          <input
            type="search"
            value={query}
            onChange={(event) =>
              setQuery(
                event.target.value
              )
            }
            placeholder="Search for shirts, dresses, accessories..."
            autoFocus
            className="h-14 w-full border border-neutral-300 bg-white pl-14 pr-5 text-base outline-none transition placeholder:text-neutral-400 focus:border-neutral-950"
          />
        </div>

        {!query.trim() && (
          <div className="py-24 text-center">
            <Search
              size={34}
              className="mx-auto text-neutral-300"
            />

            <h2 className="font-display mt-5 text-2xl font-semibold">
              What are you looking for?
            </h2>

            <p className="mt-2 text-sm text-neutral-500">
              Start typing to search
              through our products.
            </p>
          </div>
        )}

        {query.trim() &&
          results.length > 0 && (
            <>
              <div className="mt-10 flex items-center justify-between border-b border-neutral-200 pb-5">
                <div>
                  <h2 className="font-display text-2xl font-semibold">
                    Search results
                  </h2>

                  <p className="mt-1 text-sm text-neutral-500">
                    {results.length}{" "}
                    {results.length === 1
                      ? "product"
                      : "products"}{" "}
                    found for &quot;
                    {query}&quot;
                  </p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
                {results.map(
                  (product) => (
                    <ProductCard
                      key={
                        product.id
                      }
                      product={
                        product
                      }
                    />
                  )
                )}
              </div>
            </>
          )}

        {query.trim() &&
          results.length === 0 && (
            <div className="py-24 text-center">
              <h2 className="font-display text-2xl font-semibold">
                No products found
              </h2>

              <p className="mt-2 text-sm text-neutral-500">
                We couldn&apos;t find
                anything matching
                &quot;{query}&quot;.
              </p>

              <button
                type="button"
                onClick={() =>
                  setQuery("")
                }
                className="mt-6 border border-neutral-950 px-6 py-3 text-sm font-medium transition hover:bg-neutral-950 hover:text-white"
              >
                Clear Search
              </button>
            </div>
          )}
      </section>
    </main>
  );
}