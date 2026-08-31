"use client";

import {
  AlertTriangle,
  Minus,
  Plus,
  RotateCcw,
} from "lucide-react";

import Image from "next/image";
import { useState } from "react";

import {
  products,
} from "@/data/products";

export type InventoryItem = {
  productId: string;
  sku: string;
  stock: number;
  lowStockThreshold: number;
};

const initialInventory: InventoryItem[] =
  products.map((product, index) => ({
    productId: product.id,
    sku: `MOD-${product.id.padStart(4, "0")}`,

    // Temporary mock stock
    stock:
      index === 0
        ? 4
        : index === 1
          ? 8
          : index === 2
            ? 0
            : 15 + index * 3,

    lowStockThreshold: 10,
  }));

type InventoryTableProps = {
  onInventoryChange?: (
    inventory: InventoryItem[]
  ) => void;
};

export function InventoryTable({
  onInventoryChange,
}: InventoryTableProps) {
  const [inventory, setInventory] =
    useState<InventoryItem[]>(
      initialInventory
    );

  function saveInventory(
    updatedInventory: InventoryItem[]
  ) {
    setInventory(
      updatedInventory
    );

    onInventoryChange?.(
      updatedInventory
    );
  }

  function updateStock(
    productId: string,
    amount: number
  ) {
    const updatedInventory =
      inventory.map((item) => {
        if (
          item.productId !== productId
        ) {
          return item;
        }

        return {
          ...item,
          stock: Math.max(
            0,
            item.stock + amount
          ),
        };
      });

    saveInventory(
      updatedInventory
    );
  }

  function setStock(
    productId: string,
    stock: number
  ) {
    const updatedInventory =
      inventory.map((item) => {
        if (
          item.productId !== productId
        ) {
          return item;
        }

        return {
          ...item,
          stock: Math.max(
            0,
            stock
          ),
        };
      });

    saveInventory(
      updatedInventory
    );
  }

  function resetInventory() {
    setInventory(
      initialInventory
    );

    onInventoryChange?.(
      initialInventory
    );
  }

  return (
    <div className="border border-neutral-200 bg-white">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-neutral-200 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold">
            Stock levels
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Use the + and − buttons
            to update the current
            product stock.
          </p>
        </div>

        <button
          type="button"
          onClick={
            resetInventory
          }
          className="inline-flex h-10 items-center justify-center gap-2 border border-neutral-300 px-4 text-sm font-medium transition hover:border-neutral-950"
        >
          <RotateCcw
            size={15}
          />

          Reset Mock Stock
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-left">
          <thead className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
            <tr>
              <th className="px-5 py-3 font-medium">
                Product
              </th>

              <th className="px-5 py-3 font-medium">
                SKU
              </th>

              <th className="px-5 py-3 font-medium">
                Status
              </th>

              <th className="px-5 py-3 font-medium">
                Manage Stock
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-100">
            {inventory.map(
              (
                inventoryItem
              ) => {
                const product =
                  products.find(
                    (item) =>
                      item.id ===
                      inventoryItem.productId
                  );

                if (!product) {
                  return null;
                }

                const outOfStock =
                  inventoryItem.stock ===
                  0;

                const lowStock =
                  !outOfStock &&
                  inventoryItem.stock <=
                    inventoryItem.lowStockThreshold;

                return (
                  <tr
                    key={
                      product.id
                    }
                    className="text-sm"
                  >
                    {/* Product */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-13 shrink-0 overflow-hidden bg-neutral-100">
                          <Image
                            src={
                              product.image
                            }
                            alt={
                              product.name
                            }
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div>
                          <p className="font-medium text-neutral-950">
                            {
                              product.name
                            }
                          </p>

                          <p className="mt-1 text-xs capitalize text-neutral-500">
                            {
                              product.category
                            }
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* SKU */}
                    <td className="px-5 py-4 text-neutral-500">
                      {
                        inventoryItem.sku
                      }
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      {outOfStock ? (
                        <span className="inline-flex items-center gap-1.5 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700">
                          <AlertTriangle
                            size={13}
                          />

                          Out of stock
                        </span>
                      ) : lowStock ? (
                        <span className="inline-flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700">
                          <AlertTriangle
                            size={13}
                          />

                          Low stock
                        </span>
                      ) : (
                        <span className="inline-flex bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">
                          In stock
                        </span>
                      )}
                    </td>

                    {/* Stock Controls */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            updateStock(
                              product.id,
                              -1
                            )
                          }
                          disabled={
                            inventoryItem.stock ===
                            0
                          }
                          className="flex h-10 w-10 items-center justify-center border border-neutral-300 transition hover:border-neutral-950 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30"
                          aria-label={`Decrease stock for ${product.name}`}
                        >
                          <Minus
                            size={
                              16
                            }
                          />
                        </button>

                        <input
                          type="number"
                          min="0"
                          value={
                            inventoryItem.stock
                          }
                          onChange={(
                            event
                          ) =>
                            setStock(
                              product.id,
                              Number(
                                event
                                  .target
                                  .value
                              )
                            )
                          }
                          className="h-10 w-20 border border-neutral-300 text-center font-semibold outline-none transition focus:border-neutral-950"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            updateStock(
                              product.id,
                              1
                            )
                          }
                          className="flex h-10 w-10 items-center justify-center border border-neutral-300 transition hover:border-neutral-950 hover:bg-neutral-100"
                          aria-label={`Increase stock for ${product.name}`}
                        >
                          <Plus
                            size={
                              16
                            }
                          />
                        </button>

                        <span className="hidden text-xs text-neutral-400 xl:inline">
                          units
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}