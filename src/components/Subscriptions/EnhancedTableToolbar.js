import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { fade, lighten, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';
import Link from '@material-ui/core/Link';

import Aux from '../../hoc/Aux/Aux';

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
  action: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  actionIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

// eslint-disable-next-line
const EnhancedTableToolbar = ({ addClick, deleteClick, refreshClick, value, changed, numSelected }) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}>
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {/* eslint-disable-next-line */}
          {numSelected} selected
        </Typography>
      ) : (
        <Aux>
          <Tooltip title="Add">
            <Link href="/admin/appcatalog">
              <IconButton aria-label="add">
                <AddIcon />
              </IconButton>
            </Link>
          </Tooltip>
        </Aux>
      )}

      {numSelected > 0 ? (
        <Aux>
          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={deleteClick}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Aux>
      ) : (
        <Aux>
          <div className={classes.action}>
            <Tooltip title="Refresh">
              <IconButton aria-label="refresh" onClick={refreshClick}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </div>
          <div className={classes.action}>
            <div className={classes.actionIcon}>
              <SearchIcon />
            </div>
          </div>
          <InputBase
            placeholder="Search"
            value={value}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            onChange={changed}
          />
        </Aux>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default EnhancedTableToolbar;
