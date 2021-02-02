import React, { Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { MsalProvider } from '@azure/msal-react';

import Home from './containers/Home/Home';
import Layout from './containers/Layout/Layout';
import pca from './shared/auth/authConfig';

const App = () => {
  const routes = (
    <Switch>
      <Route path="/" exact component={Home} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <MsalProvider instance={pca}>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </MsalProvider>
  );
};

export default withRouter(App);
