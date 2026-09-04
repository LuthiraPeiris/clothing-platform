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

async function getErrorMessage(
  response: Response
) {
  try {
    const data =
      await response.json();

    if (
      typeof data?.message ===
      "string"
    ) {
      return data.message;
    }

    if (
      data?.errors
    ) {
      return Object.values(
        data.errors
      ).join(", ");
    }
  } catch {
    // Ignore non-JSON responses.
  }

  if (
    response.status === 401
  ) {
    return (
      "Your session is missing or has expired. Please sign in again."
    );
  }

  if (
    response.status === 403
  ) {
    return (
      "You do not have permission to manage inventory."
    );
  }

  if (
    response.status === 404
  ) {
    return (
      "Inventory record not found."
    );
  }

  return (
    `Inventory request failed with status ${response.status}`
  );
}

export async function getInventory(
  accessToken: string
): Promise<
  InventoryItem[]
> {
  const response =
    await fetch(
      `${API_URL}/api/inventory`,
      {
        cache:
          "no-store",

        headers: {
          Authorization:
            `Bearer ${accessToken}`,
        },
      }
    );

  if (
    !response.ok
  ) {
    throw new Error(
      await getErrorMessage(
        response
      )
    );
  }

  return response.json();
}

export async function increaseStock(
  productId: number,
  amount: number,
  accessToken: string
): Promise<InventoryItem> {
  const response =
    await fetch(
      `${API_URL}/api/inventory/product/${productId}/increase`,
      {
        method:
          "PATCH",

        headers: {
          Authorization:
            `Bearer ${accessToken}`,

          "Content-Type":
            "application/json",
        },

        body:
          JSON.stringify({
            amount,
          }),
      }
    );

  if (
    !response.ok
  ) {
    throw new Error(
      await getErrorMessage(
        response
      )
    );
  }

  return response.json();
}

export async function decreaseStock(
  productId: number,
  amount: number,
  accessToken: string
): Promise<InventoryItem> {
  const response =
    await fetch(
      `${API_URL}/api/inventory/product/${productId}/decrease`,
      {
        method:
          "PATCH",

        headers: {
          Authorization:
            `Bearer ${accessToken}`,

          "Content-Type":
            "application/json",
        },

        body:
          JSON.stringify({
            amount,
          }),
      }
    );

  if (
    !response.ok
  ) {
    throw new Error(
      await getErrorMessage(
        response
      )
    );
  }

  return response.json();
}