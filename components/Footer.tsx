/*
 * @author: JP Lew (jp@cto.ai)
 * @date: Friday, 27th September 2019 2:07:05 pm
 * @lastModifiedBy: JP Lew (jp@cto.ai)
 * @lastModifiedTime: Friday, 27th September 2019 3:09:38 pm
 * @copyright (c) 2019 CTO.ai
 */

import { FC } from "react"

export const Footer: FC = () => {
  return (
    <footer className="footer">
      <hr />
      <div className="container">
        <small className="text-muted">
          Repo:&nbsp;
          <a href="https://github.com/jplew/next-keycloak">
            https://github.com/jplew/next-keycloak
          </a>
        </small>
      </div>
    </footer>
  )
}
