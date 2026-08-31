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
  products,
} from "@/data/products";

import {
  formatCurrency,
} from "@/lib/formatters";

export function ProductTable() {
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
          className="inline-flex h-11 items-center justify-center gap-2 bg-neutral-950 px-5 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          <Plus size={17} />
          Add Product
        </Link>
      </div>

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
            {products.map((product, index) => {
              const stock =
                8 + index * 4;

              return (
                <tr
                  key={product.id}
                  className="text-sm"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-13 shrink-0 overflow-hidden bg-neutral-100">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <p className="font-medium text-neutral-950">
                          {product.name}
                        </p>

                        <p className="mt-1 text-xs text-neutral-500">
                          {product.slug}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 capitalize text-neutral-600">
                    {product.category}
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

                  <td className="px-5 py-4">
                    {stock}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="flex h-9 w-9 items-center justify-center transition hover:bg-neutral-100"
                        aria-label="Edit product"
                      >
                        <Edit size={16} />
                      </Link>

                      <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center text-neutral-400 transition hover:bg-red-50 hover:text-red-600"
                        aria-label="Delete product"
                      >
                        <Trash2 size={16} />
                      </button>

                      <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-950"
                        aria-label="More actions"
                      >
                        <MoreHorizontal size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}