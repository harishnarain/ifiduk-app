import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import ShopIcon from '@material-ui/icons/Shop';

const SideDrawerItems = () => (
  <div>
    <ListItem button component={Link} to="/admin/subscriptions">
      <ListItemIcon>
        <SubscriptionsIcon />
      </ListItemIcon>
      <ListItemText primary="Subscriptions" />
    </ListItem>
    <ListItem button component={Link} to="/admin/appcatalog">
      <ListItemIcon>
        <ShopIcon />
      </ListItemIcon>
      <ListItemText primary="App Catalog" />
    </ListItem>
  </div>
);

export default SideDrawerItems;
