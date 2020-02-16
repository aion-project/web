#!/bin/sh
echo "Coping"
rm -rf src/app/config/app-config.ts
echo "export const AppConfig = { BASE_URL: 'https://aion-server.herokuapp.com', OKTA_SIGN_IN_WIDGET_CONFIG: { baseUrl: 'https://dev-107152.okta.com', clientId: '0oa1hsio8iqqxWKTd357', redirectUri: '${BASE_URL}/implicit/callback', authParams: { issuer: 'default', pkce: true }}, OKTA_CLIENT_CONFIG: { issuer: 'https://dev-107152.okta.com/oauth2/default', clientId: '0oa1hsio8iqqxWKTd357', redirectUri: '${BASE_URL}/implicit/callback', storage: 'localStorage' }}" >> src/app/config/app-config.ts
echo "Done"