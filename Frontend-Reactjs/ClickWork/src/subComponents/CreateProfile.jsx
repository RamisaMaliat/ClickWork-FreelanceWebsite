import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';

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


class CreateProfile extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      categories: [],
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

  onLogout = () => {
    this.props.logout();
  };

  handleSubmit(event) {
    let usertoken = localStorage.getItem("token");
    event.preventDefault();
    fetch(process.env.REACT_APP_API + 'freelancer/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + usertoken

      },
      body: JSON.stringify({
        'name': event.target.name.value,
        'category': event.target.category.value,
        'institution': event.target.institution.value,
        'degree': event.target.degree.value,
        'employment': event.target.employment.value,
        'company': event.target.company.value,
        'country': event.target.country.value,
        'city': event.target.city.value,
        'additionalContacts': event.target.additionalContacts.value,
        'skills': event.target.skills.value
      })
    })
      .then(res => res.json())
      .then((result) => {
        this.props.history.push('/addprofilepicture'); 
      },
        (error) => {
          alert('Failed');
        })

  }


  render() {
    const { user } = this.props.auth;
    const categories = this.state.categories;

    const items = categories.map((post) =>
      <div class="form-check" >
        <input type="radio" value={post.CategoryID} name="category" required />
        <label >
          {post.CategoryName}
        </label>
      </div>
    );

    return (
      <div >
        <createprofile class="bg-light" >

          <div class="container" style={{"marginTop":"1.5%", "paddingTop":"0%","backgroundColor": "#f5f5f5"}} id="create-profile-container"  >
            <main style={{"backgroundColor": "#f5f5f5"}}>
              <div class="py-5 text-center" style={{ paddingTop: "0%","backgroundColor": "#f5f5f5"}}>
                <h2 style={{ paddingBottom: "1%" }}>Create Profile</h2>
                <p class="lead">Each field below is a required field (except the additional contact info field). You have to fill in all the required information.</p>
              </div>

              <form style={{"backgroundColor": "#f5f5f5"}} class="needs-validation" novalidate onSubmit={this.handleSubmit}>
                <div style={{"backgroundColor": "#f5f5f5"}} class="row g-5">
                  <div class="col-md-5 col-lg-4 order-md-last">
                    <h4 class="d-flex justify-content-between align-items-center mb-3">
                      <span class="text-primary">Your Skills</span><i class="bi bi-bookmark-star-fill"></i>
                    </h4>
                    <div class="form-group">
                      <label for="exampleFormControlTextarea3">Describe your skills</label>
                      <textarea class="form-control" id="exampleFormControlTextarea3" rows="10" name="skills" required ></textarea>
                    </div>
                    <h4 class="d-flex justify-content-between align-items-center mb-3">
                      <span class="text-primary">Category of Your Work</span><i class="bi bi-bookmark-star-fill"></i>
                    </h4>

                    {items}

                  </div >
                  <div class="col-md-7 col-lg-8" style={{"backgroundColor": "#f5f5f5"}}>
                    <h4 class="mb-3">Your Information</h4>

                    <div class="row g-3">

                      <div class="col-12">
                        <label for="name" class="form-label">Name</label>
                        <div class="input-group has-validation">
                          <input type="text" class="form-control" name="name" id="name" placeholder="name" required />
                          <div class="invalid-feedback">
                            Your name is required.
                          </div>
                        </div>
                      </div>

                      <div class="col-12">
                        <label for="city" class="form-label">City</label>
                        <input name="city" type="text" class="form-control" id="city" placeholder="Chittagong" required />
                        <div class="invalid-feedback">
                          Please enter your city.
                        </div>
                      </div>

                      <div class="col-12">
                        <label for="country" class="form-label">Country</label>
                        <input name="country" type="text" class="form-control" id="country" placeholder="Bangladesh" required />
                        <div class="invalid-feedback">
                          Please enter your country.
                        </div>
                      </div>

                      <div class="col-12">
                        <label for="additionalContacts" class="form-label">Additional Contact Details<span class="text-muted">(Optional as your email address will remain public)</span></label>
                        <input name="additionalContacts" type="text" class="form-control" id="additionalContacts" placeholder="" />
                      </div>


                    </div>

                    <h4>Education</h4>
                    <div class="input-group mb-3">
                      <span class="input-group-text" id="inputGroup-sizing-default" >Institution</span>
                      <input name="institution" name="institution" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required />
                    </div>
                    <div class="input-group mb-3">
                      <span class="input-group-text" id="inputGroup-sizing-default">Degree</span>
                      <input name="degree" name="degree" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required />
                    </div>

                    <h4>Employment</h4>
                    <div class="input-group mb-3">
                      <span class="input-group-text" id="inputGroup-sizing-default">Designation</span>
                      <input name="employment" name="employment" type="text" class="form-control" aria-label="Previous Jobs" aria-describedby="inputGroup-sizing-default" required />
                    </div>
                    <div class="input-group mb-3 ">
                      <span class="input-group-text" id="inputGroup-sizing-default">Company you work for</span>
                      <input name="company" name="company" type="text" class="form-control" aria-label="Companies you worked for" aria-describedby="inputGroup-sizing-default" required />
                    </div>

                    <button class="w-100 btn btn-dark btn-lg" type="submit" style={{"marginBottom":"3%"}} >Create Profile</button>



                  </div>
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

CreateProfile.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  logout
})(withRouter(CreateProfile));


