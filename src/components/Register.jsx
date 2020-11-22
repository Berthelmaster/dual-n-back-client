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
    };

    handleSubmit(event) {
        console.log(this.state.password);
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value});
        console.log("Print: " + event.target.value);
    }

    render() {
        const {classes} = this.props;
        return (  
            <div className={[classes.registerBox, classes.center].join(' ')}>  
                <h1>Register</h1>  
                <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                    <TextField id="outlined-basic" label="Username" name="username" variant="outlined" onChange={this.handleChange}/>
                    <br/>
                    <br/>
                    <TextField id="outlined-basic" label="Password" name="password" variant="outlined" onChange={this.handleChange}/>
                    <br/>
                    <br/>
                    <Button variant="contained" color="primary" type="submit">
                        Register
                    </Button>
                </form>
            </div>
        );
    }
}

export default withStyles(styles)(Register)