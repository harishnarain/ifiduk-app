import React, { Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import SideDrawer from '../../components/SideDrawer/SideDrawer';
import AppCatalog from '../AppCatalog/AppCatalog';
import Subscriptions from '../Subscriptions/Subscriptions';
import CreateSubscription from '../CreateSubscription/CreateSubscription';
import AdminDashboard from '../AdminDashboard/AdminDashboard';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}));

const Admin = () => {
  const classes = useStyles();

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
    <div className={classes.root}>
      <CssBaseline />
      <SideDrawer />
      <Container>
        <Suspense fallback={<p>Loading...</p>}>{adminRoutes}</Suspense>
      </Container>
    </div>
  );
};

export default withRouter(Admin);
