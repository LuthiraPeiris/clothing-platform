import {
  ProductTable,
} from "@/components/admin/product-table";

import {
  getProducts,
} from "@/services/product-service";

export default async function ProductsPage() {
  const products =
    await getProducts();

  return (
    <div>
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
          Catalogue
        </p>

        <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Products
        </h1>

        <p className="mt-2 text-sm leading-6 text-neutral-500">
          Manage products, pricing,
          categories, and catalogue
          visibility.
        </p>
      </div>

      <div className="mt-8">
        <ProductTable
          initialProducts={
            products
          }
        />
      </div>
    </div>
  );
}