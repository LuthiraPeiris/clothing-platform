"use client";

import {
  ImagePlus,
  Save,
} from "lucide-react";

import {
  useRouter,
} from "next/navigation";

import {
  useState,
} from "react";

import {
  createProduct,
  updateProduct,
} from "@/services/product-service";

import type {
  ProductRequest,
} from "@/services/product-service";

import type {
  Product,
} from "@/types/product";

type ProductFormProps = {
  product?: Product;
};

export function ProductForm({
  product,
}: ProductFormProps) {
  const router =
    useRouter();

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState<
    string | null
  >(null);

  const [
    form,
    setForm,
  ] = useState({
    name:
      product?.name ?? "",

    slug:
      product?.slug ?? "",

    category:
      product?.category ??
      "men",

    price:
      product?.price.toString() ??
      "",

    oldPrice:
      product?.oldPrice?.toString() ??
      "",

    badge:
      product?.badge ?? "",

    image:
      product?.image ?? "",

    sizes:
      product?.sizes?.join(
        ", "
      ) ?? "",

    colors:
      product?.colors?.join(
        ", "
      ) ?? "",

    featured:
      product?.isFeatured ??
      false,

    newArrival:
      product?.isNewArrival ??
      false,

    description:
      "A versatile wardrobe essential designed for everyday comfort and modern styling.",
  });

  function updateField(
    field: keyof typeof form,
    value:
      | string
      | boolean
  ) {
    setForm(
      (current) => ({
        ...current,
        [field]: value,
      })
    );
  }

  function convertCommaSeparated(
    value: string
  ) {
    return value
      .split(",")
      .map(
        (item) =>
          item.trim()
      )
      .filter(Boolean);
  }

  async function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    setError(null);

    const price =
      Number(form.price);

    const oldPrice =
      form.oldPrice.trim()
        ? Number(
            form.oldPrice
          )
        : null;

    if (
      !form.name.trim() ||
      !form.slug.trim()
    ) {
      setError(
        "Product name and slug are required."
      );

      return;
    }

    if (
      Number.isNaN(price) ||
      price <= 0
    ) {
      setError(
        "Please enter a valid price greater than 0."
      );

      return;
    }

    if (
      oldPrice !== null &&
      (
        Number.isNaN(
          oldPrice
        ) ||
        oldPrice < 0
      )
    ) {
      setError(
        "Please enter a valid old price."
      );

      return;
    }

    const request: ProductRequest =
      {
        name:
          form.name.trim(),

        slug:
          form.slug
            .trim()
            .toLowerCase(),

        category:
          form.category as ProductRequest["category"],

        price,

        oldPrice,

        image:
          form.image.trim() ||
          null,

        badge:
          form.badge.trim() ||
          null,

        sizes:
          convertCommaSeparated(
            form.sizes
          ),

        colors:
          convertCommaSeparated(
            form.colors
          ),

        featured:
          form.featured,

        newArrival:
          form.newArrival,
      };

    try {
      setIsSubmitting(
        true
      );

      if (product) {
        await updateProduct(
          product.id,
          request
        );
      } else {
        await createProduct(
          request
        );
      }

      router.push(
        "/admin/products"
      );

      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setIsSubmitting(
        false
      );
    }
  }

  return (
    <form
      onSubmit={
        handleSubmit
      }
      className="grid gap-6 xl:grid-cols-[1fr_340px]"
    >
      <div className="space-y-6">
        <section className="border border-neutral-200 bg-white p-6">
          <h2 className="font-display text-xl font-semibold">
            Product information
          </h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium">
                Product Name
              </label>

              <input
                required
                value={
                  form.name
                }
                onChange={(
                  event
                ) =>
                  updateField(
                    "name",
                    event.target
                      .value
                  )
                }
                placeholder="Classic Linen Shirt"
                className="h-12 w-full border border-neutral-300 px-4 text-sm outline-none focus:border-neutral-950"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium">
                Slug
              </label>

              <input
                required
                value={
                  form.slug
                }
                onChange={(
                  event
                ) =>
                  updateField(
                    "slug",
                    event.target
                      .value
                  )
                }
                placeholder="classic-linen-shirt"
                className="h-12 w-full border border-neutral-300 px-4 text-sm outline-none focus:border-neutral-950"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Category
              </label>

              <select
                value={
                  form.category
                }
                onChange={(
                  event
                ) =>
                  updateField(
                    "category",
                    event.target
                      .value
                  )
                }
                className="h-12 w-full border border-neutral-300 bg-white px-4 text-sm outline-none focus:border-neutral-950"
              >
                <option value="men">
                  Men
                </option>

                <option value="women">
                  Women
                </option>

                <option value="accessories">
                  Accessories
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Badge
              </label>

              <input
                value={
                  form.badge
                }
                onChange={(
                  event
                ) =>
                  updateField(
                    "badge",
                    event.target
                      .value
                  )
                }
                placeholder="New / Sale"
                className="h-12 w-full border border-neutral-300 px-4 text-sm outline-none focus:border-neutral-950"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Price
              </label>

              <input
                required
                min="0"
                step="0.01"
                type="number"
                value={
                  form.price
                }
                onChange={(
                  event
                ) =>
                  updateField(
                    "price",
                    event.target
                      .value
                  )
                }
                placeholder="6500"
                className="h-12 w-full border border-neutral-300 px-4 text-sm outline-none focus:border-neutral-950"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Old Price
              </label>

              <input
                min="0"
                step="0.01"
                type="number"
                value={
                  form.oldPrice
                }
                onChange={(
                  event
                ) =>
                  updateField(
                    "oldPrice",
                    event.target
                      .value
                  )
                }
                placeholder="7500"
                className="h-12 w-full border border-neutral-300 px-4 text-sm outline-none focus:border-neutral-950"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium">
                Description
              </label>

              <textarea
                value={
                  form.description
                }
                onChange={(
                  event
                ) =>
                  updateField(
                    "description",
                    event.target
                      .value
                  )
                }
                rows={5}
                className="w-full resize-none border border-neutral-300 p-4 text-sm outline-none focus:border-neutral-950"
              />

              <p className="mt-2 text-xs text-neutral-500">
                Description is currently
                UI-only. We will add it
                to the backend Product
                model later.
              </p>
            </div>
          </div>
        </section>

        <section className="border border-neutral-200 bg-white p-6">
          <h2 className="font-display text-xl font-semibold">
            Variants
          </h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Sizes
              </label>

              <input
                value={
                  form.sizes
                }
                onChange={(
                  event
                ) =>
                  updateField(
                    "sizes",
                    event.target
                      .value
                  )
                }
                placeholder="S, M, L, XL"
                className="h-12 w-full border border-neutral-300 px-4 text-sm outline-none focus:border-neutral-950"
              />

              <p className="mt-2 text-xs text-neutral-500">
                Separate sizes with
                commas.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Colors
              </label>

              <input
                value={
                  form.colors
                }
                onChange={(
                  event
                ) =>
                  updateField(
                    "colors",
                    event.target
                      .value
                  )
                }
                placeholder="White, Black, Beige"
                className="h-12 w-full border border-neutral-300 px-4 text-sm outline-none focus:border-neutral-950"
              />

              <p className="mt-2 text-xs text-neutral-500">
                Separate colors with
                commas.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="space-y-6">
        <section className="border border-neutral-200 bg-white p-6">
          <h2 className="font-display text-lg font-semibold">
            Product image
          </h2>

          <div className="mt-5 flex min-h-52 items-center justify-center border border-dashed border-neutral-300 bg-neutral-50 p-6 text-center">
            <div>
              <ImagePlus
                size={28}
                className="mx-auto text-neutral-400"
              />

              <p className="mt-3 text-sm font-medium">
                Add product image
              </p>

              <p className="mt-1 text-xs text-neutral-500">
                Image uploading will be
                connected later.
              </p>
            </div>
          </div>

          <input
            value={
              form.image
            }
            onChange={(
              event
            ) =>
              updateField(
                "image",
                event.target
                  .value
              )
            }
            placeholder="/images/products/example.jpg"
            className="mt-4 h-11 w-full border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-950"
          />
        </section>

        <section className="border border-neutral-200 bg-white p-6">
          <h2 className="font-display text-lg font-semibold">
            Visibility
          </h2>

          <div className="mt-5 space-y-4">
            <label className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={
                  form.featured
                }
                onChange={(
                  event
                ) =>
                  updateField(
                    "featured",
                    event.target
                      .checked
                  )
                }
              />

              Featured product
            </label>

            <label className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={
                  form.newArrival
                }
                onChange={(
                  event
                ) =>
                  updateField(
                    "newArrival",
                    event.target
                      .checked
                  )
                }
              />

              New arrival
            </label>
          </div>
        </section>

        {error && (
          <div className="border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={
            isSubmitting
          }
          className="flex h-12 w-full items-center justify-center gap-2 bg-neutral-950 px-5 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save
            size={17}
          />

          {isSubmitting
            ? product
              ? "Updating..."
              : "Creating..."
            : product
              ? "Update Product"
              : "Create Product"}
        </button>
      </div>
    </form>
  );
}