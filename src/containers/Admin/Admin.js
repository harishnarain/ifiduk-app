import React, { Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { useMsal, MsalAuthenticationTemplate } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';

import SideDrawer from '../../components/SideDrawer/SideDrawer';
import AppCatalog from '../AppCatalog/AppCatalog';
import Subscriptions from '../Subscriptions/Subscriptions';
import CreateSubscription from '../CreateSubscription/CreateSubscription';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import authScopes from '../../shared/auth/authScopes';
import Spinner from '../../components/UI/Spinner';
import Aux from '../../hoc/Aux/Aux';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}));

const Admin = () => {
  const classes = useStyles();
  const { instance, accounts } = useMsal();
  const loginScopes = { ...authScopes };

  if (accounts.length > 0) {
    const userName = accounts[0].username;
    const currentAccount = instance.getAccountByUsername(userName);
    const silentRequest = {
      ...loginScopes,
      account: currentAccount,
      forceRefresh: false,
    };

    const request = {
      ...loginScopes,
      loginHint: currentAccount.username,
    };

    instance
      .acquireTokenSilent(silentRequest)
      .then((res) => {
        console.log(res);
      })
      .catch(() => useMsal.acquireTokenRedirect(request));
  }

  const adminRoutes = (
    <Switch>
      <Route path="/admin/subscriptions/:productId" exact component={CreateSubscription} />
      <Route path="/admin/subscriptions" component={Subscriptions} />
      <Route path="/admin/appcatalog" exact component={AppCatalog} />
      <Route path="/admin" exact component={AdminDashboard} />
      <Redirect to="/admin" />
    </Switch>
  );
  return (
    <Aux>
      {/* prettier-ignore */}
      <MsalAuthenticationTemplate
        interactionType={InteractionType.Redirect}
        loadingComponent={Spinner}
        authenticationRequest={loginScopes}
      >
      <div className={classes.root}>
        <CssBaseline />
        <SideDrawer />
        <Container>
          <Suspense fallback={<p>Loading...</p>}>{adminRoutes}</Suspense>
        </Container>
      </div>
      </MsalAuthenticationTemplate>
    </Aux>
  );
};

export default withRouter(Admin);
