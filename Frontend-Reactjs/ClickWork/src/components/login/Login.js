import React, { Component } from "react";
import { withRouter } from "react-router-dom";  
import { connect } from "react-redux";          
import PropTypes from "prop-types";            
import { Link } from "react-router-dom";
import { Container, Button, Row, Col, Form } from "react-bootstrap";

import { login } from "./LoginActions.js";      

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onLoginClick = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    const userData = {
      username: this.state.username,
      password: this.state.password
    };
    
    this.props.login(userData, "/account");

  };
  render() {
    return (
      <div class="center-block log-in border" style={{"maxWidth":"500px", "padding":"10px", "marginTop": "30px"}}>
        <p className="mt-2">
                  Go <Link to="/">Home</Link>
                </p>
      <div class="log-in mt-4 mb-4 mx-auto rounded pt-4 ">
      
          <div class="text-center col log-in-div">
          
              <img
                  src="https://media.istockphoto.com/vectors/woman-with-laptop-sitting-in-nature-and-leaves-concept-illustration-vector-id1139913278?k=6&m=1139913278&s=612x612&w=0&h=vDks140zgZAaCDrxSW0C4IabyHQI7aM8uw0MfM7gMrs=" alt="iphone-mockup"
                  id="log-in-img" style={{ height: "150px" }} />
              <div class="display-8" ><h2>Log In</h2></div>
              <hr />
          </div>
          <h3 hidden class="alert alert-light border mt-4 mb-4 rounded">Login Here</h3>
          <Form class="log-in-form" onSubmit={this.onLoginClick}>
                  <Form.Group controlId="usernameId">
                    <Form.Label>User name</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="Enter user name"
                      value={this.state.username}
                      onChange={this.onChange}
                    />
                  </Form.Group>
    
                  <Form.Group controlId="passwordId">
                    <Form.Label>Your password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                  </Form.Group>
                  <Button className="btn btn-outline-secondary btn-dark" style={{"color":"white"}} type="submit">
                  Login
                </Button>
                <p className="mt-2">
                  Don't have account? <Link to="/signup">Signup</Link>
                </p>
                
          </Form>
      </div>
      </div>
      
    );
    
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  login
})(withRouter(Login));