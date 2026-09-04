"use client";

import keycloak, {
  initKeycloak,
} from "@/lib/keycloak";

/**
 * Make sure Keycloak has been initialized
 * before trying to access authentication data.
 */
async function ensureKeycloakInitialized() {
  await initKeycloak();
}

/**
 * Returns a valid Keycloak access token.
 *
 * The token is refreshed if it is going
 * to expire within the next 30 seconds.
 */
export async function getAccessToken(): Promise<string> {
  await ensureKeycloakInitialized();

  if (
    !keycloak.authenticated
  ) {
    throw new Error(
      "You must be logged in to perform this action."
    );
  }

  try {
    await keycloak.updateToken(
      30
    );
  } catch (error) {
    console.error(
      "Failed to refresh access token:",
      error
    );

    keycloak.clearToken();

    throw new Error(
      "Your session has expired. Please sign in again."
    );
  }

  const token =
    keycloak.token;

  if (!token) {
    throw new Error(
      "Authentication token is unavailable."
    );
  }

  return token;
}

/**
 * Returns the current access token
 * without throwing when the user
 * is not authenticated.
 */
export async function getOptionalAccessToken():
  Promise<string | undefined> {
  await ensureKeycloakInitialized();

  if (
    !keycloak.authenticated
  ) {
    return undefined;
  }

  try {
    await keycloak.updateToken(
      30
    );

    return (
      keycloak.token ??
      undefined
    );
  } catch (error) {
    console.error(
      "Failed to refresh access token:",
      error
    );

    keycloak.clearToken();

    return undefined;
  }
}

/**
 * Check whether the currently
 * logged-in user has ADMIN role.
 */
export async function isCurrentUserAdmin():
  Promise<boolean> {
  await ensureKeycloakInitialized();

  return (
    keycloak.authenticated ===
      true &&
    keycloak.hasRealmRole(
      "ADMIN"
    )
  );
}

/**
 * Check whether the currently
 * logged-in user has CUSTOMER role.
 */
export async function isCurrentUserCustomer():
  Promise<boolean> {
  await ensureKeycloakInitialized();

  return (
    keycloak.authenticated ===
      true &&
    keycloak.hasRealmRole(
      "CUSTOMER"
    )
  );
}