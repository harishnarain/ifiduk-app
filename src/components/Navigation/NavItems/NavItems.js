import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';

const useStyles = makeStyles((theme) => ({
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
  button: {
    marginLeft: theme.spacing(1),
  },
}));

const NavItems = () => {
  const classes = useStyles();
  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts } = useMsal();

  const loginScopes = {
    scopes: ['https://ifiduk.onmicrosoft.com/c1020dea-88d6-4406-9551-c091e83f0e47/Data.Read'],
  };

  if (accounts.length > 0) {
    console.log(accounts);
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
        <Link href="/admin">
          <Button className={classes.button} variant="outlined">
            Admin Console
          </Button>
        </Link>
        {isAuthenticated && (
          <Button className={classes.button} variant="outlined" onClick={() => instance.logout()}>
            Sign out
          </Button>
        )}
        {!isAuthenticated && (
          <Button className={classes.button} variant="outlined" onClick={() => instance.loginRedirect(loginScopes)}>
            Sign in
          </Button>
        )}
      </div>
    </>
  );
};

export default NavItems;
