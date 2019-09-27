import { KeycloakInstance } from "keycloak-js"
import { AppContextType } from "next/dist/next-server/lib/utils"
import { KeycloakEvent } from "react-keycloak"

import { keycloakDefault } from "../constants/keycloakDefault"
import { keycloakInitOptions } from "../constants/keycloakInitOptions"
import { getCookie, parseCookies, setCookie } from "../utils/cookies"

export const Keycloak =
  typeof window !== "undefined" ? require("keycloak-js") : null

export const keycloak: KeycloakInstance =
  typeof window === "undefined"
    ? keycloakDefault
    : new Keycloak(keycloakInitOptions)

export const onEvent = (event: KeycloakEvent, error: Error | undefined) => {
  if (error) {
    return console.error(error)
  }

  if (event === "onAuthSuccess") {
    setCookie("isAuthenticated", "true")
  }
  if (event === "onAuthLogout") {
    setCookie("isAuthenticated", "false")
  }
  if (event === "onReady") {
    // make sure our cookie state never falls out of sync with our actual
    // keycloak state by checking on every page refresh
    if (keycloak.authenticated) {
      return setCookie("isAuthenticated", "true")
    }
    setCookie("isAuthenticated", "false")
  }
}

export const checkIfUserAuthenticated = ({ ctx: { req } }: AppContextType) => {
  const isServer = Boolean(req)

  if (isServer) {
    const cookies = parseCookies(req)
    return { isServer, isAuthenticated: cookies.isAuthenticated }
  }

  return { isServer, isAuthenticated: getCookie("isAuthenticated") }
}
