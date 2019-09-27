import * as React from "react"
import { NextPage } from "next"
import { useKeycloakContext } from "../utils/context"
import Layout from "../components/Layout"

const ProfilePage: NextPage = () => {
  const { keycloak } = useKeycloakContext()

  const parsedToken: any = keycloak.tokenParsed
  const name = keycloak && parsedToken ? parsedToken.name : "unauthenticated"

  return (
    <Layout title="Home | Next.js + Keycloak Example">
      <h1 className="my-5">Hello {name}</h1>
      <p>Welcome to your profile</p>
    </Layout>
  )
}

export default ProfilePage
