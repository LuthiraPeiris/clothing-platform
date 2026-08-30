const brands = [
  "NOVA",
  "FORMA",
  "MUSE",
  "ELEMENT",
  "MONO",
  "ARC",
];

export function BrandSection() {
  return (
    <section className="border-y border-neutral-200 bg-[#faf9f7] py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
          Brands We Love
        </p>

        <div className="mt-8 grid grid-cols-2 items-center gap-8 text-center sm:grid-cols-3 lg:grid-cols-6">
          {brands.map((brand) => (
            <span
              key={brand}
              className="font-display text-lg font-semibold tracking-[0.12em] text-neutral-400 transition hover:text-neutral-950"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}