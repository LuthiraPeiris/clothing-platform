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

export type CustomerProfileUpdateRequest = {
  name: string;

  phone: string;
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
    // Ignore invalid JSON responses.
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
      "Customer profile not found."
    );
  }

  return (
    `Request failed with status ${response.status}`
  );
}

/*
 * CUSTOMER
 *
 * Create or link the local MODEVA
 * customer record to the currently
 * authenticated Keycloak account.
 *
 * Identity information comes from
 * the backend JWT, not from this
 * request body.
 */
export async function syncMyCustomerProfile(
  accessToken: string
): Promise<CustomerResponse> {
  const response =
    await fetch(
      `${API_URL}/api/customers/me/sync`,
      {
        method:
          "POST",

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

/*
 * CUSTOMER
 *
 * Get the currently authenticated
 * customer's own profile.
 */
export async function getMyCustomerProfile(
  accessToken: string
): Promise<CustomerResponse> {
  const response =
    await fetch(
      `${API_URL}/api/customers/me`,
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

/*
 * CUSTOMER
 *
 * Update the currently authenticated
 * customer's name and phone.
 *
 * Email remains controlled by
 * Keycloak.
 */
export async function updateMyCustomerProfile(
  request: CustomerProfileUpdateRequest,
  accessToken: string
): Promise<CustomerResponse> {
  const response =
    await fetch(
      `${API_URL}/api/customers/me`,
      {
        method:
          "PUT",

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
 * ADMIN
 *
 * Get every customer.
 */
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

/*
 * ADMIN
 *
 * Get one customer by database ID.
 */
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

/*
 * ADMIN
 *
 * Change customer status.
 */
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