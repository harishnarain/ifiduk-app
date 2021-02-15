import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useMsal, MsalAuthenticationTemplate } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';

import authScopes from '../../shared/auth/authScopes';
import Aux from '../../hoc/Auxilary/Auxilary';
import Spinner from '../../components/UI/Spinner';
import { createProduct } from '../../axios';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  multiLine: {
    width: '50vw',
    margin: theme.spacing(2),
  },
}));

function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

const AddProduct = () => {
  const classes = useStyles();
  const { instance, accounts } = useMsal();
  const loginScopes = { ...authScopes };
  const [product, setProduct] = useState({
    name: '',
    description: '',
    frontend: {},
    backend: {},
  });

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

  const onSubmitHandler = (event) => {
    event.preventDefault();

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
          createProduct(product, res.accessToken);
        })
        .catch(() => useMsal.acquireTokenRedirect(request));
    }
  };

  const inputChangeHandler = (type, event) => {
    const newProduct = {
      ...product,
      frontend: { ...product.frontend },
      backend: { ...product.backend },
    };
    newProduct[type] = event.target.value;
    setProduct(newProduct);
  };

  const mlInputChangeHandler = (type, event) => {
    const newProduct = {
      ...product,
      frontend: { ...product.frontend },
      backend: { ...product.backend },
    };
    if (IsJsonString(event.target.value)) {
      newProduct[type] = JSON.parse(event.target.value);
      setProduct(newProduct);
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
    <div className={classes.root}>
      <Typography variant="h6" gutterBottom className={classes.root}>
        Add Product
      </Typography>
      <form noValidate autoComplete="off" onSubmit={(event) => onSubmitHandler(event)}>
        <div className={classes.root}>
          <TextField required label="Enter product name" onChange={(event) => inputChangeHandler('name', event)} />
        </div>
        <div className={classes.root}>
          <TextField
            required
            label="Enter description"
            onChange={(event) => inputChangeHandler('description', event)}
          />
        </div>
        <div className={classes.root}>
          <TextField
            label="Front End Configuration"
            required
            multiline
            rows={10}
            variant="outlined"
            className={classes.multiLine}
            onChange={(event) => mlInputChangeHandler('frontend', event)}
          />
        </div>
        <div className={classes.root}>
          <TextField
            label="Back End Configuration"
            required
            multiline
            rows={10}
            variant="outlined"
            className={classes.multiLine}
            onChange={(event) => mlInputChangeHandler('backend', event)}
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          Add Product
        </Button>
      </form>
    </div>
      </MsalAuthenticationTemplate>
    </Aux>
  );
};

export default AddProduct;
