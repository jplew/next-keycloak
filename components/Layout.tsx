import * as React from "react"
import Head from "next/head"
import { Header } from "./Header"

type Props = {
  title?: string
}

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = "Next.js + Keycloak Example"
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      />
    </Head>

    <Header />

    <div className="container my-5">{children}</div>

    <footer className="footer">
      <hr />
      <div className="container">
        <span className="text-muted">This is the footer.</span>
      </div>
    </footer>
  </div>
)

export default Layout
