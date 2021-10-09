import React, { Component } from 'react';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { Button, Form } from "react-bootstrap";
import { logout } from "./login/LoginActions";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

class JobCompleted extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSkip = this.handleSkip.bind(this);
        this.state = {
            details: ""
        };
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,

        });
    }

    onLogout = (e) => {
        e.preventDefault();
        this.props.logout();
      };

    handleSubmit(event) {
        event.preventDefault();
        let usertoken = localStorage.getItem("token");

        fetch(process.env.REACT_APP_API + 'freelancer/sentRequest', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + usertoken

            },
            body: JSON.stringify({
                'details': event.target.details.value,
                'path': window.location.pathname
            })
        })
            .then(res => res.json())
            .then((result) => {
                if (result == true) {
                    this.props.history.push("/dashboard/completed");
                    toast.info("You sent a request to review your task!",
                         { position: "top-center", autoClose: false });
                    
                }
                else toast.error("Error Occurred!", { position: "top-center" });
            },
                (error) => {
                    toast.error("Error Occurred!", { position: "top-center" });
                })

    }

    handleSkip(event) {
        event.preventDefault();
        let usertoken = localStorage.getItem("token");

        fetch(process.env.REACT_APP_API + 'freelancer/sentRequest', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + usertoken

            },
            body: JSON.stringify({
                'details': "",
                'path': window.location.pathname
            })
        })
            .then(res => res.json())
            .then((result) => {
                if (result == true) {
                    this.props.history.push("/dashboard/completed");
                    toast.info("You sent a request to review your task!",
                         { position: "top-center", autoClose: false });
                    
                }
                else toast.error("Error Occurred!", { position: "top-center" });
            },
                (error) => {
                    toast.error("Error Occurred!", { position: "top-center" });
                })

    }

    render() {
        const { user } = this.props.auth;
        
        return (
            <div class="center-block " style={{ "maxWidth": "700px", "padding": "10px", "marginTop": "30px", backgroundColor: "#f5f5f5" }}>
                <p className="mt-4">
                    <Link to="/freelancejobs" >Go back</Link>
                </p>
                <div class="mt-4 mb-4 mx-auto rounded pt-4 " style={{ backgroundColor: "#f5f5f5" }} >
                    <div class="text-center col log-in-div" style={{ backgroundColor: "#f5f5f5" }} >
                        <img
                            src="https://media.istockphoto.com/vectors/woman-with-laptop-sitting-in-nature-and-leaves-concept-illustration-vector-id1139913278?k=6&m=1139913278&s=612x612&w=0&h=vDks140zgZAaCDrxSW0C4IabyHQI7aM8uw0MfM7gMrs=" alt="iphone-mockup"
                            id="log-in-img" style={{ height: "150px" }} />
                        <h3 style={{"marginTop":"30px"}} class="green-text"><b className="text-primary">Congratulations</b></h3><h4>You completed the task!</h4>
                        <hr />
                    </div>

                    <Form class="log-in-form" onSubmit={this.handleSubmit}>
                        <Form.Group controlId="Id">
                            <Form.Label>Any message for client?</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="details"
                                rows={10}
                                placeholder="Message to client (add necessary links if required)"
                                value={this.state.details}
                                onChange={this.onChange}
                                
                            />
                        </Form.Group>

                        <button className="btn btn-dark" style={{ "marginTop":"10px", "color": "white", fontSize: "15px" }} type="submit" >
                            Send request with message
                        </button>
                        <button className="btn btn-dark" style={{ "marginTop":"10px", "color": "white", fontSize: "15px", "marginLeft": "10px" }} onClick={this.handleSkip} >
                            Skip this and send request
                        </button>


                    </Form>
                </div>
            </div>

        );


    }
}

JobCompleted.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {
    logout
})(withRouter(JobCompleted));