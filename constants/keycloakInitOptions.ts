// these are set in next.config.js
export const keycloakInitOptions = {
  realm: process.env.keycloakRealm || "samplerealm",
  url: process.env.keycloakUrl || "http://localhost:8080/auth",
  clientId: process.env.keycloakClientId || "nextjs"
}

// export const keycloakInitOptions = {
//   realm: process.env.keycloakRealm || "ops",
//   url: process.env.keycloakUrl || "http://localhost:8080/auth",
//   clientId: process.env.keycloakClientId || "www"
// }
