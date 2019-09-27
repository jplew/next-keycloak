/**
 * @author: JP Lew (jp@cto.ai)
 * @date: Thursday, 26th September 2019 11:12:12 am
 * @lastModifiedBy: JP Lew (jp@cto.ai)
 * @lastModifiedTime: Thursday, 26th September 2019 12:00:16 pm
 * @copyright (c) 2019 CTO.ai
 */
import { createContext, useContext } from "react"
import { keycloakDefault } from "../constants/keycloakDefault"
import { ReactKeycloakInjectedProps } from "react-keycloak"

type setState = (val: string) => void

export interface ServerContextValues {
  isAuthenticated: string
  isServer: boolean | number
  setIsAuthenticated: setState
}

export type ServerState = Pick<
  ServerContextValues,
  "isAuthenticated" | "isServer"
>

export const KeycloakContext = createContext<ReactKeycloakInjectedProps>({
  keycloakInitialized: false,
  keycloak: keycloakDefault
})

export function useKeycloakContext() {
  const { keycloakInitialized, keycloak } = useContext(KeycloakContext)
  return Object.assign([keycloak, keycloakInitialized], {
    keycloakInitialized,
    keycloak
  })
}

export const ServerContext = createContext<ServerContextValues>({
  isAuthenticated: "true",
  isServer: true,
  setIsAuthenticated: (_val: string) => null
})

export function useServerContext() {
  const { isAuthenticated, isServer, setIsAuthenticated } = useContext(
    ServerContext
  )
  return Object.assign([isAuthenticated, isServer, setIsAuthenticated], {
    isAuthenticated,
    isServer,
    setIsAuthenticated
  })
}
