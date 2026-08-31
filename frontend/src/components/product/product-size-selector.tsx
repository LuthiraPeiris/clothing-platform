"use client";

type ProductSizeSelectorProps = {
  sizes: string[];
  selectedSize: string;
  onChange: (size: string) => void;
};

export function ProductSizeSelector({
  sizes,
  selectedSize,
  onChange,
}: ProductSizeSelectorProps) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium">
          Size
        </p>

        <button
          type="button"
          className="text-xs text-neutral-500 underline underline-offset-4"
        >
          Size guide
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() =>
              onChange(size)
            }
            className={`flex h-11 min-w-12 items-center justify-center border px-4 text-sm font-medium transition ${
              selectedSize === size
                ? "border-neutral-950 bg-neutral-950 text-white"
                : "border-neutral-300 bg-white hover:border-neutral-950"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}