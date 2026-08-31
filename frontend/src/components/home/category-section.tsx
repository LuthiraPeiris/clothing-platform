import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Women",
    description: "Modern pieces for everyday style.",
    href: "/shop?category=women",
    image: "/images/categories/women.jpg",
  },
  {
    name: "Men",
    description: "Clean essentials and seasonal fits.",
    href: "/shop?category=men",
    image: "/images/categories/men.jpg",
  },
  {
    name: "Accessories",
    description: "Complete your look with the details.",
    href: "/shop?category=accessories",
    image: "/images/categories/accessories.jpg",
  },
];

export function CategorySection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
              Shop by Category
            </p>

            <h2 className="font-display mt-2 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
              Find your style
            </h2>
          </div>

          <Link
            href="/shop"
            className="hidden text-sm font-medium text-neutral-900 underline underline-offset-4 sm:inline"
          >
            View all products
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative overflow-hidden bg-neutral-100"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <h3 className="font-display text-2xl font-semibold">
                    {category.name}
                  </h3>

                  <p className="mt-2 max-w-xs text-sm leading-6 text-white/80">
                    {category.description}
                  </p>

                  <span className="mt-4 inline-block text-sm font-medium underline underline-offset-4">
                    Shop now
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/shop"
          className="mt-8 inline-block text-sm font-medium underline underline-offset-4 sm:hidden"
        >
          View all products
        </Link>
      </div>
    </section>
  );
}