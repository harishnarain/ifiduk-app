import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  list: {
    backgroundColor: theme.palette.background.paper,
  },
}));

// eslint-disable-next-line
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function DeleteSubscription({ subs, open, onCancel, onDelete }) {
  const classes = useStyles();
  let subscriptionEls = null;

  if (subs.length !== 0) {
    subscriptionEls = subs.map((sub) => (
      <ListItem key={sub._id}>
        <ListItemText primary={<Typography variant="body2">{sub.name}</Typography>} />
      </ListItem>
    ));
  }

  return (
    <div className={classes.root}>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        fullWidth>
        <DialogTitle id="alert-dialog-slide-title">Confirm deletion?</DialogTitle>
        <DialogContent>
          <Grid item xs="auto" md="auto">
            <div className={classes.list}>
              <List>{subscriptionEls}</List>
            </div>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="primary">
            No
          </Button>
          <Button onClick={onDelete} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
