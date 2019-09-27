import { NextPage } from "next"
import { Layout } from "../components/Layout"
import { useKeycloakContext } from "../utils/context"

const IndexPage: NextPage = () => {
  const { keycloak } = useKeycloakContext()

  const parsedToken: any = keycloak.tokenParsed

  const loggedinState =
    keycloak && keycloak.authenticated ? (
      <span className="text-success">logged in</span>
    ) : (
      <span className="text-danger">not logged in</span>
    )

  const welcomeMessage =
    keycloak && parsedToken
      ? `Welcome back ${parsedToken.name}!`
      : "Welcome visitor. Please login to continue."

  return (
    <Layout title="Home | Next.js + Keycloak Example">
      <h1 className="mt-5">Hello Next.js + Keycloak 👋</h1>
      <div className="mb-5 lead text-muted">
        This is an example of a Next.js site using Keycloak.
      </div>

      <p>You are: {loggedinState}</p>
      <p>{welcomeMessage}</p>
    </Layout>
  )
}

export default IndexPage
