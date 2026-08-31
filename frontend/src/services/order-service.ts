const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:8080";

export type CreateOrderItemRequest = {
  productId: number;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
};

export type CreateOrderRequest = {
  customerName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  city: string;
  postalCode?: string;
  items: CreateOrderItemRequest[];
};

export type OrderItemResponse = {
  id: number;
  productId: number;
  productName: string;
  productImage: string | null;
  quantity: number;
  price: number;
  selectedSize: string | null;
  selectedColor: string | null;
};

export type OrderResponse = {
  id: number;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  city: string;
  postalCode: string | null;

  status:
    | "PENDING"
    | "CONFIRMED"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED";

  subtotal: number;
  shippingFee: number;
  total: number;
  createdAt: string;
  items: OrderItemResponse[];
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

    if (data?.errors) {
      return Object.values(
        data.errors
      ).join(", ");
    }
  } catch {
    // Ignore invalid JSON response.
  }

  return `Request failed with status ${response.status}`;
}

export async function createOrder(
  request: CreateOrderRequest
): Promise<OrderResponse> {
  const response = await fetch(
    `${API_URL}/api/orders`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify(
        request
      ),
    }
  );

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(
        response
      )
    );
  }

  return response.json();
}