import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Link from '@material-ui/core/Link';

import { Typography } from '@material-ui/core';
import SideDrawerItems from './SideDrawerItems';
import LogoLink from '../UI/LogoLink';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  subtitle: {
    textAlign: 'center',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
}));

const SideDrawer = () => {
  const classes = useStyles();

  return (
    <Drawer className={classes.drawer} variant="permanent" classes={{ paper: classes.drawerPaper }} anchor="left">
      <Link href="/admin">
        <LogoLink />
        <Typography className={classes.subtitle} variant="subtitle1">
          Administration
        </Typography>
      </Link>
      <Divider />
      <List>
        <SideDrawerItems />
      </List>
    </Drawer>
  );
};

export default SideDrawer;
