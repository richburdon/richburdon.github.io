//
// (c) 2021 Alien Labs.
//

import clsx from 'clsx';
import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/styles';
import { colors } from '@material-ui/core';

import Waves from './Waves';

const useStyles = makeStyles({
  '@global': {
    body: {
      margin: 0,
      overflow: 'hidden',
      fontFamily: 'Montserrat, sans-serif',
      backgroundColor: '#000',
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
    _justifyContent: 'center'
  },
  center: {
    display: 'flex',
    justifyContent: 'center'
  },
  logoType: {
    fontSize: 80,
    '& span': {
      color: colors.grey[400]
    }
  },
  waves: {
    display: 'flex',
    position: 'absolute',
    bottom: 0,
    top: 160,
    left: 0,
    right: 0,
  }
});

const Root = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={clsx(classes.center, classes.logoType)}>
          <span>rich</span>burdon.com
        </div>
      </div>
      <div className={clsx(classes.waves)}>
        <Waves />
      </div>
    </div>
  );
}

ReactDOM.render(<Root/>, document.getElementById('root'));
