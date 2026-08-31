import Link from "next/link";

import {
  ProductForm,
} from "@/components/admin/product-form";

export default function NewProductPage() {
  return (
    <div>
      <Link
        href="/admin/products"
        className="text-sm text-neutral-500 underline underline-offset-4"
      >
        Back to products
      </Link>

      <div className="mt-5">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
          Catalogue
        </p>

        <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Add Product
        </h1>

        <p className="mt-2 text-sm leading-6 text-neutral-500">
          Add a new product to the store catalogue.
        </p>
      </div>

      <div className="mt-8">
        <ProductForm />
      </div>
    </div>
  );
}