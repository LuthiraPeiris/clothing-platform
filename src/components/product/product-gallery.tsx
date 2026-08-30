"use client";

import Image from "next/image";
import { useState } from "react";

type ProductGalleryProps = {
  images: string[];
  productName: string;
};

export function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const [activeImage, setActiveImage] =
    useState(images[0]);

  return (
    <div className="grid gap-4 sm:grid-cols-[90px_1fr]">
      <div className="order-2 flex gap-3 overflow-x-auto sm:order-1 sm:flex-col">
        {images.map((image) => (
          <button
            key={image}
            type="button"
            onClick={() =>
              setActiveImage(image)
            }
            className={`relative h-24 w-20 shrink-0 overflow-hidden border ${
              activeImage === image
                ? "border-neutral-950"
                : "border-neutral-200"
            }`}
          >
            <Image
              src={image}
              alt={productName}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <div className="order-1 relative aspect-[4/5] overflow-hidden bg-neutral-100 sm:order-2">
        <Image
          src={activeImage}
          alt={productName}
          fill
          priority
          className="object-cover"
        />
      </div>
    </div>
  );
}