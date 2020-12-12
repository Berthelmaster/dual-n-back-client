import React, {Component } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { render } from "@testing-library/react";
import { withStyles } from '@material-ui/core/styles';
import { helpers } from "../helpers";

const styles = theme => ({
    center: {
        margin: "auto",
        textAlign: "center",
        width: "30%",
    },
    loginBox: {
        border: "3px solid blue",
        padding: "10px",
        marginTop: "10px",
        borderRadius: "25px",
        background: "#eb8c34",
    },
    space: {

    }
});

class Login extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goToRegister = this.goToRegister.bind(this);
    };

    handleSubmit(event) {
        event.preventDefault();
        const localSite = "https://gr14-dualnback-back.herokuapp.com/login";
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
            .then(response => response.json())
            .then((response) => {
                helpers.PushToken(response.token)
                helpers.PushUsername(response.username)
                this.props.history.push('/')
            })
            .catch(err => {
                console.log(err)
            });
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value});
    }

    goToRegister(event){
        event.preventDefault();
        this.props.history.push('/register')
    }

    render() {
        const {classes} = this.props;
        return (  
            <div className={[classes.loginBox, classes.center].join(' ')}>  
                <h1>Login</h1>              
                <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                    <TextField label="Username" name="username" variant="outlined" onChange={this.handleChange}/>
                    <br/>
                    <br/>
                    <TextField type="password" label="Password" name="password" variant="outlined" onChange={this.handleChange}/>
                    <br/>
                    <br/>
                    <Button variant="contained" color="primary" type="submit">
                        Login
                    </Button>
                </form>
                <p>Don't have an account?</p>
                <Button variant="contained" color="primary" onClick={this.goToRegister}>
                    Register
                </Button>
            </div>
        );
    }
}
export default withStyles(styles)(Login)