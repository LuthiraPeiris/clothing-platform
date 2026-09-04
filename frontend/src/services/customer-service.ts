const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:8080";

export type CustomerStatus =
  | "ACTIVE"
  | "INACTIVE";

export type CustomerResponse = {
  id: number;

  name: string;

  email: string;

  phone: string;

  orders: number;

  totalSpent: number;

  joinedAt: string;

  status: CustomerStatus;
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
    // Ignore invalid JSON.
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
      "You do not have permission to manage customers."
    );
  }

  if (
    response.status === 404
  ) {
    return (
      "Customer not found."
    );
  }

  return (
    `Request failed with status ${response.status}`
  );
}

export async function getCustomers(
  accessToken: string
): Promise<
  CustomerResponse[]
> {
  const response =
    await fetch(
      `${API_URL}/api/customers`,
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

export async function getCustomerById(
  id: number,
  accessToken: string
): Promise<CustomerResponse> {
  const response =
    await fetch(
      `${API_URL}/api/customers/${id}`,
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

export async function updateCustomerStatus(
  id: number,
  status: CustomerStatus,
  accessToken: string
): Promise<CustomerResponse> {
  const response =
    await fetch(
      `${API_URL}/api/customers/${id}/status`,
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