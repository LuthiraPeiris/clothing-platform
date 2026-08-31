import {
  notFound,
} from "next/navigation";

import {
  ProductGallery,
} from "@/components/product/product-gallery";

import {
  ProductInfo,
} from "@/components/product/product-info";

import {
  getProductBySlug,
} from "@/services/product-service";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const {
    slug,
  } = await params;

  try {
    const product =
      await getProductBySlug(slug);

    return (
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <ProductGallery
            product={product}
          />

          <ProductInfo
            product={product}
          />
        </div>
      </section>
    );
  } catch {
    notFound();
  }
}