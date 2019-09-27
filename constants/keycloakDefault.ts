import { KeycloakInstance, KeycloakPromise } from "keycloak-js"

const noops = {
  string: () => "noop",
  boolean: () => true
}

const myPromise: KeycloakPromise<any, any> = {
  success: _cb => {
    return myPromise
  },
  error: _cb => {
    return myPromise
  }
}

// this is a fake Keycloak instance we use to initialize Keycloak on the server.
// This gets over-written as soon as Keycloak is initialized on the client.
export const keycloakDefault: KeycloakInstance = {
  login: _options => {
    return myPromise
  },
  logout: _options => {
    return myPromise
  },
  register: _options => {
    return myPromise
  },
  accountManagement: () => {
    return myPromise
  },
  init: _options => {
    return myPromise
  },
  createLoginUrl: noops.string,
  createLogoutUrl: noops.string,
  createAccountUrl: noops.string,
  createRegisterUrl: noops.string,
  isTokenExpired: noops.boolean,
  updateToken: _options => myPromise,
  clearToken: noops.string,
  hasRealmRole: noops.boolean,
  hasResourceRole: noops.boolean,
  loadUserProfile: () => myPromise,
  loadUserInfo: () => myPromise,
  authenticated: false
}
