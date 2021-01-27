//
// (c) 2021 Alien Labs.
//

import faker from 'faker';
import React, { useEffect, useState } from 'react';
import ReactConsole from 'simple-react-console';
import superagent from 'superagent';

import { makeStyles } from '@material-ui/styles';

const lineHeight = 22;

const useStyles = makeStyles(theme => ({
  root: {
    '& div.container': {
      fontFamily: 'monospace',
      fontSize: 18,
      lineHeight: 1,
      height: lineHeight * 5,
      padding: 0
    }
  }
}));

const Console = () => {
  const classes = useStyles();
  const [output, setOutput] = useState('scanning richburdon.com');
  const [bodies, setBodies] = useState([]);

  // TODO(burdon): Get data from Google trends, etc.
  // https://www.npmjs.com/package/google-trends-api#examples
  // https://www.programmableweb.com/search/real%20time
  useEffect(() => {
    // https://api.le-systeme-solaire.net/en
    superagent.get('https://api.le-systeme-solaire.net/rest/bodies/').end((err: any, res: any) => {
      if (!err) {
        const data = JSON.parse(res.text);
        setBodies(data.bodies);
        // console.log(data.bodies);
      }
    })
  }, []);

  const handleComplete = () => {
    setTimeout(() => {
      if (!bodies.length) {
        setOutput('  ');
        return;
      }

      const body = faker.random.arrayElement(bodies);
      const { name } = body;

      const parts = [name];
      const property = faker.random.arrayElement(['density', 'gravity', 'eccentricity', 'inclination']);
      const value = body[property];
      if (value) {
        parts.push(`${property}: ${value}`);
      }

      // if (discoveryDate) { parts.push(`discovered on ${discoveryDate}`); }

      const text = parts.join(' ');
      setOutput(text);
    }, 500 * faker.random.number({ min: 1, max: 4 }));
  }

  // https://pixeledpie.com/simple-react-console/index.html
  return (
    <div className={classes.root}>
      <ReactConsole
        passive={true}
        scroll={false}
        delay={20}
        tag='>'
        consoleTag=' '
        setOutput={output}
        onComplete={handleComplete}
        backgroundColor='#000'
        textColor='#CCC'
      />
    </div>
  );
};

export default Console;
