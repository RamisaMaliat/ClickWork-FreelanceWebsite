import React, { Component } from 'react';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { Button, Form } from "react-bootstrap";
import { logout } from "./login/LoginActions";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

class ApproveAJob extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.star1selected = this.star1selected.bind(this);
        this.star2selected = this.star2selected.bind(this);
        this.star3selected = this.star3selected.bind(this);
        this.star4selected = this.star4selected.bind(this);
        this.star5selected = this.star5selected.bind(this);

        let var_freelancer = "";
        for (var i = 25; i < window.location.pathname.length; i++) {
            var_freelancer = var_freelancer + window.location.pathname[i];
        }

        console.log(var_freelancer);


        this.state = {
            details: "",
            freelancer: var_freelancer,
            star: 2
        };


    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,

        });
    }

    star1selected(e) {
        this.setState({
            star: 1
        });
        let starspan = document.getElementById('star1');
        starspan.style.color = "orange";
        starspan = document.getElementById('star2');
        starspan.style.color = "gray";
        starspan = document.getElementById('star3');
        starspan.style.color = "gray";
        starspan = document.getElementById('star4');
        starspan.style.color = "gray";
        starspan = document.getElementById('star5');
        starspan.style.color = "gray";
    }

    star2selected(e) {
        this.setState({
            star: 2
        });
        let starspan = document.getElementById('star1');
        starspan.style.color = "orange";
        starspan = document.getElementById('star2');
        starspan.style.color = "orange";
        starspan = document.getElementById('star3');
        starspan.style.color = "gray";
        starspan = document.getElementById('star4');
        starspan.style.color = "gray";
        starspan = document.getElementById('star5');
        starspan.style.color = "gray";
    }

    star3selected(e) {
        this.setState({
            star: 3
        });
        let starspan = document.getElementById('star1');
        starspan.style.color = "orange";
        starspan = document.getElementById('star2');
        starspan.style.color = "orange";
        starspan = document.getElementById('star3');
        starspan.style.color = "orange";
        starspan = document.getElementById('star4');
        starspan.style.color = "gray";
        starspan = document.getElementById('star5');
        starspan.style.color = "gray";
    }

    star4selected(e) {
        this.setState({
            star: 4
        });
        let starspan = document.getElementById('star1');
        starspan.style.color = "orange";
        starspan = document.getElementById('star2');
        starspan.style.color = "orange";
        starspan = document.getElementById('star3');
        starspan.style.color = "orange";
        starspan = document.getElementById('star4');
        starspan.style.color = "orange";
        starspan = document.getElementById('star5');
        starspan.style.color = "gray";
    }

    star5selected(e) {
        this.setState({
            star: 5
        });
        let starspan = document.getElementById('star1');
        starspan.style.color = "orange";
        starspan = document.getElementById('star2');
        starspan.style.color = "orange";
        starspan = document.getElementById('star3');
        starspan.style.color = "orange";
        starspan = document.getElementById('star4');
        starspan.style.color = "orange";
        starspan = document.getElementById('star5');
        starspan.style.color = "orange";
    }

    onLogout = (e) => {
        e.preventDefault();
        this.props.logout();
    };

    handleSubmit(event) {
        event.preventDefault();
        let usertoken = localStorage.getItem("token");

        fetch("http://127.0.0.1:8000"+ window.location.pathname, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + usertoken

            },
            body: JSON.stringify({
                'details': event.target.details.value,
                'star': this.state.star
            })
        })
            .then(res => res.json())
            .then((result) => {
                if (result == true) {
                    this.props.history.push("/client/approvedjobs");
                    toast.info("You approved a submission!",
                        { position: "top-center", autoClose: false });

                }
                else toast.error("Error Occurred!", { position: "top-center" });
            },
                (error) => {
                    toast.error("Error Occurred!", { position: "top-center" });
                })

    }

    componentDidMount() {
        this.star2selected();
    }

    render() {
        const { user } = this.props.auth;

        return (
            <div class="center-block " style={{ "maxWidth": "700px", "padding": "10px", "marginTop": "30px", backgroundColor: "#f5f5f5" }}>
                <p className="mt-4">
                    <Link to="/client/completedjobs" >Go back</Link>
                </p>
                <div class="mt-4 mb-4 mx-auto rounded pt-4 " style={{ backgroundColor: "#f5f5f5" }} >
                    
                        <div class="text-center col log-in-div" style={{ backgroundColor: "#f5f5f5", "marginBottom": "20px" }} >
                            <img
                                src="https://media.istockphoto.com/vectors/woman-with-laptop-sitting-in-nature-and-leaves-concept-illustration-vector-id1139913278?k=6&m=1139913278&s=612x612&w=0&h=vDks140zgZAaCDrxSW0C4IabyHQI7aM8uw0MfM7gMrs=" alt="iphone-mockup"
                                id="log-in-img" style={{ height: "150px" }} />
                            <h3 class="green-text"><b>Send your feedback to {this.state.freelancer}</b></h3>
                            <hr />
                            <h4 class="text-primary"><b>How was your experience?</b></h4>
                            <button onClick={this.star1selected} style={{ "border": "0" }}><span id="star1" style={{ "font-size": "30px" }}>&#9733;</span></button>
                            <button onClick={this.star2selected} style={{ "border": "0" }}><span id="star2" style={{ "font-size": "30px" }}>&#9733;</span></button>
                            <button onClick={this.star3selected} style={{ "border": "0" }}><span id="star3" style={{ "font-size": "30px" }}>&#9733;</span></button>
                            <button onClick={this.star4selected} style={{ "border": "0" }}><span id="star4" style={{ "font-size": "30px" }}>&#9733;</span></button>
                            <button onClick={this.star5selected} style={{ "border": "0" }}><span id="star5" style={{ "font-size": "30px" }}>&#9733;</span></button>

                        </div>

                        <Form class="log-in-form" onSubmit={this.handleSubmit}>

                        <Form.Group controlId="Id">
                            <Form.Label>Would you like to write something about {this.state.freelancer}?</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="details"
                                rows={5}
                                placeholder="Write your comment"
                                value={this.state.details}
                                onChange={this.onChange}

                            />
                        </Form.Group>

                        <button className="btn btn-dark" style={{ "marginTop": "10px", "color": "white", fontSize: "15px"}} type="submit" >
                            Confirm your approval
                        </button>


                    </Form>
                </div>
            </div>

        );


    }
}

ApproveAJob.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {
    logout
})(withRouter(ApproveAJob));