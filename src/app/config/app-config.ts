export const AppConfig = {
  BASE_URL: 'http://localhost:8080',
  // BASE_URL: "https://aion-server.herokuapp.com",
  OKTA_SIGN_IN_WIDGET_CONFIG: {
    baseUrl: 'https://dev-107152.okta.com',
    clientId: '0oa2v0s8c2tzepcwO357',
    redirectUri: 'http://localhost:4200/implicit/callback',
    authParams: {
      issuer: 'default',
      pkce: true
    }
  },
  OKTA_CLIENT_CONFIG: {
    issuer: 'https://dev-107152.okta.com/oauth2/default',
    clientId: '0oa2v0s8c2tzepcwO357',
    redirectUri: 'http://localhost:4200/implicit/callback',
    storage: 'localStorage'
  }
};
