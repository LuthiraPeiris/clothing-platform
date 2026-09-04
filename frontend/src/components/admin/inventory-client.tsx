"use client";

import {
  AlertTriangle,
  Boxes,
  PackageCheck,
  PackageX,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  InventoryTable,
} from "@/components/admin/inventory-table";

import type {
  InventoryItem,
} from "@/services/inventory-service";

type InventoryClientProps = {
  initialInventory: InventoryItem[];
};

export function InventoryClient({
  initialInventory,
}: InventoryClientProps) {
  const [
    inventory,
    setInventory,
  ] =
    useState<
      InventoryItem[]
    >(
      initialInventory
    );

  const totalStock =
    inventory.reduce(
      (
        total,
        item
      ) =>
        total +
        item.stock,
      0
    );

  const inStock =
    inventory.filter(
      (item) =>
        item.status ===
        "IN_STOCK"
    ).length;

  const lowStock =
    inventory.filter(
      (item) =>
        item.status ===
        "LOW_STOCK"
    ).length;

  const outOfStock =
    inventory.filter(
      (item) =>
        item.status ===
        "OUT_OF_STOCK"
    ).length;

  const inventoryStats = [
    {
      label:
        "Total Units",

      value:
        totalStock,

      icon:
        Boxes,
    },
    {
      label:
        "In Stock",

      value:
        inStock,

      icon:
        PackageCheck,
    },
    {
      label:
        "Low Stock",

      value:
        lowStock,

      icon:
        AlertTriangle,
    },
    {
      label:
        "Out of Stock",

      value:
        outOfStock,

      icon:
        PackageX,
    },
  ];

  return (
    <div>
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
          Stock Management
        </p>

        <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Inventory
        </h1>

        <p className="mt-2 text-sm leading-6 text-neutral-500">
          Monitor stock levels,
          identify low-stock
          products, and update
          quantities.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {inventoryStats.map(
          (stat) => {
            const Icon =
              stat.icon;

            return (
              <div
                key={
                  stat.label
                }
                className="border border-neutral-200 bg-white p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center bg-[#f8f3ef] text-[#a26b42]">
                  <Icon
                    size={19}
                  />
                </div>

                <p className="mt-5 text-sm text-neutral-500">
                  {
                    stat.label
                  }
                </p>

                <p className="font-display mt-2 text-2xl font-semibold">
                  {
                    stat.value
                  }
                </p>
              </div>
            );
          }
        )}
      </div>

      <div className="mt-6">
        <InventoryTable
          initialInventory={
            inventory
          }
          onInventoryChange={
            setInventory
          }
        />
      </div>
    </div>
  );
}