import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Jumbotron from '../../components/Jumbotron/Jumbotron';
import AppCatalog from '../AppCatalog/AppCatalog';

const useStyles = makeStyles((theme) => ({
  jumbotron: {
    textAlign: 'center',
  },
}));

const Home = () => {
  const classes = useStyles();

  const title = 'Welcome to IFIDUK Apps';
  const subtitle =
    'Does hosting your own app scare you? Search the IFIDUK App Market and deploy your favorite app. Leave the hosting to us.';

  return (
    <div>
      <Jumbotron className={classes.jumbotron} title={title} subtitle={subtitle} />
      <AppCatalog />
    </div>
  );
};

export default Home;
