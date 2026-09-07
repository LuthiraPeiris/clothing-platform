import Keycloak from "keycloak-js";

export const keycloak = new Keycloak({
  url: "http://localhost:8081",
  realm: "clothing-platform",
  clientId: "clothing-frontend",
});

let initPromise:
  Promise<boolean> | null = null;

export function initKeycloak() {
  if (!initPromise) {
    initPromise = keycloak.init({
      onLoad: "check-sso",
      pkceMethod: "S256",
      checkLoginIframe: false,

      silentCheckSsoRedirectUri:
        `${window.location.origin}/silent-check-sso.html`,

      silentCheckSsoFallback: false,
    });
  }

  return initPromise;
}

export default keycloak;