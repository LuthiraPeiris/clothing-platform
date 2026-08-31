import {
  InventoryClient,
} from "@/components/admin/inventory-client";

import {
  getInventory,
} from "@/services/inventory-service";

export default async function InventoryPage() {
  const inventory =
    await getInventory();

  return (
    <InventoryClient
      initialInventory={
        inventory
      }
    />
  );
}