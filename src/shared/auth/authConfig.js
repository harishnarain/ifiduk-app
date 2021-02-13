import { Configuration, PublicClientApplication } from '@azure/msal-browser';

import b2cPolicies from './b2cPolicies';

// MSAL configuration
const configuration: Configuration = {
  auth: {
    // This is the ONLY mandatory field; everything else is optional.
    clientId: 'caee1535-c4a8-47ff-882d-b3cc5f17e4dd',
    // Choose sign-up/sign-in user-flow as your default.
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    // You must identify your tenant's domain as a known authority.
    knownAuthorities: [b2cPolicies.authorityDomain],
    // You must register this URI on Azure Portal/App Registration.
    // Defaults to "window.location.href".
    redirectUri: 'https://ifiduk-app.azurewebsites.net',
  },
  cache: {
    // Configures cache location. "sessionStorage" is more secure,
    // but "localStorage" gives you SSO.
    cacheLocation: 'localStorage',
    // If you wish to store cache items in cookies as well as browser cache, set this to "true".
    storeAuthStateInCookie: false,
  },
};

const pca = new PublicClientApplication(configuration);

export default pca;
