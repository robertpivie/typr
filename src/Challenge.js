import React, { useState, useEffect, useRef } from "react";
import { string, func } from "prop-types";

import { makeStyles } from '@material-ui/core/styles';

const initialLeft = 448;
const timeout = 50;

const Challenge = ({ target, fail }) => {
    const [left, setLeft] = useState(initialLeft);
    const stop = useRef(false);

    const classes = makeStyles({
        challenge: {
            position: 'absolute',
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '50px',
            left: `${left}px`,
        },
    })();


    if (!left) {
        fail();
    } else {
        setTimeout(() => { !stop.current && setLeft(left - 1); }, timeout)
    }

    useEffect(() => {
        return () => {
            stop.current = true;
        };
    }, [stop])

    return (
        <span className={classes.challenge}>{target}</span>
    );
}

export default Challenge;

Challenge.propTypes = {
    target: string,
    fail: func,
}
