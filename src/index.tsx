//
// (c) 2021 Alien Labs.
//

import clsx from 'clsx';
import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/styles';
import { colors } from '@material-ui/core';

import Console from './components/Console';
import Waves from './components/Waves';

// TODO(burdon): External fonts https://material-ui.com/customization/typography/
const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      margin: 0,
      overflow: 'hidden',
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 100,
      backgroundColor: '#000000',
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
    flex: 1
  },
  center: {
    display: 'flex',
    justifyContent: 'center'
  },
  logoType: {
    fontSize: 20,
    '& span': {
      color: colors.grey[400]
    }
  },
  fadeIn: {
    opacity: 1,
    animation: `$fadeIn 3000ms ease`,
  },
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0
    },
    '50%': {
      opacity: 0
    },
    '100%': {
      opacity: 1
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
}));

const Root = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Console />
        {/*
        <div className={clsx(classes.center, classes.logoType, classes.fadeIn)}>
          <span>rich</span>burdon.com
        </div>
        */}
      </div>
      <div className={classes.waves}>
        <Waves />
      </div>
    </div>
  );
}

ReactDOM.render(<Root/>, document.getElementById('root'));
