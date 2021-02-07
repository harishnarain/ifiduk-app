import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(3),
  },
  search: {
    width: '100%',
  },
}));

const AppCatalog = () => {
  const classes = useStyles();

  return (
    <div>
      <Container className={classes.container}>
        <Typography variant="h6" gutterBottom>
          App Catalog
        </Typography>
      </Container>
      <Container className={classes.container}>
        <TextField label="Search for apps..." variant="outlined" className={classes.search} />
      </Container>
      <Container className={classes.container}>
        <h1>Placeholder</h1>
      </Container>
    </div>
  );
};

export default AppCatalog;
