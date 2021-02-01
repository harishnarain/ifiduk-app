import React, { Suspense } from 'react';
import {
  Route, Switch, withRouter, Redirect,
} from 'react-router-dom';

import Home from './containers/Home/Home';
import Layout from './containers/Layout/Layout';

const App = () => {
  const routes = (
    <Switch>
      <Route path="/" exact component={Home} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </>
  );
};

export default withRouter(App);
