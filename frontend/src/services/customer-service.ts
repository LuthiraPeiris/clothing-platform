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
  } catch {
    // Ignore invalid JSON.
  }

  return `Request failed with status ${response.status}`;
}

export async function getCustomers(): Promise<
  CustomerResponse[]
> {
  const response = await fetch(
    `${API_URL}/api/customers`,
    {
      cache: "no-store",
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

export async function getCustomerById(
  id: number
): Promise<CustomerResponse> {
  const response = await fetch(
    `${API_URL}/api/customers/${id}`,
    {
      cache: "no-store",
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

export async function updateCustomerStatus(
  id: number,
  status: CustomerStatus
): Promise<CustomerResponse> {
  const response = await fetch(
    `${API_URL}/api/customers/${id}/status`,
    {
      method: "PATCH",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        status,
      }),
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