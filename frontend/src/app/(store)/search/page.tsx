import {
  SearchClient,
} from "@/components/product/search-client";

import {
  getProducts,
} from "@/services/product-service";

export default async function SearchPage() {
  const products =
    await getProducts();

  return (
    <SearchClient
      products={products}
    />
  );
}