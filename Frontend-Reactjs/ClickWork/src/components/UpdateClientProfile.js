import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  Alert,
  Container,
  Button,
  Row,
  Col,
  Form,
  FormControl
} from "react-bootstrap";
import { logout } from "../components/login/LoginActions";


class UpdateClientProfile extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
        
        'name': null,
        'company': null,
        'country': null,
        'city': null
    };
}

onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };


fetchData() {
    let usertoken = localStorage.getItem("token");
    
    fetch(process.env.REACT_APP_API + "client/profile",
        {
            headers: {
                'Authorization': 'Bearer ' + usertoken
            }
        }
    )
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            this.setState({

                'name': data[0].Name,
                'company': data[0].CompanyName,
                'country': data[0].Country,
                'city': data[0].City

            });
        });

}

componentDidMount() {
    this.fetchData();
}

onLogout = (e) => {
    e.preventDefault();
    this.props.logout();
  };

handleSubmit(event) {
    let usertoken = localStorage.getItem("token");
    event.preventDefault();
    fetch(process.env.REACT_APP_API + 'client/update', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + usertoken

        },
        body: JSON.stringify({
            'name': event.target.name.value,
            'company': event.target.company.value,
            'country': event.target.country.value,
            'city': event.target.city.value
            
        })
    })
        .then(res => res.json())
        .then((result) => {
            toast.info("Profile Updated!", { position: "top-center", autoClose: 3000});

            setTimeout(function() {
                window.location.replace("/client/profile" );  
            }, 3000);
            
        },
            (error) => {
                alert('Failed');
            })

}

  render() {
    const { user } = this.props.auth;

    return (
      <div >
        <createprofile class="bg-light"  >

          <div class="container " style={{ maxWidth:"1000px", "marginTop": "1.5%", "paddingTop": "0%", "backgroundColor": "#f5f5f5" }} id="create-profile-container"  >
            <main style={{ "backgroundColor": "#f5f5f5" }}>
              <div class="py-5 text-center " style={{ paddingTop: "0%", "backgroundColor": "#f5f5f5" }}>
              <img
                        src="https://media.istockphoto.com/vectors/woman-with-laptop-sitting-in-nature-and-leaves-concept-illustration-vector-id1139913278?k=6&m=1139913278&s=612x612&w=0&h=vDks140zgZAaCDrxSW0C4IabyHQI7aM8uw0MfM7gMrs=" alt="iphone-mockup"
                        id="log-in-img" style={{ height: "150px" }} />
                <h2 style={{ paddingBottom: "1%" }}>Create Profile</h2>
                <p class="lead">Each field below is a required field. You have to fill in all the required information.</p>
              </div>

              <form style={{ "backgroundColor": "#f5f5f5", maxWidth:"1000px" }} class="needs-validation mt-4 mb-4 mx-auto rounded pt-4 log-in" novalidate onSubmit={this.handleSubmit}>
                <div style={{ "backgroundColor": "#f5f5f5" }} class="row g-5">

                  <div class="col-md-7 col-lg-8" style={{ "backgroundColor": "#f5f5f5" }}>
                    <h4 class="mb-3">Your Information</h4>

                    <div class="row g-3 ">

                      <div class="col-12">
                        <label for="name" class="form-label">Name</label>
                        <div class="input-group has-validation">
                          <input onChange={this.onChange} style={{"width":"900px"}} type="text" class="form-control"  value={this.state.name} name="name" id="name" placeholder="name" required />
                          <div class="invalid-feedback">
                            Your name is required.
                          </div>
                        </div>
                      </div>

                      <div class="col-12 ">
                        <label for="city" class="form-label">City</label>
                        <input onChange={this.onChange} style={{"width":"900px"}}   value={this.state.city} name="city" type="text" class="form-control" id="city" placeholder="Chittagong" required />
                        <div class="invalid-feedback">
                          Please enter your city.
                        </div>
                      </div>

                      <div class="col-12">
                        <label for="country" class="form-label">Country</label>
                        <input onChange={this.onChange} style={{"width":"900px"}}  value={this.state.country} name="country" type="text" class="form-control" id="country" placeholder="Bangladesh" required />
                        <div class="invalid-feedback">
                          Please enter your country.
                        </div>
                      </div>

                      <div class="col-12">
                        <label for="company" class="form-label">Company Name</label>
                        <input onChange={this.onChange} style={{"width":"900px"}}  value={this.state.company} name="company" name="company" type="text" class="form-control" aria-label="Companies you worked for" placeholder="ABC Company" aria-describedby="inputGroup-sizing-default" required />
                        <div class="invalid-feedback">
                          Please enter your company name.
                        </div>
                      </div>

                    </div>
                    
                  </div>
                  <button class="btn btn-dark btn-lg" type="submit" style={{"marginBottom":"3%", "marginTop":"7%", "width":"50%", "marginLeft":"auto", "marginRight":"auto"}} >Update Profile</button>

                </div>
              </form>

            </main>

            <footer class="my-5 pt-5 text-muted text-center text-small" >
              <p class="mb-1">&copy; ClickWork</p>
              <ul class="list-inline" style={{ paddingBottom: "15%" }} >
                <li class="list-inline-item"><a href="#">Privacy</a></li>
                <li class="list-inline-item"><a href="#">Terms</a></li>
                <li class="list-inline-item"><a href="#">Support</a></li>
              </ul>
            </footer>
          </div>


          <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>

          <script src="form-validation.js"></script>

        </createprofile>
      </div>
    );
  }
}

UpdateClientProfile.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  logout
})(withRouter(UpdateClientProfile));


