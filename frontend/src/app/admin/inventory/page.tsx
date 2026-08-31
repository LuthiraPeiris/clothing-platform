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
} from "@/components/admin/inventory-table";

import {
  products,
} from "@/data/products";

const initialInventory: InventoryItem[] =
  products.map(
    (product, index) => ({
      productId: product.id,
      sku: `MOD-${product.id.padStart(
        4,
        "0"
      )}`,
      stock:
        index === 0
          ? 4
          : index === 1
            ? 8
            : index === 2
              ? 0
              : 15 +
                index * 3,
      lowStockThreshold: 10,
    })
  );

export default function InventoryPage() {
  const [
    inventory,
    setInventory,
  ] =
    useState<InventoryItem[]>(
      initialInventory
    );

  const totalStock =
    inventory.reduce(
      (total, item) =>
        total + item.stock,
      0
    );

  const inStock =
    inventory.filter(
      (item) =>
        item.stock >
        item.lowStockThreshold
    ).length;

  const lowStock =
    inventory.filter(
      (item) =>
        item.stock > 0 &&
        item.stock <=
          item.lowStockThreshold
    ).length;

  const outOfStock =
    inventory.filter(
      (item) =>
        item.stock === 0
    ).length;

  const inventoryStats = [
    {
      label: "Total Units",
      value: totalStock,
      icon: Boxes,
    },
    {
      label: "In Stock",
      value: inStock,
      icon: PackageCheck,
    },
    {
      label: "Low Stock",
      value: lowStock,
      icon: AlertTriangle,
    },
    {
      label: "Out of Stock",
      value: outOfStock,
      icon: PackageX,
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

      {/* Dynamic Stats */}
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
                <div className="flex h-10 w-10 items-center justify-center bg-neutral-100">
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
          onInventoryChange={
            setInventory
          }
        />
      </div>
    </div>
  );
}