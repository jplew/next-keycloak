import { AppContextType, AppType } from "next/dist/next-server/lib/utils"
import Head from "next/head"

import { KeycloakProvider } from "../components/KeycloakProvider"
import { ServerProvider } from "../components/ServerProvider"
import { checkIfUserAuthenticated, keycloak, onEvent } from "../utils/keycloak"

const RegistryApp: AppType = ({ Component, pageProps }) => {
  const { isAuthenticated, isServer } = pageProps

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        />
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
      </Head>

      <ServerProvider {...{ isAuthenticated, isServer }}>
        <KeycloakProvider {...{ keycloak, onEvent }}>
          <Component {...pageProps} />
        </KeycloakProvider>
      </ServerProvider>
    </>
  )
}

async function getPageProps({ Component, ctx }: AppContextType) {
  return Component.getInitialProps ? Component.getInitialProps(ctx) : {}
}

RegistryApp.getInitialProps = async (appContext: AppContextType) => {
  const { isServer, isAuthenticated } = checkIfUserAuthenticated(appContext)

  return {
    pageProps: { ...getPageProps(appContext), isAuthenticated, isServer }
  }
}

export default RegistryApp
