import * as React from "react"
import Layout from "../components/Layout"
import { NextPage } from "next"

const IndexPage: NextPage = () => {
  return (
    <Layout title="Home | Next.js + Keycloak Example">
      <h1 className="my-5">Hello Next.js + Keycloak 👋</h1>
      <p>This is an example of a Next.js site using Keycloak.</p>
    </Layout>
  )
}

export default IndexPage
