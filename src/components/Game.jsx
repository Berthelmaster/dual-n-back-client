import { colors, Divider, Grid } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react'
import emojipizza from '../assets/emojipizza.png'
import { Button } from '@material-ui/core';
import { Block, BlockOutlined, BlockSharp } from '@material-ui/icons';

const useStyles = makeStyles({
    root: {
        width: '50%',
        margin: "auto",
        marginTop: 0
    },
    customBox: {
        flex: 0.33,
        height: "8vw",
        padding: 5
    },
    customInnerBox: {
        background: "#eee",
        height: "100%",
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${emojipizza})`,
        backgroundPosition: "center",
        backgroundSize: 'contain'
    },
    smileyPizza: {
    },
    buttonScore: {
        width: '50%',
        margin: "auto",
        marginTop: 0,
        textAlign: "center"
    }
  });

export default function Game() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h3 className={classes.buttonScore}>A Dual-N-Back Game</h3>
            <Grid container
            direction="row"
            justify="center"
            alignItems="center">
                <div className={classes.customBox}>
                    <div className={classes.customInnerBox} id="1">1</div>
                </div>
                <div className={classes.customBox}>
                    <div className={classes.customInnerBox} id="2">2</div>
                </div>
                <div className={classes.customBox}>
                    <div className={classes.customInnerBox} id="3">3</div>
                </div>
            </Grid>
            <Grid container
            direction="row"
            justify="center"
            alignItems="center">
                <div className={classes.customBox}>
                    <div className={classes.customInnerBox} id="4">4</div>
                </div>
                <div className={classes.customBox}>
                    <div className={classes.customInnerBox} id="5">5</div>
                </div>
                <div className={classes.customBox}>
                    <div className={classes.customInnerBox} id="6">6</div>
                </div>
            </Grid>
            <Grid container
            direction="row"
            justify="center"
            alignItems="center">
                <div className={classes.customBox}>
                    <div className={classes.customInnerBox} id="7">7</div>
                </div>
                <div className={classes.customBox}>
                    <div className={classes.customInnerBox} id="8">8</div>
                </div>
                <div className={classes.customBox}>
                    <div className={classes.customInnerBox} id="9">9</div>
                </div>
            </Grid>
            <Grid container
            direction="row"
            justify="center"
            alignItems="center">
            <h4 className={classes.buttonScore}>You Score <b id="playerscore">0</b> points</h4>
            <h4 className={classes.buttonScore}>Current highscore <b id="highscore">0</b> points</h4>
            </Grid>
            <div>
                <Button variant="contained" color="primary" href="#contained-buttons">Play</Button>
                &nbsp;&nbsp;&nbsp;
                <Button variant="contained" color="primary" href="#contained-buttons">Stop</Button>
            </div>
        </div>
    )
}
