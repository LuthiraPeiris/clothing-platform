const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:8080";

export type InventoryItem = {
  id: number;
  productId: number;
  productName: string;
  productImage: string | null;
  category: string;
  sku: string;
  stock: number;
  lowStockThreshold: number;
  status:
    | "IN_STOCK"
    | "LOW_STOCK"
    | "OUT_OF_STOCK";
};

export async function getInventory(): Promise<
  InventoryItem[]
> {
  const response = await fetch(
    `${API_URL}/api/inventory`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch inventory: ${response.status}`
    );
  }

  return response.json();
}

export async function increaseStock(
  productId: number,
  amount: number
): Promise<InventoryItem> {
  const response = await fetch(
    `${API_URL}/api/inventory/product/${productId}/increase`,
    {
      method: "PATCH",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        amount,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to increase stock: ${response.status}`
    );
  }

  return response.json();
}

export async function decreaseStock(
  productId: number,
  amount: number
): Promise<InventoryItem> {
  const response = await fetch(
    `${API_URL}/api/inventory/product/${productId}/decrease`,
    {
      method: "PATCH",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        amount,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to decrease stock: ${response.status}`
    );
  }

  return response.json();
}