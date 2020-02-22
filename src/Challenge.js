import React, { useState, useEffect, useRef } from "react";
import { bool, func, number, string } from "prop-types";

import { makeStyles } from '@material-ui/core/styles';

const initialLeft = 448;

const Challenge = ({ target, fail, reset, speed }) => {
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
        stop.current = true;
        setTimeout(fail, speed);
    } else {
        setTimeout(() => { !stop.current && setLeft(left - 1); }, speed)
    }

    if (reset) {
        setLeft(initialLeft);
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
    reset: bool,
    speed: number,
}
