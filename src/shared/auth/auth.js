import * as msal from '@azure/msal-browser';

import b2cPolicies from './b2cPolicies';
import { msalConfig, loginRequest } from './authConfig';

// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js
const myMSALObj = new msal.PublicClientApplication(msalConfig);

let accountId = '';
let username = '';
let accessToken = null;

const handlePolicyChange = (response) => {
  /**
       * We need to reject id tokens that were not issued with the default sign-in policy.
       * "acr" claim in the token tells us what policy is used (NOTE: for new policies (v2.0),
       * use "tfp" instead of "acr").
       * To learn more about B2C tokens, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
       */

  if (response.idTokenClaims.acr === b2cPolicies.names.editProfile) {
    window.alert('Profile has been updated successfully. \nPlease sign-in again.');
    myMSALObj.logout();
  } else if (response.idTokenClaims.acr === b2cPolicies.names.forgotPassword) {
    window.alert('Password has been reset successfully. \nPlease sign-in with your new password.');
    myMSALObj.logout();
  }
};

const selectAccount = () => {
  /**
       * See here for more information on account retrieval:
       * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
       */

  const currentAccounts = myMSALObj.getAllAccounts();

  if (currentAccounts.length > 1) {
    // Add your account choosing logic here
    console.log('Multiple accounts detected.');
  } else if (currentAccounts.length === 1) {
    accountId = currentAccounts[0].homeAccountId;
    username = currentAccounts[0].username;
    console.log(username);
    // welcomeUser(username);
  }
};

const handleResponse = (response) => {
  /**
       * To see the full list of response object properties, visit:
       * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#response
       */

  if (response) {
    // if response contains an access token, store it
    if (response.accessToken && response.accessToken !== '') {
      accessToken = response.accessToken;
      console.log(accessToken);
    }

    // for handling B2C user-flows and policies
    handlePolicyChange(response);

    selectAccount();
  }
};

myMSALObj.handleRedirectPromise()
  .then(handleResponse)
  .catch((error) => {
    console.log(error);

    // Check for forgot password error
    // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
    if (error.errorMessage.indexOf('AADB2C90118') > -1) {
      try {
        myMSALObj.loginRedirect(b2cPolicies.authorities.forgotPassword);
      } catch (err) {
        console.log(err);
      }
    }
  });

// in case of page refresh
selectAccount();

export const signIn = () => {
  /**
     * You can pass a custom request object below. This will override the initial configuration.
     * For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */

  myMSALObj.loginRedirect(loginRequest);
};

export const signOut = () => {
  /**
     * You can pass a custom request object below. This will override the initial configuration.
     * For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */

  // Choose which account to logout from by passing a homeAccountId.
  const logoutRequest = {
    account: myMSALObj.getAccountByHomeId(accountId),
  };

  myMSALObj.logout(logoutRequest);
};

export const getTokenRedirect = (request) => {
  /**
    * See here for more info on account retrieval:
    * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
    */

  request.account = myMSALObj.getAccountByHomeId(accountId);

  return myMSALObj.acquireTokenSilent(request)
    .then((response) => {
      // In case the response from B2C server has an empty accessToken field
      // throw an error to initiate token acquisition
      if (!response.accessToken || response.accessToken === '') {
        throw new msal.InteractionRequiredAuthError();
      }
      return handleResponse(response);
    })
    .catch((error) => {
      console.log(error);
      console.log('silent token acquisition fails. acquiring token using popup');
      if (error instanceof msal.InteractionRequiredAuthError) {
        // fallback to interaction when silent call fails
        return myMSALObj.acquireTokenRedirect(request);
      }
      console.log(error);
      return error;
    });
};

// Acquires and access token and then passes it to the API call
// const passTokenToApi = () => {
//   if (!accessToken) {
//     getTokenRedirect(tokenRequest);
//   } else {
//     try {
//       callApi(apiConfig.webApi, accessToken);
//     } catch (error) {
//       console.log(error);
//     }
//   }
// };

export const editProfile = () => {
  myMSALObj.loginRedirect(b2cPolicies.authorities.editProfile);
};
