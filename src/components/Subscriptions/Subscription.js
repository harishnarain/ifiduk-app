import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import Link from '@material-ui/core/Link';

import Aux from '../../hoc/Auxilary/Auxilary';

const useStyles = makeStyles((theme) => ({
  icon: {
    animationIterationCount: 'infinite',
    animationName: '$blinker',
    animationDuration: '2.5s',
    animationTimingFunction: 'ease-in-out',
    paddingLeft: theme.spacing(1),
  },
  '@keyframes blinker': {
    from: { opacity: 1 },
    to: { opacity: 0 },
  },
  statusDiv: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
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

  const subLink = `https://${name}.onifiduk.com`;

  return (
    <Aux>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        {name}
      </TableCell>
      <TableCell align="left" padding="none">
        <Link href={subLink} target="_blank" rel="noopener">
          {subLink}
        </Link>
      </TableCell>
      <TableCell align="center" padding="none">
        <div className={classes.statusDiv}>
          <span>{progress[sanitizedStatus].text}</span>
          <span className={classes.icon}>{progress[sanitizedStatus].graphic}</span>
        </div>
      </TableCell>
    </Aux>
  );
};

export default Subscription;
