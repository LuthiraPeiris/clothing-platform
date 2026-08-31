import { ShopClient } from "@/components/product/shop-client";
import { getProducts } from "@/services/product-service";

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

type ShopPageProps = {
  searchParams: Promise<{
    category?: string;
    sort?: string;
  }>;
};

function getCategory(
  value?: string
): Category {
  if (
    value === "men" ||
    value === "women" ||
    value === "accessories"
  ) {
    return value;
  }

  return "all";
}

function getSort(
  value?: string
): SortOption {
  if (
    value === "newest" ||
    value === "price-low" ||
    value === "price-high"
  ) {
    return value;
  }

  return "default";
}

export default async function ShopPage({
  searchParams,
}: ShopPageProps) {
  const params = await searchParams;

  const initialCategory =
    getCategory(params.category);

  const initialSort =
    getSort(params.sort);

  const products = await getProducts();

  return (
    <ShopClient
      key={`${initialCategory}-${initialSort}`}
      products={products}
      initialCategory={initialCategory}
      initialSort={initialSort}
    />
  );
}