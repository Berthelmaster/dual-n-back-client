import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        textAlign: "center",
        margin: 0,
        marginTop: 0,
        height: 1000,
        width: "100%",
        flex: 1
    },
    iframecss: {
        height: "100%",
        width: "100%"
    }
  });

export default function Rules() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <iframe src="https://en.wikipedia.org/wiki/N-back" className={classes.iframecss}/>
        </div>
    )
}
