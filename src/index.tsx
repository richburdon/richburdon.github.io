//
// (c) 2021 Alien Labs.
//

import clsx from 'clsx';
import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/styles';
import { colors } from '@material-ui/core';

const useStyles = makeStyles({
  '@global': {
    body: {
      margin: 0,
      overflow: 'hidden',
      fontFamily: 'Montserrat, sans-serif',
      color: colors.grey[800]
    }
  },
  root: {
    display: 'flex',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center'
  },
  center: {
    display: 'flex',
    justifyContent: 'center'
  },
  logoType: {
    fontSize: 80
  }
});

const Root = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={clsx(classes.center, classes.logoType)}>RB</div>
      </div>
    </div>
  );
}

ReactDOM.render(<Root/>, document.getElementById('root'));
