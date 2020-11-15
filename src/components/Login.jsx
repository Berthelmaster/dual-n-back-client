import React, {Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { render } from "@testing-library/react";


export default class Login extends Component {
    
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
        return (  
            <div className="Login">
                <form noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Username" variant="outlined" />
                    <br/>
                    <TextField id="outlined-basic" label="Password" variant="outlined" onChange={this.handleChange}/>
                    <br/>
                    <Button variant="contained" color="primary">
                        Login
                    </Button>
                </form>
            </div>
        );
    }
}