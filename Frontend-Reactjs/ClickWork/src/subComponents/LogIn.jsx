import React, { Component } from "react"
import axios from "axios";
import { Redirect } from 'react-router-dom';
import Session from 'react-session-api'

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            LogInValid: false,
            user_key: null
        }; 
    }

    handleSubmit(event) {
        event.preventDefault();
        const { username, password } = event.target.elements;

        fetch(process.env.REACT_APP_API + 'login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': event.target.username.value,
                'password': event.target.password.value
            })
        })
            .then(res => res.json())
            .then((result) => {
                if (result[0]) {
                    alert(result[1]);
                    this.setState({ LogInValid: true })
                }
                else {
                    alert(result[1]);
                }
            },
                (error) => {
                    alert('Failed');
                })

    }

    render() {
        const { LogInValid } = this.state;

        if (LogInValid) {
            return <Redirect push to="/ViewMyProfile" /> 
        }

        return (
            
            <div class="col-lg-4 mt-4 border mb-4 mx-auto rounded pt-4 log-in">
                <div class="text-center col log-in-div">
                    <img
                        src="https://media.istockphoto.com/vectors/woman-with-laptop-sitting-in-nature-and-leaves-concept-illustration-vector-id1139913278?k=6&m=1139913278&s=612x612&w=0&h=vDks140zgZAaCDrxSW0C4IabyHQI7aM8uw0MfM7gMrs=" alt="iphone-mockup"
                        id="log-in-img" style={{ height: "150px" }} />
                    <div class="display-8" ><h2>Log In</h2></div>
                    <hr />
                </div>
                <h3 hidden class="alert alert-light border mt-4 mb-4 rounded">Login Here</h3>
                <form class="log-in-form" onSubmit={this.handleSubmit}>

                    <div class="form-group" controlId="username">
                        <label for="">Username</label>
                        <input required type="username" name="username"
                            class=" form-control-sm form-control" placeholder="username"
                        />
                    </div>


                    <div class="form-group" controlId="password">
                        <label for="">Password</label>
                        <input type="password"
                            name="password"
                            class="form-control form-control-sm" placeholder="********"
                        />
                    </div>
                    <hr />
                    <div class="form-group">
                        <input class="btn btn-sm btn-dark btn-info col-lg-4" type="submit" value="Login" id="log-in-btn-div" />
                    </div>
                </form>
            </div>
        
        );
    }

}

export default LogIn;