import Image from "next/image";

import type {
  Product,
} from "@/types/product";

type ProductGalleryProps = {
  product: Product;
};

export function ProductGallery({
  product,
}: ProductGalleryProps) {
  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority
          className="object-cover"
        />
      </div>
    </div>
  );
}