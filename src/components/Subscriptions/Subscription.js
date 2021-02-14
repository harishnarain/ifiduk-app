import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';

import Aux from '../../hoc/Auxilary/Auxilary';

const useStyles = makeStyles(() => ({
  icon: {
    animationIterationCount: 'infinite',
    animationName: '$blinker',
    animationDuration: '2.5s',
    animationTimingFunction: 'ease-in-out',
  },
  '@keyframes blinker': {
    from: { opacity: 1 },
    to: { opacity: 0 },
  },
}));

const Subscription = ({ labelId, name, status }) => {
  const classes = useStyles();
  const sanitizedStatus = status.toLowerCase();
  const progress = {
    pending: {
      graphic: <LocalCafeIcon />,
      text: 'Pending',
    },
    running: {
      graphic: <CloudDoneIcon />,
      text: 'Running',
    },
    deleting: {
      graphic: <DeleteSweepIcon />,
      text: 'Deleting',
    },
  };

  return (
    <Aux>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        {name}
      </TableCell>
      <TableCell align="center" padding="none">
        <div>{progress[sanitizedStatus].text}</div>
        <div className={classes.icon}>{progress[sanitizedStatus].graphic}</div>
      </TableCell>
    </Aux>
  );
};

export default Subscription;
