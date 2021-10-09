import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Footer from "../subComponents/Footer";
import { logout } from "./login/LoginActions";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";


class RemoveJob extends React.Component {
  constructor(){
    super();
    this.state={
        jobs:[],
        
    };
}

    onLogout = (e) => {
        e.preventDefault();
        this.props.logout();
      };

      fetchData2(){
        let usertoken = localStorage.getItem("token");
        let path = window.location.pathname
        fetch("http://127.0.0.1:8000/job"+path, 
        {
          headers: {
            'Authorization': 'Bearer ' + usertoken
          }
        }
        )
        .then(response=>response.json())
        .then((data)=>{
            this.setState({
              jobs:data
            });
        });
        
    }

    fetchData() {
        let usertoken = localStorage.getItem("token");
        fetch("http://127.0.0.1:8000" + window.location.pathname,
            {
                headers: {
                    'Authorization': 'Bearer ' + usertoken
                }
            }
        )
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                //this.props.history.push("/sendinvitation"+data);
                toast.info("Post Removed!", { position: "top-center", autoClose: 3000});
                setTimeout(function() {
                    window.location.replace("/client/postedjobs");  
                }, 3000);
                
            });
           
            
    }

    componentDidMount() {
        this.fetchData2();
        this.fetchData();
    }

    render() {
      const { user } = this.props.auth;
      console.log(window.location.pathname);
  
      const posts=this.state.jobs;
      
      const items = posts.map(job => (
          <div style={{"fontSize":"16px","paddingBottom":"20px"}} className="term">
            <dt>
              <span ><h2 class="text-primary" style={{"paddingBottom":"10px"}}>{job.Headline}</h2></span>
            </dt>
            <dd> <b>{"Category" + " " + ":" + " " + " "}</b>{job.CategoryName}</dd>
            <dd> <b>{"Description" + " " + ":" + " " + " "}</b>{job.Description}</dd>
            <dd><b>{"Skills" + " " + ":" + " " + " "}</b>{job.Skills}</dd>
            {job.AdditionalRequirements?<dd><b>{"Additional Requirements" + " " + ":" + " " + " "}</b>{job.AdditionalRequirements}</dd>:""}
            <hr/>
            
          </div>
        ));
        return (
            <div style={{"opacity":"0.5"}} >
        <header>
          <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <a class="navbar-brand">Clickwork</a>

            <div class="collapse navbar-collapse" id="navbarCollapse">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item ">
                  <a class="nav-link" href="">My Jobs</a>
                </li>
                <li class="nav-item ">
                  <a class="nav-link " href="">Post Job</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="">My Profile</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="" >Find Talent</a>
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
        <div class="container">
        {items}
          <Footer />
        </div>
       
        
      </div>
      
    );
       
    }
}

RemoveJob.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {
    logout
})(withRouter(RemoveJob));