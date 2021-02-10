import { useMsal } from '@azure/msal-react';
import authScopes from './authScopes';

export const getDemoToken = (account) => {
  const { instance } = useMsal();

  const userName = account.username;
  const currentAccount = instance.getAccountByUsername(userName);
  const silentRequest = {
    scopes: [authScopes.demoRead],
    account: currentAccount,
    forceRefresh: false,
  };

  const request = {
    scopes: [authScopes.demoRead],
    loginHint: currentAccount.username,
  };

  return instance
    .acquireTokenSilent(silentRequest)
    .then((res) => res)
    .catch(() => useMsal.acquireTokenRedirect(request));
};
