"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  InventoryClient,
} from "@/components/admin/inventory-client";

import {
  Spinner,
} from "@/components/ui/spinner";

import {
  getAccessToken,
} from "@/services/auth-service";

import {
  getInventory,
} from "@/services/inventory-service";

import type {
  InventoryItem,
} from "@/services/inventory-service";

export default function InventoryPage() {
  const [
    inventory,
    setInventory,
  ] = useState<
    InventoryItem[]
  >([]);

  const [
    loading,
    setLoading,
  ] = useState(
    true
  );

  const [
    error,
    setError,
  ] = useState<
    string | null
  >(null);

  useEffect(() => {
    let active =
      true;

    async function loadInventory() {
      try {
        setLoading(
          true
        );

        setError(
          null
        );

        /*
         * Get current ADMIN
         * Keycloak access token.
         */
        const accessToken =
          await getAccessToken();

        /*
         * ADMIN-only endpoint:
         *
         * GET /api/inventory
         */
        const data =
          await getInventory(
            accessToken
          );

        if (
          active
        ) {
          setInventory(
            data
          );
        }
      } catch (error) {
        if (
          active
        ) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to load inventory."
          );
        }
      } finally {
        if (
          active
        ) {
          setLoading(
            false
          );
        }
      }
    }

    loadInventory();

    return () => {
      active =
        false;
    };
  }, []);

  if (
    loading
  ) {
    return (
      <div className="flex min-h-[450px] items-center justify-center">
        <div className="flex flex-col items-center">
          <Spinner
            size="lg"
          />

          <p className="mt-4 text-sm text-neutral-500">
            Loading inventory...
          </p>
        </div>
      </div>
    );
  }

  if (
    error
  ) {
    return (
      <div>
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
            Stock Management
          </p>

          <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Inventory
          </h1>
        </div>

        <div className="mt-8 border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          {error}
        </div>
      </div>
    );
  }

  return (
    <InventoryClient
      initialInventory={
        inventory
      }
    />
  );
}