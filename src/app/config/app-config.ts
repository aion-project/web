export const AppConfig = {
  BASE_URL: "http://localhost:8080",
  OKTA_CLIENT_CONFIG: {
    issuer: 'https://dev-107152.okta.com/oauth2/default',
    clientId: '0oa1hsio8iqqxWKTd357',
    redirectUri: "http://localhost:4200/implicit/callback",
    storage: "localStorage"
  }
}