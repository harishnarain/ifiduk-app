import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {},
  container: {
    width: '100%',
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
}));

const Jumbotron = ({ title, subtitle }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Box className={classes.box}>
        <Paper className={classes.paper}>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            {subtitle}
          </Typography>
        </Paper>
      </Box>
    </div>
  );
};

export default Jumbotron;
