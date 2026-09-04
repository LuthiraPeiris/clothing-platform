const API_URL =
  process.env
    .NEXT_PUBLIC_API_URL ??
  "http://localhost:8080";

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

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
  status: OrderStatus;
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

    if (
      data?.errors
    ) {
      return Object.values(
        data.errors
      ).join(", ");
    }
  } catch {
    // Response did not contain JSON.
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
      "You do not have permission to perform this action."
    );
  }

  if (
    response.status === 404
  ) {
    return (
      "The requested resource could not be found."
    );
  }

  return (
    `Request failed with status ${response.status}`
  );
}

/*
 * CUSTOMER ONLY
 */
export async function createOrder(
  request: CreateOrderRequest,
  accessToken: string
): Promise<OrderResponse> {

  const response =
    await fetch(
      `${API_URL}/api/orders`,
      {
        method:
          "POST",

        headers: {
          Authorization:
            `Bearer ${accessToken}`,

          "Content-Type":
            "application/json",
        },

        body:
          JSON.stringify(
            request
          ),
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

/*
 * CUSTOMER ONLY
 *
 * Gets only the orders belonging
 * to the authenticated user.
 */
export async function getMyOrders(
  accessToken: string
): Promise<OrderResponse[]> {

  const response =
    await fetch(
      `${API_URL}/api/orders/my`,
      {
        headers: {
          Authorization:
            `Bearer ${accessToken}`,
        },

        cache:
          "no-store",
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

/*
 * ADMIN ONLY
 *
 * Retrieves every customer's orders.
 */
export async function getOrders(
  accessToken: string
): Promise<OrderResponse[]> {

  const response =
    await fetch(
      `${API_URL}/api/orders`,
      {
        headers: {
          Authorization:
            `Bearer ${accessToken}`,
        },

        cache:
          "no-store",
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

/*
 * CUSTOMER / ADMIN
 *
 * Backend performs ownership
 * validation for CUSTOMER.
 */
export async function getOrderById(
  id: string,
  accessToken: string
): Promise<OrderResponse> {

  const response =
    await fetch(
      `${API_URL}/api/orders/${id}`,
      {
        headers: {
          Authorization:
            `Bearer ${accessToken}`,
        },

        cache:
          "no-store",
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

/*
 * CUSTOMER / ADMIN
 */
export async function getOrderByNumber(
  orderNumber: string,
  accessToken: string
): Promise<OrderResponse> {

  const response =
    await fetch(
      `${API_URL}/api/orders/number/${encodeURIComponent(
        orderNumber
      )}`,
      {
        headers: {
          Authorization:
            `Bearer ${accessToken}`,
        },

        cache:
          "no-store",
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

/*
 * ADMIN ONLY
 */
export async function updateOrderStatus(
  id: number,
  status: OrderStatus,
  accessToken: string
): Promise<OrderResponse> {

  const response =
    await fetch(
      `${API_URL}/api/orders/${id}/status`,
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
            status,
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