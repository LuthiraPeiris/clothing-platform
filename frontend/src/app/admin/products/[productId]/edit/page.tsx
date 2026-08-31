import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ProductForm,
} from "@/components/admin/product-form";

import {
  products,
} from "@/data/products";

type EditProductPageProps = {
  params: Promise<{
    productId: string;
  }>;
};

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const {
    productId,
  } = await params;

  const product =
    products.find(
      (item) =>
        item.id === productId
    );

  if (!product) {
    notFound();
  }

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
          Edit Product
        </h1>

        <p className="mt-2 text-sm leading-6 text-neutral-500">
          Update product details, pricing, variants,
          and visibility.
        </p>
      </div>

      <div className="mt-8">
        <ProductForm
          product={product}
        />
      </div>
    </div>
  );
}