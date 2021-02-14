import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';

import Aux from '../../../hoc/Auxilary/Auxilary';
import b2cPolicies from '../../../shared/auth/b2cPolicies';

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
    color: '#e9ecef',
    backgroundColor: '#0077b6',
    '&:hover': {
      backgroundColor: '#48cae4',
      color: '#495057',
    },
  },
  accountCircle: {
    color: '#e9ecef',
  },
  menuContainer: {
    textAlign: 'center',
  },
  divider: {
    margin: theme.spacing(1),
  },
}));

const NavItems = () => {
  const classes = useStyles();
  const isAuthenticated = useIsAuthenticated();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { instance, accounts } = useMsal();
  const loginScopes = {
    scopes: ['https://ifiduk.onmicrosoft.com/c1020dea-88d6-4406-9551-c091e83f0e47/Data.Read'],
  };
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
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
          console.log(`[name]: ${res.account.idTokenClaims.given_name} ${res.account.idTokenClaims.family_name}`);
          console.log(`[email]: ${res.account.idTokenClaims.emails[0]}`);
          setUserProfile({
            ...userProfile,
            name: `${res.account.idTokenClaims.given_name} ${res.account.idTokenClaims.family_name}`,
            email: res.account.idTokenClaims.emails[0],
          });
        })
        .catch(() => useMsal.acquireTokenRedirect(request));
    }
  }, [anchorEl]);

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

  const menuHandler = ({ currentTarget }) => {
    setAnchorEl(currentTarget);
  };

  const closeHandler = () => {
    setAnchorEl(null);
  };

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
          <Aux>
            <IconButton onClick={menuHandler}>
              <AccountCircle fontSize="large" className={classes.accountCircle} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={closeHandler}>
              {/* prettier-ignore */}
              <Container className={classes.menuContainer}>
                {userProfile.name}
              </Container>
              <Container>{userProfile.email}</Container>
              <Divider className={classes.divider} />
              {/* prettier-ignore */}
              <MenuItem
                onClick={() => instance.loginRedirect(b2cPolicies.authorities.editProfile)}
              >
                Profile
              </MenuItem>
              {/* prettier-ignore */}
              <MenuItem
                onClick={() => instance.loginRedirect(b2cPolicies.authorities.forgotPassword)}
              >
                Change Password
              </MenuItem>
              <MenuItem onClick={() => instance.logout()}>Signout</MenuItem>
            </Menu>
          </Aux>
        )}
        {!isAuthenticated && (
          <Button className={classes.button} variant="contained" onClick={() => instance.loginRedirect(loginScopes)}>
            Sign In/Sign Up
          </Button>
        )}
        {isAuthenticated && (
          <Link href="/admin">
            <Button className={classes.button} variant="outlined">
              Admin Console
            </Button>
          </Link>
        )}
      </div>
    </>
  );
};

export default NavItems;
