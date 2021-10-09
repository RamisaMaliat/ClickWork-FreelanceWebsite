import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import Footer from "../subComponents/Footer";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Container2 from "../subComponents/Container2";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container, Navbar, Nav, Row, Col } from "react-bootstrap";
import { logout } from "./login/LoginActions";
import { Link } from "react-router-dom";

var photos = new Object();

const Posts = ({ posts, loading }) => {

  if (loading) {
    return <h2>Loading...</h2>;
  }

  fetch(process.env.REACT_APP_API + "getallclientphotos"
  )
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        var jobid = data[i].jobid;
        photos[jobid] = data[i].imagefile;
      }
      console.log(photos);
    });

  return (
    <dl className="dictionary">
      {posts.map(job => (
        <div className="term">
           <Row>
          <Col style={{"maxWidth": "40px", "paddingTop":"5px"}}>
          <img height="30px" width="30px" style={{"borderRadius": "50%"}} src={("http://127.0.0.1:8000" + photos[job.JobId])} alt="iphone-mockup" />
          </Col>
          <Col>
          <dt>
            <span >{job.Headline}</span>
          </dt>
          </Col>
          </Row>
          <dd> <b>{"Category" + " " + ":" + " " + " "}</b>{job.CategoryName}</dd>
          <dd> <b>{"Description" + " " + ":" + " " + " "}</b>{job.Description}</dd>
          <dd><b>{"Skills" + " " + ":" + " " + " "}</b>{job.Skills}</dd>
          <dd><b>{"Additional Requirements" + " " + ":" + " " + " "}</b>{job.AdditionalRequirements}</dd>
          <u><b>Offered By : </b></u>
          <dd><b>{"Client Name" + " " + ":" + " " + " "}</b> {job.ClientName}</dd>
          <dd><b>{"Company Name" + " " + ":" + " " + " "}</b> {job.CompanyName}</dd>
          <dd><b>{"Email" + " " + ":" + " " + " "}</b> {job.Email}</dd>
          <dd><b>{"City" + " " + ":" + " " + " "}</b> {job.City}</dd>
          <dd><b>{"Country" + " " + ":" + " " + " "}</b> {job.Country}</dd>

          <a href={"/jobs/"+job.JobId}><button type="button" className="btn btn-outline-success submit">Submit Proposal</button></a>
          <a href={"/job/details/"+job.JobId}><button type="button" className="btn btn-outline-success">View Job details<FontAwesomeIcon icon="Bookmark" /></button></a>
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

const ViewWork = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      let usertoken = localStorage.getItem("token");
      const res = await axios.get(process.env.REACT_APP_API + 'freelanceJobs');
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
    <app class="container">
      <div>
      <h1 className="newsfeed" style={{"fontSize":"35px", "margin": "auto", "maxWidth": "50%", "paddingBottom":"20px", "paddingTop":"10px" }} ><b>Job Offers</b></h1>
        <div className="text-center" style={{"fontSize":"16px","marginBottom":"10px"}}>Do you want to filter jobs? <a href="/searchjobs">Search jobs with filters</a></div>
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

class FindWork2 extends Component {
  onLogout = (e) => {
    e.preventDefault();
    this.props.logout();
  };

  render() {
    const { user } = this.props.auth;
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
                  <a class="nav-link" href="/freelancer/myprofile">My Profile</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active" href="">Find Work</a>
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
        
        <Container2 />
        <div class="container">
        <ViewWork />
        <Footer />
        </div>
        
      </div>
    );
  }
}

FindWork2.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  logout
})(withRouter(FindWork2));