import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import { setAxiosAuthToken } from "../../utils/Utils";
import { login } from "../login/LoginActions.js";
import {
  Alert,
  Container,
  Button,
  Row,
  Col,
  Form,
  FormControl
} from "react-bootstrap";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      repassword: "",
      acctype: "",
      usernameError: "",
      passwordError: "",
      emailError: "",
      status: ""
    };
  }
  ConfirmPassword = e => {
    e.preventDefault();
    if (this.state.password == this.state.repassword && this.state.acctype != "") {
      this.onSignupClick();
    }
    else if (this.state.acctype == "") {
      alert("Provide all the required information.")
    }
    else if (this.state.password != this.state.repassword) {
      alert("Confirm your password.")
    }
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSignupClick = () => {

    this.setState({
      usernameError: "",
      emailError: "",
      passwordError: "",
      status: ""
    });

    const userData = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    };

    setAxiosAuthToken("");
    axios
      .post("/api/v1/users/", userData)
      .then(response => {
        this.setState({ status: "success" });
        var bodyFormData = new FormData();
        bodyFormData.append('username', this.state.username);
        bodyFormData.append('acctype', this.state.acctype);

        axios
          .post(process.env.REACT_APP_API + 'SetAccount', bodyFormData).then(response => {
            const userInfo2 = {
              username: this.state.username,
              password: this.state.password
            }
            if (this.state.acctype == 'Freelancer') {
              this.props.login(userInfo2, "/createfreelancerprofile");
            }

            else {
              this.props.login(userInfo2, "/createclientprofile");
            }

          }
          ).catch(error => {
            this.setState({ status: "error" });
          }
          );
      })
      .catch(error => {
        if (error.response) {
          if (error.response.data.hasOwnProperty("username")) {
            this.setState({ usernameError: error.response.data["username"] });
          }
          if (error.response.data.hasOwnProperty("email")) {
            this.setState({ emailError: error.response.data["email"] });
          }
          if (error.response.data.hasOwnProperty("password")) {
            this.setState({ passwordError: error.response.data["password"] });
          }
          if (error.response.data.hasOwnProperty("detail")) {
            this.setState({ status: "error" });
          }
        } else {
          this.setState({ status: "error" });
        }
      });
  };

  render() {
    let errorAlert = (
      <Alert variant="danger">
        <Alert.Heading>Problem during account creation</Alert.Heading>
        Please try again or contact service support for further help.
      </Alert>
    );

    let successAlert = (
      <Alert variant="success">
        <Alert.Heading>Account created</Alert.Heading>
        <p>
          We send you an email with activation link. Please check your email.
        </p>
      </Alert>
    );

    const form = (
      <signup class="text-center sign-body">

        <main class="form-signin">
          <Form onSubmit={this.ConfirmPassword} >
            <img class="mb-4" src="https://media.istockphoto.com/vectors/woman-with-laptop-sitting-in-nature-and-leaves-concept-illustration-vector-id1139913278?k=6&m=1139913278&s=612x612&w=0&h=vDks140zgZAaCDrxSW0C4IabyHQI7aM8uw0MfM7gMrs=" alt="iphone-mockup" width="100" height="77" />
            <h1 class="h3 mb-3 fw-normal signup-title"><b>Sign Up</b></h1>
            <Form.Group controlId="usernameId">
              <Form.Control
                isInvalid={this.state.usernameError}
                type="text"
                name="username"
                placeholder="Enter username"
                value={this.state.username}
                onChange={this.onChange}
              />
              <FormControl.Feedback type="invalid">
                {this.state.usernameError}
              </FormControl.Feedback>
            </Form.Group>

            <Form.Group controlId="emailId">

              <Form.Control
                isInvalid={this.state.emailError}
                type="text"
                name="email"
                placeholder="Enter email"
                value={this.state.email}
                onChange={this.onChange}
              />
              <FormControl.Feedback type="invalid">
                {this.state.emailError}
              </FormControl.Feedback>
            </Form.Group>
            <Form.Group controlId="passwordId">

              <Form.Control
                isInvalid={this.state.passwordError}
                type="password"
                name="password"
                placeholder="Enter password"
                value={this.password}
                onChange={this.onChange}
              />
              <Form.Control.Feedback type="invalid">
                {this.state.passwordError}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="repasswordId">

              <Form.Control
                isInvalid={this.state.passwordError}
                type="password"
                name="repassword"
                placeholder="Confirm password"
                value={this.repassword}
                onChange={this.onChange}
              />
              <Form.Control.Feedback type="invalid">
                {this.state.passwordError}
              </Form.Control.Feedback>
            </Form.Group>

            <div class="checkbox mb-3 inline">

              <label class="acc-type" style={{ fontSize: "16px", marginTop: "20px" }} >
                <input type="radio" value="Freelancer" name="acctype" onChange={this.onChange} required /><b> Freelancer Account </b>
              </label>
              <label class="acc-type" style={{ fontSize: "16px", marginTop: "10px", marginBottom: "40px" }} >
                <input type="radio" value="Client" name="acctype" onChange={this.onChange} required /><b> Client Account </b>
              </label>
            </div>
            <button class="btn btn-dark btn-block" type="submit" style={{ fontSize: "20px", "marginTop": "10px" }} >Sign up</button>
          </Form>
        </main>
      </signup>
    );

    let alert = "";
    if (this.state.status === "error") {
      alert = errorAlert;
    } else if (this.state.status === "success") {
      alert = successAlert;
    }

    return (
      <Container style={{ "paddingTop": "20px" }}>
          <p className="mt-2">
              Go <Link to="/">Home</Link>
            </p>
        <Row>

          <Col>
            
            {alert}
            {this.state.status !== "success" && form}
            <p className="mt-2">
              Already have account? <Link to="/login">Login</Link>
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

Signup.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  login
})(withRouter(Signup));
