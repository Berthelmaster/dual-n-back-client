import { colors, Divider, Grid } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import React, {Component } from "react";
import emojipizza from '../assets/emojipizza.png'
import { Button } from '@material-ui/core';
import { Block, BlockOutlined, BlockSharp } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { helpers } from "../helpers";

const useStyles = theme => ({
    
    root: {
        width: '50%',
        ['@media (max-width: 780px)']: {
            width: '95%'
        },
        margin: "auto",
        marginTop: 0,
    },
    gamebuttons: {
        margin: "auto",
        marginTop: 0,
        textAlign: "center"
    },
    wbuttons: {
        width: "200px",
        height: "60px"
    },
    customBox: {
        flex: 0.33,
        height: "8vw",
        ['@media (max-width: 780px)']: {
            height: "15vw",
        },
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
            isRunning: false,
            gameList: [],
            playerScore: 0,
            highScore: 0,
            creditedPlayer: 'unknown',
            ws: null
        }

        this.stop = this.stop.bind(this)
        this.play = this.play.bind(this)
        this.positionPressed = this.positionPressed.bind(this)
        this.soundPressed = this.soundPressed.bind(this)
        this.bothPressed = this.bothPressed.bind(this)
    };

    componentDidMount() {
        this.connect();
    }

    timeout = 250; // Initial timeout duration as a class variable

    /**
     * @function connect
     * This function establishes the connect with the websocket and also ensures constant reconnection if connection closes
     */

     /*
     This code is from: https://dev.to/finallynero/using-websockets-in-react-4fkp
     */
    connect = () => {
        var ws = new WebSocket("ws://127.0.0.1:3000/");
        let that = this; // cache the this
        var connectInterval;

        // websocket onopen event listener
        ws.onopen = () => {
            console.log("connected websocket main component");

            this.setState({ ws: ws });

            that.timeout = 250; // reset timer to 250 on open of websocket connection 
            clearTimeout(connectInterval); // clear Interval on on open of websocket connection
        };

        ws.onmessage = evt => {
            // listen to data sent from the websocket server
            console.log(evt.data)
            var obj = JSON.parse(evt.data);
            if(obj == null){
                console.log('is null')
                return;
            }
            console.log("pbj " + obj)
            this.setState({
                creditedPlayer: obj.name,
                highScore: obj.score
            })
        }

        // websocket onclose event listener
        ws.onclose = e => {
            console.log(
                `Socket is closed. Reconnect will be attempted in ${Math.min(
                    10000 / 1000,
                    (that.timeout + that.timeout) / 1000
                )} second.`,
                e.reason
            );

            that.timeout = that.timeout + that.timeout; //increment retry interval
            connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
        };

        // websocket onerror event listener
        ws.onerror = err => {
            console.error(
                "Socket encountered error: ",
                err.message,
                "Closing socket"
            );

            ws.close();
        };
    };

    /**
     * utilited by the @function connect to check if the connection is close, if so attempts to reconnect
     */
    check = () => {
        const { ws } = this.state;
        if (!ws || ws.readyState == WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
    };


    generateRandomNumber(min, max) {
        var minNumber = min;
        var maxNumber = max;

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

        this.clearGame();

        this.sendPlayerScore()
        // Send data to server

    }

    async sendPlayerScore() {
        var username = helpers.GetUsername()
        var token = helpers.GetToken()

        // Do not send if user is not logged in!
        if(username == null || token == null || this.state.ws == null){
           return;
        }

        //Get score
        var playerScore = {name: username, score: this.state.playerScore}


        var json = JSON.stringify(playerScore)
        this.state.ws.send(json)
    }

    clearGame(){
        this.setState({playerScore: 0, gameList: [], isRunning: false})
    }

    async play(event) {
        event.preventDefault();

        if(this.state.isRunning){
            return;
        }

        this.clearGame();

        //Set state
        this.setState({isRunning: true})

        var random = 0;

        await this.CoolHideAllImages();

        do{
            random = this.generateRandomNumber(1, 9);
            //console.log(random)

            // Get element
            var element = document.getElementById(random)

            // Play Game here
            element.style.backgroundImage = `url(${emojipizza})`
            var sound = this.playSound();

            //Add to list
            var currentObject = {element: random, sound: sound}
            this.setState({gameList: [...this.state.gameList, currentObject]})
            
            await this.sleep(2000)

            element.style.backgroundImage = 'none'

        }while(this.state.isRunning === true)
     }

     createSoundResult(){
        var random = this.generateRandomNumber(1, 3);
        var sound = ''
        var catSound = 'cat';
        var dogSound = 'dog';
        var tigerSound = 'tiger'
        
        switch(random){
            case 1:
                sound = catSound;
                break;
            case 2:
                sound = dogSound;
                break;
            case 3:
                sound = tigerSound;
                break;
        }

        return sound;
     }

     playSound(){
        var sound = this.createSoundResult();
        let voice = new SpeechSynthesisUtterance(sound);
        speechSynthesis.speak(voice);

        return sound;
     }

     positionPressed(event){
        event.preventDefault();

        var lastPosition = this.state.gameList[this.state.gameList.length - 1];
        var comparePosition = this.state.gameList[this.state.gameList.length - 3];

        if(!this.state.isRunning){
            return;
        }

        if(lastPosition == undefined || comparePosition == undefined){
            this.setState({playerScore: this.state.playerScore - 10})
            return;
        }

        if(comparePosition.element == lastPosition.element){
            this.setState({playerScore: this.state.playerScore + 10})
        }else{
            this.setState({playerScore: this.state.playerScore - 10})
        }

     }

     soundPressed(event){
        event.preventDefault();

        var lastPosition = this.state.gameList[this.state.gameList.length - 1];
        var comparePosition = this.state.gameList[this.state.gameList.length - 3];

        if(!this.state.isRunning){
            return;
        }

        if(lastPosition == undefined || comparePosition == undefined){
            this.setState({playerScore: this.state.playerScore - 10})
            return;
        }

        if(comparePosition.sound == lastPosition.sound){
            this.setState({playerScore: this.state.playerScore + 10})
        }else{
            this.setState({playerScore: this.state.playerScore - 10})
        }

     }

     bothPressed(event){
        event.preventDefault();

        var lastPosition = this.state.gameList[this.state.gameList.length - 1];
        var comparePosition = this.state.gameList[this.state.gameList.length - 3];

        if(!this.state.isRunning){
            return;
        }

        if(lastPosition == undefined || comparePosition == undefined){
            this.setState({playerScore: this.state.playerScore - 20})
            return;
        }

        if(comparePosition.sound == lastPosition.sound && comparePosition.element == lastPosition.element){
            this.setState({playerScore: this.state.playerScore + 40})
        }else{
            this.setState({playerScore: this.state.playerScore - 20})
        }
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
            <h4 className={classes.buttonScore}>You Score <b id="playerscore">{this.state.playerScore}</b> points</h4>
            <h4 className={classes.buttonScore}>Current highscore <b id="highscore">{this.state.highScore}</b> points by {this.state.creditedPlayer}</h4>
            </Grid>
            <div>
                <Button variant="contained" color="primary" onClick={this.play}>Play</Button>
                &nbsp;&nbsp;&nbsp;
                <Button variant="contained" color="primary" onClick={this.stop}>Stop</Button>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div className={classes.gamebuttons}>
                <Button variant="contained" color="primary" className={classes.wbuttons} onClick={this.positionPressed}>Position</Button>
                &nbsp;&nbsp;&nbsp;
                <Button variant="contained" color="primary" className={classes.wbuttons} onClick={this.soundPressed}>Sound</Button>
                &nbsp;&nbsp;&nbsp;
                <Button variant="contained" color="primary" className={classes.wbuttons} onClick={this.bothPressed}>Both</Button>
                &nbsp;&nbsp;&nbsp;
            </div>
        </div>
    )
    }
 }

 export default withStyles(useStyles)(Game)

