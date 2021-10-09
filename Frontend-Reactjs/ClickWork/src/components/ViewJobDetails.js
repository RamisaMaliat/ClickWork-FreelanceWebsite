import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Footer from "../subComponents/Footer";
import { logout } from "./login/LoginActions";
import { Col, Row } from "react-bootstrap";


class ViewJobDetails extends React.Component{
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
  
  fetchData(){
      let usertoken = localStorage.getItem("token");
      let path = window.location.pathname
      fetch("http://127.0.0.1:8000"+path, 
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

  componentDidMount(){
      this.fetchData();
  }

  render(){

    const { user } = this.props.auth;
    
    const posts=this.state.jobs;
    
    const items = posts.map(job => (
        <div className="term">
          <dt>
            <span ><h2 class="text-primary" style={{"paddingBottom":"30px"}}>{job.Headline}</h2></span>
          </dt>
          <dd> <b>{"Category" + " " + ":" + " " + " "}</b>{job.CategoryName}</dd>
          <dd> <b>{"Description" + " " + ":" + " " + " "}</b>{job.Description}</dd>
          <dd><b>{"Skills" + " " + ":" + " " + " "}</b>{job.Skills}</dd>
          <dd><b>{"Additional Requirements" + " " + ":" + " " + " "}</b>{job.AdditionalRequirements}</dd>
          <hr/>
          <u><b style={{"fontSize":"20px"}}>Offered By : </b></u>
          <dd style={{"marginTop":"20px"}}><b>{"Client Name" + " " + ":" + " " + " "}</b> {job.ClientName}</dd>
          <dd><b>{"Company Name" + " " + ":" + " " + " "}</b> {job.CompanyName}</dd>
          <dd><b>{"Email" + " " + ":" + " " + " "}</b> {job.Email}</dd>
          <dd><b>{"City" + " " + ":" + " " + " "}</b> {job.City}</dd>
          <dd><b>{"Country" + " " + ":" + " " + " "}</b> {job.Country}</dd>

          <a href={"/jobs/"+job.JobID}><button type="button" style={{"marginTop":"50px"}} className="btn btn-success submit">Submit Proposal</button></a>
          <a href={"/client/"+job.JobID}><button type="button" style={{"marginTop":"50px","marginLeft":"10px"}} className="btn btn-success submit">View Client Profile</button></a>
          
        </div>
      ));
    

    return (
      <div>
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
        <div class="container" >
        
       <dl >{items}</dl>
       
       </div>
       
       <div class="container" style={{marginTop:"200px"}} >
        <Footer/>
        </div>
        </div> 
    );
    
  }
  
}

ViewJobDetails.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  logout
})(withRouter(ViewJobDetails));