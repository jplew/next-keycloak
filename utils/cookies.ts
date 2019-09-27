/**
 * @author: JP Lew (jp@cto.ai)
 * @date: Monday, 22nd July 2019 2:45:25 pm
 * @lastModifiedBy: JP Lew (jp@cto.ai)
 * @lastModifiedTime: Thursday, 26th September 2019 1:23:15 pm
 * @copyright (c) 2019 CTO.ai
 */

import { IncomingMessage } from "http"
import cookie from "cookie"
import Cookie from "js-cookie"

export function setCookie(name: string, val: string) {
  Cookie.set(name, val)
}

export function getCookie(name: string) {
  return Cookie.get(name)
}

export function parseCookies(req: IncomingMessage | undefined) {
  if (!req || !req.headers) {
    return {}
  }
  return cookie.parse(req.headers.cookie || "")
}
