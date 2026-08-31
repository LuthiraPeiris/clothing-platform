"use client";

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

type Category =
  | "all"
  | "men"
  | "women"
  | "accessories";

type SortOption =
  | "default"
  | "newest"
  | "price-low"
  | "price-high";

type ShopClientProps = {
  initialCategory: Category;
  initialSort: SortOption;
};

export function ShopClient({
  initialCategory,
  initialSort,
}: ShopClientProps) {
  const [
    category,
    setCategory,
  ] = useState<Category>(
    initialCategory
  );

  const [
    sort,
    setSort,
  ] = useState<SortOption>(
    initialSort
  );

  const filteredProducts =
    useMemo(() => {
      let result = [
        ...products,
      ];

      if (
        category !== "all"
      ) {
        result =
          result.filter(
            (product) =>
              product.category ===
              category
          );
      }

      if (
        sort ===
        "price-low"
      ) {
        result.sort(
          (a, b) =>
            a.price -
            b.price
        );
      }

      if (
        sort ===
        "price-high"
      ) {
        result.sort(
          (a, b) =>
            b.price -
            a.price
        );
      }

      if (
        sort === "newest"
      ) {
        result.sort(
          (a, b) =>
            Number(
              b.isNewArrival
            ) -
            Number(
              a.isNewArrival
            )
        );
      }

      return result;
    }, [category, sort]);

  return (
    <main className="bg-white">
      <section className="border-b border-neutral-200 bg-[#faf9f7]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            Collection
          </p>

          <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
            Shop
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600">
            Explore everyday essentials,
            new arrivals, and modern
            pieces for every style.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 border-b border-neutral-200 pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            <FilterButton
              label="All"
              active={
                category === "all"
              }
              onClick={() =>
                setCategory("all")
              }
            />

            <FilterButton
              label="Women"
              active={
                category === "women"
              }
              onClick={() =>
                setCategory("women")
              }
            />

            <FilterButton
              label="Men"
              active={
                category === "men"
              }
              onClick={() =>
                setCategory("men")
              }
            />

            <FilterButton
              label="Accessories"
              active={
                category ===
                "accessories"
              }
              onClick={() =>
                setCategory(
                  "accessories"
                )
              }
            />
          </div>

          <div className="flex items-center justify-between gap-4 lg:justify-end">
            <p className="text-sm text-neutral-500">
              {
                filteredProducts.length
              }{" "}
              products
            </p>

            <select
              value={sort}
              onChange={(
                event
              ) =>
                setSort(
                  event.target
                    .value as SortOption
                )
              }
              className="border border-neutral-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-neutral-950"
            >
              <option value="default">
                Sort by
              </option>

              <option value="newest">
                Newest
              </option>

              <option value="price-low">
                Price: Low to High
              </option>

              <option value="price-high">
                Price: High to Low
              </option>
            </select>
          </div>
        </div>

        {filteredProducts.length >
        0 ? (
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
            {filteredProducts.map(
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
        ) : (
          <div className="py-24 text-center">
            <h2 className="font-display text-2xl font-semibold">
              No products found
            </h2>

            <p className="mt-2 text-sm text-neutral-500">
              Try selecting another
              category.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border px-5 py-2.5 text-sm font-medium transition ${
        active
          ? "border-neutral-950 bg-neutral-950 text-white"
          : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-950 hover:text-neutral-950"
      }`}
    >
      {label}
    </button>
  );
}