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
            email: '',
            password: '',
        };

        this.handleChange = this.handleChange.bind(this);
    };

    handleSubmit(event) {
        event.preventDefault();
    }

    handleChange(event) {
        console.log("Print: " + event.target.value);
        this.setState({value: event.target.value});
    }

    render() {
        const {classes} = this.props;
        return (  
            <div className={[classes.loginBox, classes.center].join(' ')}>
                <h1>Login</h1>
                <form noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Username" variant="outlined" />
                    <br/>
                    <br/>
                    <TextField id="outlined-basic" label="Password" variant="outlined" onChange={this.handleChange}/>
                    <br/>
                    <br/>
                    <Button variant="contained" color="primary">
                        Login
                    </Button>
                </form>
            </div>
        );
    }
}


export default withStyles(styles)(Login)