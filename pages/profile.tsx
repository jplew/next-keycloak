import { NextPage } from "next"
import { Layout } from "../components/Layout"
import { useKeycloakContext } from "../utils/context"

const ProfilePage: NextPage = () => {
  const { keycloak } = useKeycloakContext()

  const parsedToken: any = keycloak.tokenParsed

  const profile = keycloak.authenticated ? (
    <ul>
      <li>
        <span className="font-weight-bold mr-1">Email:</span>
        <span className="text-muted">{parsedToken.email}</span>
      </li>
      <li>
        <span className="font-weight-bold mr-1">Username:</span>
        <span className="text-muted">{parsedToken.preferred_username}</span>
      </li>
      <li>
        <span className="font-weight-bold mr-1">First Name:</span>
        <span className="text-muted">{parsedToken.given_name}</span>
      </li>
      <li>
        <span className="font-weight-bold mr-1">Last Name:</span>
        <span className="text-muted">{parsedToken.family_name}</span>
      </li>
    </ul>
  ) : (
    <span>Please login to view profile.</span>
  )

  return (
    <Layout title="Home | Next.js + Keycloak Example">
      <h1 className="my-5">User Profile</h1>
      {profile}
    </Layout>
  )
}

export default ProfilePage
