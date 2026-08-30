import {
  ProductTable,
} from "@/components/admin/product-table";

export default function AdminProductsPage() {
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
          Create, update, and manage products
          available in the store.
        </p>
      </div>

      <div className="mt-8">
        <ProductTable />
      </div>
    </div>
  );
}