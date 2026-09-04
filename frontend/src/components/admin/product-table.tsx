"use client";

import {
  Edit,
  MoreHorizontal,
  Plus,
  Trash2,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";

import {
  useRouter,
} from "next/navigation";

import {
  useState,
} from "react";

import {
  formatCurrency,
} from "@/lib/formatters";

import {
  getAccessToken,
} from "@/services/auth-service";

import {
  deleteProduct,
} from "@/services/product-service";

import type {
  Product,
} from "@/types/product";

type ProductTableProps = {
  initialProducts: Product[];
};

export function ProductTable({
  initialProducts,
}: ProductTableProps) {
  const router =
    useRouter();

  const [
    products,
    setProducts,
  ] = useState<Product[]>(
    initialProducts
  );

  const [
    deletingId,
    setDeletingId,
  ] = useState<
    string | null
  >(null);

  const [
    error,
    setError,
  ] = useState<
    string | null
  >(null);

  async function handleDelete(
    product: Product
  ) {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${product.name}"?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setError(
        null
      );

      setDeletingId(
        product.id
      );

      /*
       * Get a fresh Keycloak access token.
       *
       * This will also refresh the token
       * automatically if it is close
       * to expiring.
       */
      const accessToken =
        await getAccessToken();

      /*
       * Send the JWT to Spring Boot.
       *
       * Spring Security will now verify
       * that the user has ADMIN role.
       */
      await deleteProduct(
        product.id,
        accessToken
      );

      /*
       * Remove the deleted product
       * immediately from the table.
       */
      setProducts(
        (current) =>
          current.filter(
            (item) =>
              item.id !==
              product.id
          )
      );

      /*
       * Refresh server components
       * using this product list.
       */
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete product."
      );
    } finally {
      setDeletingId(
        null
      );
    }
  }

  return (
    <div className="border border-neutral-200 bg-white">
      <div className="flex flex-col gap-4 border-b border-neutral-200 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold">
            Products
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Manage your store catalogue.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex h-11 items-center justify-center gap-2 bg-[#a26b42] px-5 text-sm font-medium text-white transition hover:bg-[#8d5c39]"
        >
          <Plus
            size={17}
          />

          Add Product
        </Link>
      </div>

      {error && (
        <div className="border-b border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left">
          <thead className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
            <tr>
              <th className="px-5 py-3 font-medium">
                Product
              </th>

              <th className="px-5 py-3 font-medium">
                Category
              </th>

              <th className="px-5 py-3 font-medium">
                Price
              </th>

              <th className="px-5 py-3 font-medium">
                Status
              </th>

              <th className="px-5 py-3 font-medium">
                Stock
              </th>

              <th className="px-5 py-3 text-right font-medium">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-100">
            {products.map(
              (product) => {
                const isDeleting =
                  deletingId ===
                  product.id;

                return (
                  <tr
                    key={
                      product.id
                    }
                    className="text-sm"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-13 shrink-0 overflow-hidden bg-neutral-100">
                          <Image
  src={product.image}
  alt={product.name}
  fill
  sizes="52px"
  className="object-cover"
/>
                        </div>

                        <div>
                          <p className="font-medium text-neutral-950">
                            {
                              product.name
                            }
                          </p>

                          <p className="mt-1 text-xs text-neutral-500">
                            {
                              product.slug
                            }
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 capitalize text-neutral-600">
                      {
                        product.category
                      }
                    </td>

                    <td className="px-5 py-4 font-medium">
                      {formatCurrency(
                        product.price
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <span className="bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                        Active
                      </span>
                    </td>

                    <td className="px-5 py-4 text-neutral-400">
                      —
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="flex h-9 w-9 items-center justify-center transition hover:bg-neutral-100"
                          aria-label={`Edit ${product.name}`}
                        >
                          <Edit
                            size={16}
                          />
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              product
                            )
                          }
                          disabled={
                            isDeleting
                          }
                          className="flex h-9 w-9 items-center justify-center text-neutral-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                          aria-label={`Delete ${product.name}`}
                        >
                          <Trash2
                            size={16}
                          />
                        </button>

                        <button
                          type="button"
                          className="flex h-9 w-9 items-center justify-center text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-950"
                          aria-label={`More actions for ${product.name}`}
                        >
                          <MoreHorizontal
                            size={17}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              }
            )}

            {products.length ===
              0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-16 text-center text-sm text-neutral-500"
                >
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}