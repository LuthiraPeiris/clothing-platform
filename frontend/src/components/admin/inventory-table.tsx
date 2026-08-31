"use client";

import {
  AlertTriangle,
  Minus,
  Plus,
} from "lucide-react";

import Image from "next/image";

import {
  useState,
} from "react";

import {
  decreaseStock,
  increaseStock,
} from "@/services/inventory-service";

import type {
  InventoryItem,
} from "@/services/inventory-service";

type InventoryTableProps = {
  initialInventory: InventoryItem[];

  onInventoryChange?: (
    inventory: InventoryItem[]
  ) => void;
};

export function InventoryTable({
  initialInventory,
  onInventoryChange,
}: InventoryTableProps) {
  const [
    inventory,
    setInventory,
  ] = useState<
    InventoryItem[]
  >(initialInventory);

  const [
    updatingProductId,
    setUpdatingProductId,
  ] = useState<
    number | null
  >(null);

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

  function replaceInventoryItem(
    updatedItem: InventoryItem
  ) {
    const updatedInventory =
      inventory.map(
        (item) =>
          item.productId ===
          updatedItem.productId
            ? updatedItem
            : item
      );

    saveInventory(
      updatedInventory
    );
  }

  async function handleIncrease(
    productId: number
  ) {
    try {
      setUpdatingProductId(
        productId
      );

      const updatedItem =
        await increaseStock(
          productId,
          1
        );

      replaceInventoryItem(
        updatedItem
      );
    } catch (error) {
      console.error(
        "Failed to increase stock:",
        error
      );
    } finally {
      setUpdatingProductId(
        null
      );
    }
  }

  async function handleDecrease(
    productId: number
  ) {
    try {
      setUpdatingProductId(
        productId
      );

      const updatedItem =
        await decreaseStock(
          productId,
          1
        );

      replaceInventoryItem(
        updatedItem
      );
    } catch (error) {
      console.error(
        "Failed to decrease stock:",
        error
      );
    } finally {
      setUpdatingProductId(
        null
      );
    }
  }

  return (
    <div className="border border-neutral-200 bg-white">
      <div className="border-b border-neutral-200 p-5">
        <h2 className="font-display text-xl font-semibold">
          Stock levels
        </h2>

        <p className="mt-1 text-sm text-neutral-500">
          Update product stock using
          the controls below.
        </p>
      </div>

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
              (item) => {
                const outOfStock =
                  item.status ===
                  "OUT_OF_STOCK";

                const lowStock =
                  item.status ===
                  "LOW_STOCK";

                const updating =
                  updatingProductId ===
                  item.productId;

                const productImage =
                  item.productImage ||
                  "/images/products/placeholder.jpg";

                return (
                  <tr
                    key={
                      item.id
                    }
                    className="text-sm"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-13 shrink-0 overflow-hidden bg-neutral-100">
                          <Image
                            src={
                              productImage
                            }
                            alt={
                              item.productName
                            }
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div>
                          <p className="font-medium text-neutral-950">
                            {
                              item.productName
                            }
                          </p>

                          <p className="mt-1 text-xs capitalize text-neutral-500">
                            {
                              item.category
                            }
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-neutral-500">
                      {
                        item.sku
                      }
                    </td>

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

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            handleDecrease(
                              item.productId
                            )
                          }
                          disabled={
                            item.stock ===
                              0 ||
                            updating
                          }
                          className="flex h-10 w-10 items-center justify-center border border-neutral-300 transition hover:border-neutral-950 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30"
                          aria-label={`Decrease stock for ${item.productName}`}
                        >
                          <Minus
                            size={16}
                          />
                        </button>

                        <div className="flex h-10 w-20 items-center justify-center border border-neutral-300 font-semibold">
                          {
                            item.stock
                          }
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            handleIncrease(
                              item.productId
                            )
                          }
                          disabled={
                            updating
                          }
                          className="flex h-10 w-10 items-center justify-center border border-neutral-300 transition hover:border-neutral-950 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30"
                          aria-label={`Increase stock for ${item.productName}`}
                        >
                          <Plus
                            size={16}
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

            {inventory.length ===
              0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-5 py-16 text-center text-sm text-neutral-500"
                >
                  No inventory records
                  available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}