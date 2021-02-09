import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  title: {
    textAlign: 'center',
  },
  ifTitleText: {
    color: '#70d6ff',
  },
  iTitleText: {
    color: '#ff70a6',
  },
  dTitleText: {
    color: '#ff9770',
  },
  uTitleText: {
    color: '#ffd670',
  },
  kTitleText: {
    color: '#e9ff70',
  },
}));

const LogoLink = ({ link }) => {
  const classes = useStyles();

  return (
    <Typography className={classes.title}>
      <Link href={link} variant="h5">
        <span className={classes.ifTitleText}>IF</span>
        <span className={classes.iTitleText}>I</span>
        <span className={classes.dTitleText}>D</span>
        <span className={classes.uTitleText}>U</span>
        <span className={classes.kTitleText}>K</span>
      </Link>
    </Typography>
  );
};

export default LogoLink;
