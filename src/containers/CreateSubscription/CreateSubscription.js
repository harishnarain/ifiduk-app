import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useMsal, MsalAuthenticationTemplate } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';

import { createSubscription, fetchSubscriptions } from '../../axios/index';
import authScopes from '../../shared/auth/authScopes';
import Spinner from '../../components/UI/Spinner';
import Aux from '../../hoc/Auxilary/Auxilary';
import { checkValidity } from '../../shared/utility';
import useDebounce from '../../shared/useDebounce';

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
  container: {
    // width: '100%',
    padding: theme.spacing(4),
  },
  box: {
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    width: '85vw',
    padding: theme.spacing(3),
  },
  formGrid: {
    // minHeight: '100vh',
  },
}));

const useQuery = () => new URLSearchParams(useLocation().search);

const CreateSubscription = ({ history }) => {
  const classes = useStyles();
  const { instance, accounts } = useMsal();
  const { productId } = useParams();
  const query = useQuery();
  const [tenantName, setTenantName] = useState('');
  const loginScopes = { ...authScopes };
  const [loading, setLoading] = useState(false);
  const [nameStatus, setNameStatus] = useState(false);
  const [nameAvailable, setNameAvailable] = useState(false);
  const [nameQuery, setNameQuery] = useState('');

  const debouncedNameQuery = useDebounce(nameQuery, 500);

  useEffect(() => {
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
          fetchSubscriptions(debouncedNameQuery, res.accessToken).then((data) => {
            // eslint-disable-next-line max-len
            const subscriptionExists = data.some((subscription) => subscription.name === debouncedNameQuery);
            setNameAvailable(!subscriptionExists);
          });
        })
        .catch(() => useMsal.acquireTokenRedirect(request));
    }
  }, [debouncedNameQuery]);

  const tenantNameRules = {
    isTenantName: true,
  };

  const title = query.get('name');

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
      .then((res) => res)
      .catch(() => useMsal.acquireTokenRedirect(request));
  }

  const checkTenantNameAvailability = (value) => {
    setNameQuery(value);
  };

  const tenantNameInputHandler = (value) => {
    setTenantName(value);
    setNameStatus(checkValidity(tenantName, tenantNameRules));
    checkTenantNameAvailability(value);
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
          createSubscription(requestBody, res.accessToken);
        })
        .then(() => {
          history.push(`/admin/subscriptioncomplete?title=${title}`);
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
        <Container className={classes.container}>
          <Box className={classes.box}>
            <Paper className={classes.paper}>

          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            className={classes.formGrid}>
              <Typography variant="h6" gutterBottom>
                {`Choose a domain name for ${title}`}
              </Typography>
            <Grid item xs={3}>
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <Input
                  endAdornment={<InputAdornment position="end">.onifiduk.com</InputAdornment>}
                  onChange={(event) => tenantNameInputHandler(event.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <Button variant="contained" color="primary" type="submit" disabled={!nameStatus || !nameAvailable}>
                Deploy
              </Button>
            </Grid>
          </Grid>
            </Paper>
          </Box>
        </Container>
      </form>
    )}
      </MsalAuthenticationTemplate>
    </Aux>
  );
};

export default CreateSubscription;
