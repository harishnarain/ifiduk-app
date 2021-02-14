import React from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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

const SubscriptionComplete = ({ history }) => {
  const classes = useStyles();
  const query = useQuery();

  const title = query.get('title');

  const onFinishHandler = () => {
    history.push('/admin/subscriptions');
  };

  return (
    <Aux>
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
                {`Your subscription for ${title} is complete`}
              </Typography>
              <Grid item xs={3}>
                <Button variant="contained" color="primary" onClick={() => onFinishHandler()}>
                  Go To Subscriptions
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </Aux>
  );
};

export default SubscriptionComplete;
