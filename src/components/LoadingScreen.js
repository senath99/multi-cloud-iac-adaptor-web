import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, alpha } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default
  },
  box: {
    position: 'absolute',
    borderRadius: '25%'
  },
  inner: {
    width: 100,
    height: 100,
    border: `solid 3px ${alpha(theme.palette.primary.dark, 0.8)}`
  },
  outside: {
    width: 120,
    height: 120,
    border: `solid 8px ${alpha(theme.palette.primary.dark, 0.8)}`
  }
}));

// ----------------------------------------------------------------------

LoadingScreen.propTypes = {
  className: PropTypes.string
};

function LoadingScreen({ className, ...other }) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...other}>
      <CircularProgress />
    </div>
  );
}

export default LoadingScreen;
