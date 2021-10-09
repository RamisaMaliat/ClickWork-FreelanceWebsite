import React, { useState, useEffect, Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from 'axios';
import { Container, Navbar, Nav } from "react-bootstrap";
import Footer from "./Footer";
import { logout } from "../components/login/LoginActions";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

class Header3 extends Component {
  constructor(props) {
    super(props);
  }

  onLogout = (e) => {
    e.preventDefault();
    this.props.logout();
  };

  render() {
    const { user } = this.props.auth;
    
    return (

      <header>
          <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <a class="navbar-brand" >Clickwork</a>
            <div class="collapse navbar-collapse" id="navbarCollapse">
              <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                  <a class="nav-link " href="/dashboard/assigned">Dashboard</a>
                </li>
              <li class="nav-item ">
                  <a class="nav-link" href="/freelancer-myfeed">My Feed</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link " href="/freelancer/myprofile">My Profile</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/freelancejobs">Find Work</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/freelancers" >Find Talent</a>
                </li>
                
              </ul>

            </div>

            <ul class="navbar-nav ml-auto">
            <form class="form-inline mt-2 mt-md-0">
                  <span style={{ "paddingRight": "20px", "color": "white" }}>User : <b>{user.username}</b></span>
                  <li class="nav-item">
                  <a class="nav-link" href="/login" onClick={this.onLogout}>Log Out</a>
                </li>
                </form>  
            </ul>
          </nav>
        </header>

    );
  }
}

Header3.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  logout
})(withRouter(Header3));