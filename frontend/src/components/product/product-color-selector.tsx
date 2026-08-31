"use client";

type ProductColorSelectorProps = {
  colors: string[];
  selectedColor: string;
  onChange: (color: string) => void;
};

export function ProductColorSelector({
  colors,
  selectedColor,
  onChange,
}: ProductColorSelectorProps) {
  return (
    <div>
      <p className="mb-3 text-sm font-medium">
        Color:{" "}
        <span className="font-normal text-neutral-500">
          {selectedColor}
        </span>
      </p>

      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() =>
              onChange(color)
            }
            className={`border px-4 py-2.5 text-sm transition ${
              selectedColor === color
                ? "border-neutral-950 bg-neutral-950 text-white"
                : "border-neutral-300 bg-white hover:border-neutral-950"
            }`}
          >
            {color}
          </button>
        ))}
      </div>
    </div>
  );
}