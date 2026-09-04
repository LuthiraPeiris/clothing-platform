import Image from "next/image";
import Link from "next/link";

export function PromoBanner() {
  return (
    <section className="bg-white py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative min-h-[420px] overflow-hidden bg-neutral-900 sm:min-h-[500px]">
          <Image
            src="/images/banners/promo-banner.jpg"
            alt="Seasonal fashion collection"
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-10 flex min-h-[420px] items-center px-6 py-12 sm:min-h-[500px] sm:px-12 lg:px-16">
            <div className="max-w-xl text-white">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-white/75">
                Limited Collection
              </p>

              <h2 className="font-display mt-4 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                Effortless pieces for the season ahead.
              </h2>

              <p className="mt-5 max-w-lg text-base leading-7 text-white/80">
                Discover versatile styles made for everyday wear,
                from relaxed essentials to elevated statement pieces.
              </p>

              <Link
                href="/shop"
                className="mt-8 inline-flex h-12 items-center justify-center bg-[#a26b42] px-7 text-sm font-medium text-white transition hover:bg-[#8d5c39]"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}