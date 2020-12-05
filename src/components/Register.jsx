import React, {Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { render } from "@testing-library/react";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    center: {
        margin: "auto",
        textAlign: "center",
        width: "30%",
    },
    registerBox: {
        border: "3px solid blue",
        padding: "10px",
        marginTop: "10px",
        borderRadius: "25px",
        background: "#eb8c34",
    },
    space: {

    }
});

class Register extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goToLogin = this.goToLogin.bind(this);
    };

    handleSubmit(event) {
        event.preventDefault();
        const localSite = "http://localhost:3000/register"
        fetch(localSite, {
            "method": "POST",
            "headers" : {
                'Content-Type': 'application/json'
            },
            "body": JSON.stringify({
                userName: this.state.username,
                password: this.state.password
            }),
            //"mode": "no-cors",
            })
            .then(() => {
                this.props.history.push('/login')
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value});
    }

    goToLogin(event){
        event.preventDefault();
        this.props.history.push('/login')

    }

    render() {
        const {classes} = this.props;
        return (  
            <div className={[classes.registerBox, classes.center].join(' ')}>  
                <h1>Register</h1>  
                <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                    <TextField label="Username" name="username" variant="outlined" onChange={this.handleChange}/>
                    <br/>
                    <br/>
                    <TextField type="password" label="Password" name="password" variant="outlined" onChange={this.handleChange}/>
                    <br/>
                    <br/>
                    <Button variant="contained" color="primary" type="submit">
                        Register
                    </Button>
                </form>
                <p>Already have an account?</p>
                <Button variant="contained" color="primary" onClick={this.goToLogin}>
                    Login
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(Register)

/* 

            "headers": {
                "x-rapidapi-host": "fairestdb.p.rapidapi.com",
                "x-rapidapi-key": API_KEY,
                "content-type": "application/json",
                "accept": "application/json"
            },
*/