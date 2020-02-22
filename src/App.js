import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert'

import unicorn from './unicorn.gif'

import Challenge from './Challenge';

const LVLS = [
  require('./LVL0.json'),
  require('./LVL1.json'),
];

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const App = () => {
  const input = useRef("");
  const [game, setGame] = useState(
    {
      level: LVLS[0],
      nextLVL: 0,
      target: "",
      nextTGT: 0,
      reset: false,
      open: true,
      message: LVLS[0].message,
      severity: "info",
    }
  );

  const classes = makeStyles({
    board: {
      height: '100%',
      width: '100%',
      overflow: 'hidden',
      position: 'relative',
    },
  })();

  let close = () => {
    setGame({
      ...game,
      level: LVLS[0],
      nextLVL: 0,
      target: LVLS[0].targets[0],
      nextTGT: 0,
      message: LVLS[0].message,
      severity: "info",
      open: false,
    });
  };

  const fail = () => {
    setGame({
      ...game,
      level: LVLS[0],
      nextLVL: 0,
      target: LVLS[0].targets[0],
      nextTGT: 0,
      severity: "error",
      message: "OH DRAT!",
      open: true,
      reset: true,
    });
  };

  const collectInput = useCallback(event => {
    const level = () => {
      const nextLVLIndex = game.nextLVL + 1;
      if (nextLVLIndex === LVLS.length) {
        return;//you have cleared the game!
      }

      const level = LVLS[nextLVLIndex];
      console.log(level.targets[0]);

      setGame({
        ...game,
        reset: true,
        nextTGT: 0,
        target: level.targets[0],
        nextLVL: nextLVLIndex,
        level: level,
      });
    };

    const match = () => {
      const nextTGTIndex = game.nextTGT + 1;
      if (nextTGTIndex === game.level.targets.length) {
        return level();
      }

      setGame({
        ...game,
        reset: true,
        nextTGT: nextTGTIndex,
        target: game.level.targets[nextTGTIndex],
      });
    };

    input.current = event.key;
    if (input.current === game.target) {
      match();
    }
  }, [input, game, setGame]);

  useEffect(() => {
    window.addEventListener('keydown', collectInput);
    return () => {
      window.removeEventListener('keydown', collectInput);
    };
  }, [collectInput]);

  if (game.reset) {
    setTimeout(() => setGame({ ...game, reset: false }));
  }

  return (
    <Grid container justify="center" spacing={1}>
      <Grid item></Grid>
      <Grid item>
        {!(LVLS.length === game.nextLVL && game.level.targets.length === game.nextTGT) && (
          <Paper className={classes.board}>
            <img src={unicorn} alt="unicorn" />
            {!game.reset && <Challenge target={game.target} fail={fail} reset={game.reset} speed={game.level.speed}></Challenge>}
          </Paper>
        )}
        <Snackbar open={game.open} autoHideDuration={1000} onClose={close}>
          <Alert onClose={close} severity={game.severity}>{game.message}</Alert>
        </Snackbar>
      </Grid>
      <Grid item></Grid>
    </Grid>
  );
}

export default App;
