import { UserAgentApplication } from 'msal';

export const requiresInteraction = (errorMessage) => {
  if (!errorMessage || !errorMessage.length) {
    return false;
  }

  return (
    errorMessage.indexOf('consent_required') > -1
    || errorMessage.indexOf('interaction_required') > -1
    || errorMessage.indexOf('login_required') > -1
  );
};

export const fetchMsGraph = async (url, accessToken) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.json();
};

export const isIE = () => {
  const ua = window.navigator.userAgent;
  const msie = ua.indexOf('MSIE ') > -1;
  const msie11 = ua.indexOf('Trident/') > -1;

  // If you as a developer are testing using Edge InPrivate mode,
  // please add "isEdge" to the if check const isEdge = ua.indexOf("Edge/") > -1;

  return msie || msie11;
};

export const AUTH_SCOPES = {
  OPENID: 'openid',
  OFFLINE_ACCESS: 'offline_access',
  PROFILE: 'profile',
};

export const AUTH_REQUESTS = {
  LOGIN: {
    scopes: [AUTH_SCOPES.OPENID, AUTH_SCOPES.PROFILE],
  },
  EMAIL: {
    scopes: [],
  },
  REFRESH_TOKEN: {
    scopes: ['caee1535-c4a8-47ff-882d-b3cc5f17e4dd'],
  },
};

export const msalApp = new UserAgentApplication({
  auth: {
    clientId: 'caee1535-c4a8-47ff-882d-b3cc5f17e4dd',
    authority: 'https://ifiduk.b2clogin.com/ifiduk.onmicrosoft.com/B2C_1_signupsignin',
    validateAuthority: false,
    redirectUri: 'http://localhost:3000',
    postLogoutRedirectUri: 'http://localhost:3000',
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: isIE(),
  },
  system: {
    navigateFrameWait: 0,
  },
});
