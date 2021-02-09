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

import { createSubscription } from '../../axios/index';

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

const CreateSubscription = () => {
  const classes = useStyles();
  const { productId } = useParams();
  const [tenantName, setTenantName] = useState('');

  const tenantNameInputHandler = (value) => {
    setTenantName(value);
  };

  const onSubmitHandler = () => {
    const request = {
      productId,
      name: tenantName,
    };

    createSubscription(request);
  };

  return (
    <form className={classes.root} autoComplete="off" onSubmit={() => onSubmitHandler()}>
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
  );
};

export default CreateSubscription;
