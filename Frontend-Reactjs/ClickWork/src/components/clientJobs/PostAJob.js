import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { logout } from "../login/LoginActions";
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";


class PostAJob extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            Headline: "",
            description: "",
            skills: "",
            category: null,
            addreq: "",
            categories: []

        };
    }

    fetchData() {
        let usertoken = localStorage.getItem("token");
        fetch(process.env.REACT_APP_API + 'freelancer/findCategory',
            {
                headers: {
                    'Authorization': 'Bearer ' + usertoken
                }
            }
        )
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    categories: data
                });
            });
    }

    componentDidMount() {
        this.fetchData();
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

        console.log(event.target.Headline.value);
        console.log(event.target.description.value);
        console.log(event.target.skills.value);
        console.log(event.target.addreq.value);
        console.log(event.target.category.value);

        fetch(process.env.REACT_APP_API + 'client/postjob', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + usertoken

            },
            body: JSON.stringify({
                'headline': event.target.Headline.value,
                'description': event.target.description.value,
                'skills': event.target.skills.value,
                'addreq': event.target.addreq.value,
                'category': event.target.category.value
            })
        })
            .then(res => res.json())
            .then((result) => {
                if (result == true) {
                    toast.info("You successfully posted a job!",
                        { position: "top-center", autoClose: false });
                    
                    setTimeout(function() {
                        window.location.replace('/client/postedjobs');
                    }, 3000);
                }
                else toast.error("Error Occurred! Try again!", { position: "top-center" });

            },
                (error) => {
                    toast.error("Error Occurred! Try again!", { position: "top-center" });
                })
    }

    render() {
        const { user } = this.props.auth;

        const categories = this.state.categories;

        const items = categories.map((post) =>
            <option value={post.CategoryID}>{post.CategoryName}</option>
        );

        return (
            <div class="center-block " style={{ "maxWidth": "1000px", "padding": "10px", "marginTop": "30px", backgroundColor: "#f5f5f5" }}>
                <div class="mt-4 mb-4 mx-auto rounded pt-4 " style={{ backgroundColor: "#f5f5f5" }} >
                    <div class="text-center col log-in-div " style={{ backgroundColor: "#f5f5f5", "marginTop": "0px" }} >
                        <img
                            src="https://media.istockphoto.com/vectors/woman-with-laptop-sitting-in-nature-and-leaves-concept-illustration-vector-id1139913278?k=6&m=1139913278&s=612x612&w=0&h=vDks140zgZAaCDrxSW0C4IabyHQI7aM8uw0MfM7gMrs=" alt="iphone-mockup"
                            id="log-in-img" style={{ height: "150px" }} />
                        <h3 class="green-text"><b>Write About Your Job Offer!</b></h3>

                        <hr />
                    </div>

                    <Form class="log-in-form " onSubmit={this.handleSubmit}>
                        <div class="text-center" style={{"margin":"50px"}}>
                            <h4 class="">
                                <span class="text-primary">Select the category of this job</span><i class="bi bi-bookmark-star-fill"></i>
                            </h4>
                            <div class="dictionary" style={{ "margin": "auto", "width": "50%" }} >
                            <select class="form-select form-select-lg form-control mr-sm-2" style={{"fontSize":"15px"}} name="category" required>
                                {items}
                            </select>
                            </div>
                        </div>   

                        <Form.Group controlId="titleId">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="Headline"
                                placeholder="Enter a title"
                                value={this.state.headline}
                                onChange={this.onChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="descId">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                rows={10}
                                placeholder="Enter a short description about the job (provide necessary links if required)"
                                value={this.state.description}
                                onChange={this.onChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="descId">
                            <Form.Label>Required Skills</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="skills"
                                rows={3}
                                placeholder="Enter the skills you are looking for"
                                value={this.state.skills}
                                onChange={this.onChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="descId">
                            <Form.Label>Additional Requirements <random class="text-muted">(optional)</random></Form.Label>
                            <Form.Control
                                as="textarea"
                                name="addreq"
                                rows={3}
                                placeholder="Enter if you have any additional requirements"
                                value={this.state.addreq}
                                onChange={this.onChange}

                            />
                        </Form.Group>

                        <div>
                        <button class="btn btn-dark btn-lg btn-block" type="submit" style={{"marginBottom":"2%", "marginTop":"4%", "width":"50%", "marginLeft":"auto", "marginRight":"auto"}}>Submit</button>
                        </div>
                    </Form>
                </div>
            </div>
        );

    }
}


PostAJob.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {
    logout
})(withRouter(PostAJob));