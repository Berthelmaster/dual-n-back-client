import { colors, Divider, Grid } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import React, {Component } from "react";
import emojipizza from '../assets/emojipizza.png'
import { Button } from '@material-ui/core';
import { Block, BlockOutlined, BlockSharp } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
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



 class Game extends Component {

    constructor(props){
        super(props);
        this.state = {
            isRunning: false
        }

        this.stop = this.stop.bind(this)
        this.play = this.play.bind(this)
    };


    generateRandomNumber() {
        var minNumber = 1;
        var maxNumber = 9;

        return Math.floor(Math.random() * maxNumber) + minNumber;
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async CoolHideAllImages() {
        for (var i = 1; i <= 9; i++) {
            
            await this.sleep(200)

            var element = document.getElementById(i)
            element.style.backgroundImage = 'none'
        }

        await this.sleep(500)

        for (var i = 1; i <= 9; i++) {
            var element = document.getElementById(i)
            element.style.backgroundImage = `url(${emojipizza})`
        }

        await this.sleep(500)

        for (var i = 1; i <= 9; i++) {
            var element = document.getElementById(i)
            element.style.backgroundImage = 'none'
        }

        await this.sleep(200)

        for (var i = 1; i <= 9; i++) {
            var element = document.getElementById(i)
            element.style.backgroundImage = `url(${emojipizza})`
        }

        await this.sleep(200)

        for (var i = 1; i <= 9; i++) {
            var element = document.getElementById(i)
            element.style.backgroundImage = 'none'
        }


    }

    async stop(event) {
        event.preventDefault();

        this.setState({isRunning: false})
    }

    async play(event) {
        event.preventDefault();

        //Set state
        this.setState({isRunning: true})

        var random = 0;

        await this.CoolHideAllImages();

        do{
            random = this.generateRandomNumber();
            //console.log(random)

            // Get element
            var element = document.getElementById(random)


            // Play Game here

            element.style.backgroundImage = `url(${emojipizza})`
            
            await this.sleep(2000)

            element.style.backgroundImage = 'none'

        }while(this.state.isRunning === true)
     }

    render(){
        const {classes} = this.props;

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
                <Button variant="contained" color="primary" onClick={this.play}>Play</Button>
                &nbsp;&nbsp;&nbsp;
                <Button variant="contained" color="primary" onClick={this.stop}>Stop</Button>
            </div>
        </div>
    )
    }
 }

 export default withStyles(useStyles)(Game)

