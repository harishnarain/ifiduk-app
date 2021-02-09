import React, { Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import SideDrawer from '../../components/SideDrawer/SideDrawer';
import AppCatalog from '../AppCatalog/AppCatalog';
import Subscriptions from '../Subscriptions/Subscriptions';
import CreateSubscription from '../CreateSubscription/CreateSubscription';

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
