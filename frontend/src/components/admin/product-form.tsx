"use client";

import {
  ImagePlus,
  Save,
  Trash2,
  Upload,
} from "lucide-react";

import {
  useRouter,
} from "next/navigation";

import {
  useRef,
  useState,
} from "react";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import {
  Select,
} from "@/components/ui/select";

import {
  getAccessToken,
} from "@/services/auth-service";

import {
  createProduct,
  updateProduct,
  uploadProductImage,
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

const MAX_IMAGE_SIZE =
  5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export function ProductForm({
  product,
}: ProductFormProps) {
  const router =
    useRouter();

  const fileInputRef =
    useRef<HTMLInputElement>(
      null
    );

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
    selectedImage,
    setSelectedImage,
  ] = useState<
    File | null
  >(null);

  const [
    imagePreview,
    setImagePreview,
  ] = useState<
    string | null
  >(
    product?.image ??
      null
  );

  const [
    form,
    setForm,
  ] = useState({
    name:
      product?.name ??
      "",

    slug:
      product?.slug ??
      "",

    category:
      product?.category ??
      "men",

    price:
      product?.price
        .toString() ??
      "",

    oldPrice:
      product?.oldPrice
        ?.toString() ??
      "",

    badge:
      product?.badge ??
      "",

    image:
      product?.image ??
      "",

    sizes:
      product?.sizes
        ?.join(", ") ??
      "",

    colors:
      product?.colors
        ?.join(", ") ??
      "",

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
    field:
      keyof typeof form,

    value:
      | string
      | boolean
  ) {
    setForm(
      (current) => ({
        ...current,
        [field]:
          value,
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
      .filter(
        Boolean
      );
  }

  function handleImageChange(
    event:
      React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target
        .files?.[0];

    if (!file) {
      return;
    }

    setError(
      null
    );

    if (
      !ALLOWED_IMAGE_TYPES
        .includes(
          file.type
        )
    ) {
      setError(
        "Please select a JPG, PNG, or WebP image."
      );

      event.target.value =
        "";

      return;
    }

    if (
      file.size >
      MAX_IMAGE_SIZE
    ) {
      setError(
        "Image must be smaller than 5 MB."
      );

      event.target.value =
        "";

      return;
    }

    setSelectedImage(
      file
    );

    const reader =
      new FileReader();

    reader.onload = () => {
      if (
        typeof reader.result ===
        "string"
      ) {
        setImagePreview(
          reader.result
        );
      }
    };

    reader.readAsDataURL(
      file
    );
  }

  function removeImage() {
    setSelectedImage(
      null
    );

    setImagePreview(
      null
    );

    updateField(
      "image",
      ""
    );

    if (
      fileInputRef.current
    ) {
      fileInputRef
        .current
        .value =
        "";
    }
  }

  async function handleSubmit(
    event:
      React.FormEvent
  ) {
    event.preventDefault();

    setError(
      null
    );

    const price =
      Number(
        form.price
      );

    const oldPrice =
      form.oldPrice
        .trim()
        ? Number(
            form.oldPrice
          )
        : null;

    if (
      !form.name
        .trim() ||
      !form.slug
        .trim()
    ) {
      setError(
        "Product name and slug are required."
      );

      return;
    }

    if (
      Number.isNaN(
        price
      ) ||
      price <= 0
    ) {
      setError(
        "Please enter a valid price greater than 0."
      );

      return;
    }

    if (
      oldPrice !==
        null &&
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

    try {
      setIsSubmitting(
        true
      );

      /*
       * Get an ADMIN JWT.
       */
      const accessToken =
        await getAccessToken();

      /*
       * Existing image remains when editing,
       * unless the admin selects a new image.
       */
      let imageUrl:
        string | null =
        form.image
          .trim() ||
        null;

      /*
       * Upload newly selected image first.
       */
      if (
        selectedImage
      ) {
        imageUrl =
          await uploadProductImage(
            selectedImage,
            accessToken
          );
      }

      const request:
        ProductRequest = {
          name:
            form.name
              .trim(),

          slug:
            form.slug
              .trim()
              .toLowerCase(),

          category:
            form.category as ProductRequest["category"],

          price,

          oldPrice,

          image:
            imageUrl,

          badge:
            form.badge
              .trim() ||
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

      if (
        product
      ) {
        await updateProduct(
          product.id,
          request,
          accessToken
        );
      } else {
        await createProduct(
          request,
          accessToken
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

              <Input
                required
                value={
                  form.name
                }
                onChange={(
                  event
                ) =>
                  updateField(
                    "name",
                    event
                      .target
                      .value
                  )
                }
                placeholder="Classic Linen Shirt"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium">
                Slug
              </label>

              <Input
                required
                value={
                  form.slug
                }
                onChange={(
                  event
                ) =>
                  updateField(
                    "slug",
                    event
                      .target
                      .value
                  )
                }
                placeholder="classic-linen-shirt"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Category
              </label>

              <Select
                value={
                  form.category
                }
                onChange={(
                  event
                ) =>
                  updateField(
                    "category",
                    event
                      .target
                      .value
                  )
                }
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
              </Select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Badge
              </label>

              <Input
                value={
                  form.badge
                }
                onChange={(
                  event
                ) =>
                  updateField(
                    "badge",
                    event
                      .target
                      .value
                  )
                }
                placeholder="New / Sale"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Price
              </label>

              <Input
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
                    event
                      .target
                      .value
                  )
                }
                placeholder="6500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Old Price
              </label>

              <Input
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
                    event
                      .target
                      .value
                  )
                }
                placeholder="7500"
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
                    event
                      .target
                      .value
                  )
                }
                rows={5}
                className="w-full resize-none border border-neutral-300 bg-white p-4 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-[#a26b42] focus:ring-1 focus:ring-[#a26b42]"
              />

              <p className="mt-2 text-xs text-neutral-500">
                Description is currently UI-only.
                We will add it to the backend Product
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

              <Input
                value={
                  form.sizes
                }
                onChange={(
                  event
                ) =>
                  updateField(
                    "sizes",
                    event
                      .target
                      .value
                  )
                }
                placeholder="S, M, L, XL"
              />

              <p className="mt-2 text-xs text-neutral-500">
                Separate sizes with commas.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Colors
              </label>

              <Input
                value={
                  form.colors
                }
                onChange={(
                  event
                ) =>
                  updateField(
                    "colors",
                    event
                      .target
                      .value
                  )
                }
                placeholder="White, Black, Beige"
              />

              <p className="mt-2 text-xs text-neutral-500">
                Separate colors with commas.
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

          <input
            ref={
              fileInputRef
            }
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={
              handleImageChange
            }
            className="hidden"
          />

          {imagePreview ? (
            <div className="mt-5">

              <div
                className="h-72 w-full bg-neutral-100 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage:
                    `url("${imagePreview}")`,
                }}
              />

              <div className="mt-4 grid grid-cols-2 gap-3">

                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current
                      ?.click()
                  }
                  disabled={
                    isSubmitting
                  }
                  className="inline-flex h-11 items-center justify-center gap-2 border border-neutral-300 bg-white px-4 text-sm font-medium transition hover:border-[#a26b42] hover:text-[#a26b42] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Upload
                    size={16}
                  />

                  Replace
                </button>

                <button
                  type="button"
                  onClick={
                    removeImage
                  }
                  disabled={
                    isSubmitting
                  }
                  className="inline-flex h-11 items-center justify-center gap-2 border border-red-200 bg-white px-4 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Trash2
                    size={16}
                  />

                  Remove
                </button>

              </div>

              {selectedImage && (
                <p className="mt-3 break-all text-xs text-neutral-500">
                  {
                    selectedImage.name
                  }
                </p>
              )}

            </div>
          ) : (
            <button
              type="button"
              onClick={() =>
                fileInputRef.current
                  ?.click()
              }
              disabled={
                isSubmitting
              }
              className="mt-5 flex min-h-60 w-full items-center justify-center border border-dashed border-neutral-300 bg-neutral-50 p-6 text-center transition hover:border-[#a26b42] hover:bg-[#faf7f5] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center bg-[#f8f3ef] text-[#a26b42]">
                  <ImagePlus
                    size={24}
                  />
                </div>

                <p className="mt-4 text-sm font-medium">
                  Choose product image
                </p>

                <p className="mt-1 text-xs leading-5 text-neutral-500">
                  JPG, PNG or WebP
                  <br />
                  Maximum 5 MB
                </p>
              </div>
            </button>
          )}

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
                    event
                      .target
                      .checked
                  )
                }
                className="h-4 w-4 accent-[#a26b42]"
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
                    event
                      .target
                      .checked
                  )
                }
                className="h-4 w-4 accent-[#a26b42]"
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

        <Button
          type="submit"
          fullWidth
          disabled={
            isSubmitting
          }
          className="bg-[#a26b42] text-white hover:bg-[#8d5c39]"
        >
          <Save
            size={17}
          />

          {isSubmitting
            ? selectedImage
              ? "Uploading & saving..."
              : product
                ? "Updating..."
                : "Creating..."
            : product
              ? "Update Product"
              : "Create Product"}
        </Button>

      </div>
    </form>
  );
}