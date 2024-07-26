const CLIENT_ID = process.env.REACT_APP_OKTA_APPLICATION_ID;
const ISSUER = process.env.REACT_APP_OKTA_ISSUER_URL;
const OKTA_TESTING_DISABLEHTTPSCHECK = process.env.REACT_APP_OKTA_TESTING_DISABLEHTTPSCHECK || false;
const REDIRECT_URI = `${window.location.origin}/login/callback`;

export default {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: REDIRECT_URI,
    // The scopes associated with access tokens determine which claims are available when they are used to access the OIDC
    scopes: ['openid', 'profile', 'email', 'groups'],
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
};
