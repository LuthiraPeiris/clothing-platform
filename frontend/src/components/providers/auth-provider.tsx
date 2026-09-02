"use client";

import type {
  ReactNode,
} from "react";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import keycloak, { initKeycloak } from "@/lib/keycloak";

type AuthContextValue = {
  initialized: boolean;
  authenticated: boolean;
  token?: string;
  userId?: string;
  username?: string;
  email?: string;

  isCustomer: boolean;
  isAdmin: boolean;

  login: () => void;
  register: () => void;
  logout: () => void;
};

const AuthContext =
  createContext<
    AuthContextValue | undefined
  >(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [
    initialized,
    setInitialized,
  ] = useState(false);

  const [
    authenticated,
    setAuthenticated,
  ] = useState(false);

  const [
    token,
    setToken,
  ] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    let mounted = true;

    async function initialize() {
  try {
    const isAuthenticated =
      await initKeycloak();

    if (!mounted) {
      return;
    }

    setAuthenticated(
      isAuthenticated
    );

    setToken(
      keycloak.token
    );

    setInitialized(
      true
    );
  } catch (error) {
    console.error(
      "Failed to initialize Keycloak:",
      error
    );

    if (mounted) {
      setInitialized(
        true
      );
    }
  }
}

    initialize();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!authenticated) {
      return;
    }

    const interval =
      window.setInterval(
        async () => {
          try {
            const refreshed =
              await keycloak.updateToken(
                30
              );

            if (refreshed) {
              setToken(
                keycloak.token
              );
            }
          } catch (error) {
            console.error(
              "Failed to refresh Keycloak token:",
              error
            );

            keycloak.clearToken();

            setAuthenticated(
              false
            );

            setToken(
              undefined
            );
          }
        },
        20000
      );

    return () =>
      window.clearInterval(
        interval
      );
  }, [authenticated]);

  function login() {
    keycloak.login({
      redirectUri:
        window.location.origin,
    });
  }

  function register() {
    keycloak.register({
      redirectUri:
        window.location.origin,
    });
  }

  function logout() {
    keycloak.logout({
      redirectUri:
        window.location.origin,
    });
  }

  const value:
    AuthContextValue = {
      initialized,
      authenticated,
      token,

      userId:
        keycloak.subject,

      username:
        keycloak.tokenParsed
          ?.preferred_username,

      email:
        keycloak.tokenParsed
          ?.email,

      isCustomer:
        keycloak.hasRealmRole(
          "CUSTOMER"
        ),

      isAdmin:
        keycloak.hasRealmRole(
          "ADMIN"
        ),

      login,
      register,
      logout,
    };

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(
      AuthContext
    );

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}