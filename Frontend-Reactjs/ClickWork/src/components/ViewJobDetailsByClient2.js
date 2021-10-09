import React, { useState, useEffect, Component } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Footer from "../subComponents/Footer";
import { logout } from "./login/LoginActions";
import { Col, Row } from "react-bootstrap";

const Posts = ({ posts, loading }) => {

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <dl className="dictionary">
      {posts.map(profile => (
        <div className="term">
          <dt>
            <h3>{profile.Name}</h3>
          </dt>
          <dd> <b>{"Name" + " " + ":" + " " + " "}</b>{profile.Name}</dd>
          <dd> <b>{"Username" + " " + ":" + " " + " "}</b>{profile.Username}</dd>
          <dd><b>{"City" + " " + ":" + " " + " "}</b> {profile.City}</dd>
          <dd><b>{"Country" + " " + ":" + " " + " "}</b> {profile.Country}</dd>
          <dd><b>{"Educational Institution" + " " + ":" + " " + " "}</b> {profile.EducationalInstitution}</dd>
          <dd><b>{"Educational Qualifications" + " " + ":" + " " + " "}</b> {profile.EducationalQualifications}</dd>
          <dd><b>{"Employment" + " " + ":" + " " + " "}</b> {profile.Employment}</dd>
          <dd><b>{"Company Name" + " " + ":" + " " + " "}</b> {profile.CompanyName}</dd>
          <dd><b>{"Field of work" + " " + ":" + " " + " "}</b> {profile.CategoryName}</dd>
          <dd><b>{"Skills" + " " + ":" + " " + " "}</b> {profile.Skills}</dd>
          <dd><b>{"Email" + " " + ":" + " " + " "}</b> {profile.Email}</dd>
          <dd><b>{"Additional Contact Details" + " " + ":" + " " + " "}</b></dd>
          <dd>{profile.AdditionalContactDetails}</dd>

          <a class="style-btn" href={"/viewfreelancerprofile/"+profile.Username}><button style={{"marginTop":"10px", "fontSize":"16px"}} type="button" className="btn btn-outline-success submit ">View Profile</button></a>

        </div>
      ))}
    </dl>
  );
};

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const ViewFreelancer = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      let usertoken = localStorage.getItem("token");
      const res = await axios.get("http://127.0.0.1:8000" + window.location.pathname);
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <app>
      <div>
        
        <Posts posts={currentPosts} loading={loading} />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
        />
      </div>

    </app>
  );
};


class ViewJobDetailsByClient2 extends React.Component{
  constructor(){
      super();
      this.state={
          jobs:[],
          job: 0
          
      };
  }

  onLogout = (e) => {
    e.preventDefault();
    this.props.logout();
  };
  
  fetchData(){
      let usertoken = localStorage.getItem("token");
      let path = window.location.pathname+"/details"
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
            jobs:data,
            job: data[0].JobID
          });
          console.log(this.state.jobs[0].JobID);
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
          {job.AdditionalRequirements?<dd><b>{"Additional Requirements" + " " + ":" + " " + " "}</b>{job.AdditionalRequirements}</dd>:''}
          <hr/>
          <u><b style={{"fontSize":"20px"}}>Offered By : </b></u>
          <dd style={{"marginTop":"20px"}}><b>{"Client Name" + " " + ":" + " " + " "}</b> {job.ClientName}</dd>
          <dd><b>{"Company Name" + " " + ":" + " " + " "}</b> {job.CompanyName}</dd>
          <dd><b>{"Email" + " " + ":" + " " + " "}</b> {job.Email}</dd>
          <dd><b>{"City" + " " + ":" + " " + " "}</b> {job.City}</dd>
          <dd><b>{"Country" + " " + ":" + " " + " "}</b> {job.Country}</dd>

         
          
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
              <a class="nav-link " href="/client/postedjobs">My Jobs</a>
            </li>
            <li class="nav-item">
              <a class="nav-link " href="/postjob">Post Job</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/freelancer/myprofile">My Profile</a>
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
       
       <div class="container" style={{marginTop:"50px"}} >

       <div class="container" style={{ "height": "100px", "paddingTop": "0px" }} >
          <ul class="nav nav-tabs" >
          <li role="presentation" style={{ "paddingRight": "10px" }}><a href={"/client/job/details/"+this.state.job}>Invitations</a></li>
            <li role="presentation" class="active" style={{ "paddingRight": "10px" }}><a href="">Proposals</a></li>
            <li role="presentation" style={{ "paddingRight": "10px" }}><a href={"/client/job/details/"+this.state.job+"/assigned"}>Assigned to</a></li>
            
          </ul>
          
        </div>
        <div class="center-block log-in border" style={{"maxWidth":"1000px", "padding":"10px"}}>
        <ViewFreelancer/>
        </div>
        <Footer/>
        </div>
        </div> 
    );
    
  }
  
}

ViewJobDetailsByClient2.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  logout
})(withRouter(ViewJobDetailsByClient2));