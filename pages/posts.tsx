import { NextPage } from "next"
import { useKeycloakContext, useServerContext } from "../utils/context"
import Layout from "../components/Layout"

const Posts: NextPage = () => {
  const { keycloak } = useKeycloakContext()
  const { isAuthenticated } = useServerContext()

  const parsedToken: any = keycloak.tokenParsed

  const welcomeMessage =
    keycloak && parsedToken
      ? `Welcome back ${parsedToken.name}!`
      : "Welcome visitor. Please log in."

  return (
    <Layout>
      <p>{welcomeMessage}</p>
      {isAuthenticated === "true" ? "authenticated" : "not authenticated"}
    </Layout>
  )
}

export default Posts
