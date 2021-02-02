import React from 'react';
// import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
// import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { useAccount, useIsAuthenticated, useMsal } from '@azure/msal-react';

// import { signIn, signOut, selectAccount } from '../../../shared/auth/auth';

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
  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts } = useMsal();

  const account = useAccount(accounts[0]);
  const loginScopes = {
    scopes: ['https://ifiduk.onmicrosoft.com/26077f63-802a-4d8f-aa28-bb9f611989cf/demo.read'],
  };

  console.log(account);

  if (account) {
    instance
      .acquireTokenSilent({
        scopes: ['https://ifiduk.onmicrosoft.com/26077f63-802a-4d8f-aa28-bb9f611989cf/demo.read'],
        account,
      })
      .then((res) => {
        console.log(res);
      });
  }

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
        {isAuthenticated && (
          <Button color="inherit" variant="outlined" onClick={() => instance.logout()}>
            Sign out
          </Button>
        )}
        {!isAuthenticated && (
          <Button color="inherit" variant="outlined" onClick={() => instance.loginRedirect(loginScopes)}>
            Sign in
          </Button>
        )}
      </div>
    </>
  );
};

export default NavItems;
