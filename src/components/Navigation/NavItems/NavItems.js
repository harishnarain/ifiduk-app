import React from 'react';
// import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
// import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { Typography } from '@material-ui/core';

import { signIn, signOut } from '../../../shared/auth/auth';

const useStyles = makeStyles(() => ({
  root: {
    // flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  ifTitleText: {
    color: '#70d6ff',
  },
  iTitleText: {
    color: '#ff70a6',
  },
  dTitleText: {
    color: '#ff9770',
  },
  uTitleText: {
    color: '#ffd670',
  },
  kTitleText: {
    color: '#e9ff70',
  },
}));

const NavItems = () => {
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.title}>
        <Link href="/" variant="h5">
          <span className={classes.ifTitleText}>IF</span>
          <span className={classes.iTitleText}>I</span>
          <span className={classes.dTitleText}>D</span>
          <span className={classes.uTitleText}>U</span>
          <span className={classes.kTitleText}>K</span>
        </Link>
      </Typography>
      <div>
        <Button color="inherit" variant="outlined" onClick={() => signOut()}>Sign out</Button>
        <Button color="inherit" variant="outlined" onClick={() => signIn()}>Sign in</Button>
      </div>
    </>
  );
};

export default NavItems;
