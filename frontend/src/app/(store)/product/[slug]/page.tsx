import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ProductCard,
} from "@/components/product/product-card";

import {
  ProductGallery,
} from "@/components/product/product-gallery";

import {
  ProductInfo,
} from "@/components/product/product-info";

import {
  products,
} from "@/data/products";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product =
    products.find(
      (item) =>
        item.slug === slug
    );

  if (!product) {
    notFound();
  }

  const galleryImages = [
    product.image,
    product.image,
    product.image,
  ];

  const relatedProducts =
    products
      .filter(
        (item) =>
          item.id !== product.id &&
          item.category ===
            product.category
      )
      .slice(0, 4);

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <Link
            href="/"
            className="hover:text-neutral-950"
          >
            Home
          </Link>

          <span>/</span>

          <Link
            href="/shop"
            className="hover:text-neutral-950"
          >
            Shop
          </Link>

          <span>/</span>

          <span className="text-neutral-950">
            {product.name}
          </span>
        </div>
      </div>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-8 lg:pb-24">
        <ProductGallery
          images={galleryImages}
          productName={
            product.name
          }
        />

        <ProductInfo
          product={product}
        />
      </section>

      {relatedProducts.length >
        0 && (
        <section className="border-t border-neutral-200 bg-[#faf9f7] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
                You may also like
              </p>

              <h2 className="font-display mt-2 text-3xl font-semibold">
                Related products
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
              {relatedProducts.map(
                (item) => (
                  <ProductCard
                    key={item.id}
                    product={item}
                  />
                )
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}