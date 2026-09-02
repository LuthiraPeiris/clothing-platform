import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="bg-[#f5f1ec]">
      <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-16">
        {/* Left Content */}
        <div className="max-w-xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-neutral-500">
            New Season Collection
          </p>

          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-neutral-950 sm:text-6xl lg:text-7xl">
            Style that feels
            <span className="block">
              effortlessly yours.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-neutral-600 sm:text-lg">
            Discover modern essentials, everyday comfort,
            and statement pieces designed for every moment.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="inline-flex h-12 items-center justify-center bg-[#a26b42] px-7 text-sm font-medium text-white transition hover:bg-[#8f5d39] hover:text-white"
            >
              Shop Collection
            </Link>

            <Link
              href="/shop?sort=newest"
              className="inline-flex h-12 items-center justify-center border border-neutral-300 bg-white px-7 text-sm font-medium text-neutral-900 transition hover:border-[#a26b42] hover:bg-[#f8f3ef] hover:text-[#8f5d39]"
            >
              New Arrivals
            </Link>
          </div>

          {/* Small Stats */}
          <div className="mt-10 flex flex-wrap gap-8 border-t border-neutral-300/70 pt-6">
            <div>
              <p className="text-xl font-semibold text-neutral-950">
                200+
              </p>

              <p className="mt-1 text-xs text-neutral-500">
                New styles
              </p>
            </div>

            <div>
              <p className="text-xl font-semibold text-neutral-950">
                30+
              </p>

              <p className="mt-1 text-xs text-neutral-500">
                Brands
              </p>
            </div>

            <div>
              <p className="text-xl font-semibold text-neutral-950">
                4.9/5
              </p>

              <p className="mt-1 text-xs text-neutral-500">
                Customer rating
              </p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden bg-neutral-200">
            <Image
              src="/images/banners/hero-fashion.jpg"
              alt="Fashion collection"
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Floating Card */}
          <div className="absolute bottom-5 left-5 bg-white/95 px-5 py-4 shadow-sm backdrop-blur">
            <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
              Featured
            </p>

            <p className="mt-1 font-display text-lg font-semibold">
              Summer Essentials
            </p>

            <Link
              href="/shop"
              className="mt-2 inline-block text-sm font-medium text-[#a26b42] underline underline-offset-4 transition hover:text-[#8f5d39]"
            >
              Explore now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}