import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useMsal, MsalAuthenticationTemplate } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';

import { createSubscription } from '../../axios/index';
import authScopes from '../../shared/auth/authScopes';
import Spinner from '../../components/UI/Spinner';
import Aux from '../../hoc/Auxilary/Auxilary';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: '35ch',
  },
  formGrid: {
    minHeight: '100vh',
  },
}));

const CreateSubscription = ({ history }) => {
  const classes = useStyles();
  const { instance, accounts } = useMsal();
  const { productId } = useParams();
  const [tenantName, setTenantName] = useState('');
  const loginScopes = { ...authScopes };
  const [loading, setLoading] = useState(false);

  if (accounts.length > 0) {
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

  const tenantNameInputHandler = (value) => {
    setTenantName(value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    const requestBody = {
      productId,
      name: tenantName,
    };

    if (accounts.length > 0) {
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
          createSubscription(requestBody, res.accessToken);
        })
        .then(() => {
          history.push('/admin/subscriptions');
          setLoading(false);
        })
        .catch(() => useMsal.acquireTokenRedirect(request));
    }
  };

  return (
    <Aux>
      {/* prettier-ignore */}
      <MsalAuthenticationTemplate
        interactionType={InteractionType.Redirect}
        loadingComponent={Spinner}
        authenticationRequest={loginScopes}
      >
      {loading ? <Spinner /> : (
      <form className={classes.root} autoComplete="off" onSubmit={(event) => onSubmitHandler(event)}>
        <Container>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            className={classes.formGrid}>
            <Grid item xs={3}>
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <Input
                  endAdornment={<InputAdornment position="end">.onifiduk.com</InputAdornment>}
                  onChange={(event) => tenantNameInputHandler(event.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <Button variant="contained" color="primary" type="submit">
                Deploy
              </Button>
            </Grid>
          </Grid>
        </Container>
      </form>
    )}
      </MsalAuthenticationTemplate>
    </Aux>
  );
};

export default CreateSubscription;
