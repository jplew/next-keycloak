import Link from "next/link"
import { FC, useEffect } from "react"

import { useKeycloakContext, useServerContext } from "../utils/context"
import { setCookie } from "../utils/cookies"

export const Header: FC = () => {
  const { keycloak, keycloakInitialized } = useKeycloakContext()
  const { isServer, isAuthenticated, setIsAuthenticated } = useServerContext()
  /*
   * The purpose of this hook is to synchronize the Keycloak authentication
   * status with our custom cookie status (isAuthenticated).
   * keycloak.authenticated is authoritative, isAuthenticated is dependent.
   * Note: this is only refreshing state in our ServerContext Provider, it is
   * not setting the cookie. The cookie is being set in the onReady event in
   * utils/keycloak.ts.
   *
   * The reason we put this in the Header component (as opposed to the _app
   * template) is because Header is nested inside both our providers:
   * ServerContext and KeycloakContext.
   */
  useEffect(() => {
    const isKeycloakAuthenticated = keycloak.authenticated ? "true" : "false"
    if (keycloakInitialized && isKeycloakAuthenticated !== isAuthenticated) {
      setIsAuthenticated(isKeycloakAuthenticated)
    }
  })

  return (
    <header className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <Link href="/">
        <a className="my-0 mr-md-auto font-weight-bold text-dark">
          Next.js + Keycloak
        </a>
      </Link>
      <nav className="my-2 my-md-0 mr-md-3">
        <Link href="/profile">
          <a className="p-2 text-dark">Profile</a>
        </Link>
      </nav>
      {// either the client (keycloak.authenticated) or the server (isAuthenticated cookie) has to assert that the user is logged in
      keycloak.authenticated || (isServer && isAuthenticated === "true") ? (
        <>
          <button
            type="button"
            className="mx-2 btn btn-outline-primary"
            onClick={() => {
              setCookie("isAuthenticated", "false")
              window.location.href = keycloak.createLogoutUrl()
            }}
          >
            Logout
          </button>
          <button
            type="button"
            className="mx-2 btn btn-outline-primary"
            onClick={() => (window.location.href = keycloak.createAccountUrl())}
          >
            My Account
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            className="mx-2 btn btn-outline-primary"
            onClick={() =>
              (window.location.href = keycloak.createRegisterUrl())
            }
          >
            Signup
          </button>
          <button
            type="button"
            className="mx-2 btn btn-outline-primary"
            onClick={() => {
              window.location.href = keycloak.createLoginUrl()
            }}
          >
            Login
          </button>
        </>
      )}
    </header>
  )
}
