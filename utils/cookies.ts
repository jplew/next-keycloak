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
