import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import unicorn from './unicorn.gif'

import Challenge from './Challenge';

const App = () => {
  const input = useRef("");
  const [target, setTarget] = useState("a");

  const classes = makeStyles({
    board: {
      height: '100%',
      width: '100%',
      overflow: 'hidden',
      position: 'relative',
    },
  })();

  const update = key => {
    input.current = key;
    console.log(input.current)
  }

  const win = () => {
    setTarget("");
    console.log('win');
  };

  const fail = () => {
    console.log('fail');
  };

  const collectInput = useCallback(event => {
    update(event.key);
    if (input.current === target) {
      win();
    }
  }, [input, target]);

  useEffect(() => {
    window.addEventListener('keydown', collectInput);
    return () => {
      window.removeEventListener('keydown', collectInput);
    };
  }, [collectInput]);

  return (
    <Grid container justify="center" spacing={3}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={1}>
          <Grid item></Grid>
          <Grid item>
            <Paper className={classes.board}>
              <img src={unicorn} alt="unicorn" />
              {target && <Challenge target={target} win={win} fail={fail}></Challenge>}
            </Paper>
          </Grid>
          <Grid item></Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <TextField fullWidth value={input.current} id="filled-basic" label="Start Typing!" variant="filled" />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default App;
